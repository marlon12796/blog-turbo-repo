import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { DB } from '@/db/db.module';
import { CommentsTable, DBSetup } from '@/db/types/db.types';
import { commentsTable } from '@/db/schema/comment.schema';
import { count, desc, eq } from 'drizzle-orm';
import { usersTable } from '@/db/schema/users.schema';

@Injectable()
export class CommentsService {
  constructor(@Inject(DB) private db: DBSetup) {}
  async create(createCommentInput: CreateCommentInput, idUser: number) {
    const [commentCreated] = await this.db
      .insert(commentsTable)
      .values(<CommentsTable>{ ...createCommentInput, authorId: idUser })
      .returning();
    if (!commentCreated) throw new BadRequestException('No se pudo crear el comentario. Inténtalo nuevamente.');

    return commentCreated;
  }

  async findAllByPostId(postId: number, paginationArgs: PaginitionArgs) {
    const commentsByPost = await this.db
      .select({
        id: commentsTable.id,
        postId: commentsTable.postId,
        content: commentsTable.content,
        createdAt: commentsTable.createdAt,
        updatedAt: commentsTable.updatedAt,
        author: {
          email: usersTable.email,
          name: usersTable.name,
          avatar: usersTable.avatar,
          bio: usersTable.bio,
          authType: usersTable.authType,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
          id: usersTable.id
        }
      })
      .from(commentsTable)
      .innerJoin(usersTable, eq(usersTable.id, commentsTable.authorId))
      .where(eq(commentsTable.postId, postId))
      .limit(paginationArgs.limit)
      .offset(paginationArgs.offset)
      .orderBy(desc(commentsTable.updatedAt));
    return commentsByPost;
  }

  async count(postId: number) {
    const [totalCountComments] = await this.db
      .select({ totalPosts: count(commentsTable.id) })
      .from(commentsTable)
      .where(eq(commentsTable.postId, postId));
    return totalCountComments.totalPosts;
  }
}
