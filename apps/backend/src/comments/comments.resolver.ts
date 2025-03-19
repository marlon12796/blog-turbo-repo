import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { ParseIntPipe } from '@nestjs/common';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAllByPostId(@Args('postId', { type: () => Int }, ParseIntPipe) postId: number, @Args() paginationArgs: PaginitionArgs) {
    return this.commentsService.findAllByPostId(postId, paginationArgs);
  }

  @Query(() => Int, { name: 'commentCount' })
  count(@Args('postId', { type: () => Int }, ParseIntPipe) postId: number) {
    return this.commentsService.count(postId);
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentsService.update(updateCommentInput.id, updateCommentInput);
  }
}
