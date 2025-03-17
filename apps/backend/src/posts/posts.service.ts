import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { DBSetup } from 'src/db/types/db.types';
import { DB } from 'src/db/db.module';
import { postsTable } from 'src/db/schema/posts.schema';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { count, eq, sql } from 'drizzle-orm';
import { usersTable } from '@/db/schema/users.schema';
import { postTagsTable } from '@/db/schema/posts-tags.schema';
import { tagsTable } from '@/db/schema/tags.schema';

@Injectable()
export class PostsService {
  constructor(@Inject(DB) private db: DBSetup) {}
  async create(createPostInput: CreatePostInput) {
    return 'all posts';
  }

  async findAll(paginationArgs: PaginitionArgs) {
    const { offset, limit } = paginationArgs;
    const posts = await this.db.select().from(postsTable).offset(offset).limit(limit);

    return posts;
  }

  async findOne(postId: number) {
    const [postsWithTags] = await this.db
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

    if (!postsWithTags) throw new NotFoundException(`No se encontró un post con el id: ${postId}`);
    const formattedPosts = {
      ...postsWithTags,
      tags: JSON.parse(postsWithTags.tags as string).filter((tag: { id: number }) => tag.id !== null)
    };
    return formattedPosts;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
  async countTotal() {
    const [numTotal] = await this.db.select({ total: count(postsTable.id) }).from(postsTable);

    return numTotal.total;
  }
}
