import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { UserTable } from '@/db/types/db.types';
import { CurrentUser } from '@/auth/decorators/user.decorators';
import { LikePostArgs } from './args/likePost.args';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  likePost(@Args() likePost: LikePostArgs, @CurrentUser() user: UserTable) {
    return this.likesService.likePost(likePost, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  unlikePost(@Args() likePost: LikePostArgs, @CurrentUser() user: UserTable) {
    return this.likesService.unlikePost(likePost, user.id);
  }

  @Query(() => Int)
  postLikesCount(@Args() likePost: LikePostArgs) {
    return this.likesService.getPostLikeCount(likePost.postId);
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  userLikedPost(@Args() likePost: LikePostArgs, @CurrentUser() user: UserTable) {
    return this.likesService.userLikedPost(likePost, user.id);
  }
}
