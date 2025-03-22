import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { DBSetup } from 'src/db/types/db.types';
import { DB } from 'src/db/db.module';
import { postsTable } from 'src/db/schema/posts.schema';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { count, eq, sql } from 'drizzle-orm';
import { usersTable } from '@/db/schema/users.schema';
import { postTagsTable } from '@/db/schema/posts-tags.schema';
import { tagsTable, commentsTable, likesTable } from '@/db/schema/db.schema';

@Injectable()
export class PostsService {
  constructor(@Inject(DB) private db: DBSetup) {}

  // Crear un nuevo post
  async createNewPost(createPostInput: CreatePostInput) {
    return 'all posts';
  }

  // Obtener todos los posts paginados
  async getAllPostsPaginated(paginationArgs: PaginitionArgs) {
    const { offset, limit } = paginationArgs;
    const posts = await this.db.select().from(postsTable).offset(offset).limit(limit);
    return posts;
  }

  // Obtener un post específico por ID
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

    if (!postWithTags) throw new NotFoundException(`No se encontró un post con el id: ${postId}`);
    const formattedPost = {
      ...postWithTags,
      tags: JSON.parse(postWithTags.tags as string).filter((tag: { id: number }) => tag.id !== null)
    };
    return formattedPost;
  }

  // Obtener los posts de un usuario específico
  async getUserPostsPaginated(userId: number, paginationArgs: PaginitionArgs) {
    const { limit, offset } = paginationArgs;
    const userPosts = await this.db
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
      .limit(limit)
      .groupBy(postsTable.id)
      .offset(offset);
    return userPosts;
  }

  // Contar el número total de posts de un usuario específico
  async countUserPosts(userId: number) {
    const [userPostCount] = await this.db
      .select({
        totalUserPosts: count(postsTable.id)
      })
      .from(postsTable)
      .where(eq(postsTable.authorId, userId));
    return userPostCount.totalUserPosts;
  }

  // Contar el número total de posts en la base de datos
  async countAllPosts() {
    const [totalPostsCount] = await this.db.select({ total: count(postsTable.id) }).from(postsTable);
    return totalPostsCount.total;
  }
}
