import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment, CommentWithoutRelations } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { CurrentUser } from '@/auth/decorators/user.decorators';
import { UserTable } from '@/db/types/db.types';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentWithoutRelations)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput, @CurrentUser() user: UserTable) {
    return this.commentsService.create(createCommentInput, user.id);
  }
  @Query(() => [Comment], { name: 'comments' })
  findAllByPostId(@Args('postId', { type: () => Int }, ParseIntPipe) postId: number, @Args() paginationArgs: PaginitionArgs) {
    return this.commentsService.findAllByPostId(postId, paginationArgs);
  }

  @Query(() => Int, { name: 'commentCount' })
  count(@Args('postId', { type: () => Int }, ParseIntPipe) postId: number) {
    return this.commentsService.count(postId);
  }
}
