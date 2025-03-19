import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { DB } from '@/db/db.module';
import { DBSetup } from '@/db/types/db.types';
import { commentsTable } from '@/db/schema/comment.schema';
import { desc, eq } from 'drizzle-orm';
import { usersTable } from '@/db/schema/users.schema';

@Injectable()
export class CommentsService {
  constructor(@Inject(DB) private db: DBSetup) {}
  create(createCommentInput: CreateCommentInput) {
    return 'This action adds a new comment';
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

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
