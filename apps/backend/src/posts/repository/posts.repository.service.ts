import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DBSetup, PostsTable } from 'src/db/types/db.types';
import { and, count, desc, eq, inArray, SQL, sql } from 'drizzle-orm';
import { postsTable, tagsTable, postTagsTable, usersTable, commentsTable, likesTable } from '@/db/schema/db.schema';
import { CreatePostInput } from '../dto/create-post.input';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { DB } from '@/db/db.module';

@Injectable()
export class PostsRepository {
  constructor(@Inject(DB) private db: DBSetup) {}

  async createPost(createPostInput: CreatePostInput & { slug: string }, id: number) {
    const tagInserts: SQL[] = createPostInput.tags.map((tag: string) => sql`SELECT ${tag} AS name`);
    const subquery = sql.join(tagInserts, sql.raw(' UNION ALL '));
    const addedPost = await this.db.transaction(async (tx) => {
      await tx.insert(tagsTable).select(
        sql`SELECT NULL,names.name FROM (${subquery}) AS names
           LEFT JOIN tags ON tags.name = names.name WHERE tags.name IS NULL`
      );
      const [post] = await tx
        .insert(postsTable)
        .values(<PostsTable>{
          title: createPostInput.title,
          content: createPostInput.content,
          thumbnail: createPostInput.thumbnail,
          slug: createPostInput.slug,
          published: createPostInput.published,
          authorId: id
        })
        .returning();
      const tagsId = tx
        .$with('tags_id')
        .as(tx.select({ id: tagsTable.id }).from(tagsTable).where(inArray(tagsTable.name, createPostInput.tags)));
      await tx
        .with(tagsId)
        .insert(postTagsTable)
        .select(() => sql`SELECT ${post.id}, tags_id.id FROM tags_id `);
      return post;
    });
    return addedPost;
  }
  async getAllPostsPaginated(offset: number, limit: number) {
    return this.db.select().from(postsTable).offset(offset).limit(limit).orderBy(desc(postsTable.createdAt));
  }
  async getPostById(postId: number) {
    const [postWithTags] = await this.db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        thumbnail: postsTable.thumbnail,
        published: postsTable.published,
        slug: postsTable.slug,
        author: {
          id: usersTable.id,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
          name: usersTable.name,
          email: usersTable.email,
          bio: usersTable.bio,
          avatar: usersTable.avatar
        },
        tags: sql`json_group_array(json_object('id', tags.id, 'name', tags.name))`
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(usersTable.id, postsTable.authorId))
      .leftJoin(postTagsTable, eq(postTagsTable.postId, postsTable.id))
      .leftJoin(tagsTable, eq(postTagsTable.tagId, tagsTable.id))
      .where(eq(postsTable.id, postId));
    return postWithTags;
  }
  async getUsersPostPaginated(userId: number, paginationArgs: PaginitionArgs) {
    const userPosts = this.db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        createdAt: postsTable.createdAt,
        updatedAt: postsTable.updatedAt,
        thumbnail: postsTable.thumbnail,
        published: postsTable.published,
        slug: postsTable.slug,
        _count: {
          totalLikes: sql<number>`COUNT(DISTINCT ${likesTable.id})`,
          totalComments: sql<number>`COUNT(DISTINCT ${commentsTable.id})`
        }
      })
      .from(postsTable)
      .leftJoin(commentsTable, eq(postsTable.id, commentsTable.postId))
      .leftJoin(likesTable, eq(postsTable.id, likesTable.postId))
      .where(eq(postsTable.authorId, userId))
      .limit(paginationArgs.limit)
      .groupBy(postsTable.id)
      .offset(paginationArgs.offset)
      .orderBy(desc(postsTable.createdAt));
    return userPosts;
  }
  async deletePost(postId: number, authorId: number) {
    const deletedPost = await this.db
      .update(postsTable)
      .set(<PostsTable>{
        deletedAt: sql`(unixepoch())` as unknown as Date,
        published: false
      })
      .where(and(eq(postsTable.authorId, authorId), eq(postsTable.id, postId)))
      .returning();
    if (deletedPost.length > 0) return true;
    const postExists = await this.db.select({ id: postsTable.id }).from(postsTable).where(eq(postsTable.id, postId)).limit(1);
    if (postExists.length === 0) throw new NotFoundException('El post no existe.');
    throw new ForbiddenException('No tienes permiso para eliminar este post.');
  }
  async countUserPosts(userId: number) {
    const [result] = await this.db
      .select({ totalUserPosts: count(postsTable.id) })
      .from(postsTable)
      .where(eq(postsTable.authorId, userId));
    return result.totalUserPosts;
  }
  async countAllPosts() {
    const [totalPostsCount] = await this.db.select({ total: count(postsTable.id) }).from(postsTable);
    return totalPostsCount.total;
  }
}
