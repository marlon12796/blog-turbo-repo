import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post, PostWithoutRelations } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { CurrentUser } from '@/auth/decorators/user.decorators';
import { UserTable } from '@/db/types/db.types';
import { AuthorPost } from './entities/authorPost.entity';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostWithoutRelations, { name: 'createNewPost' })
  createPost(@Args('createPostInput') createPostInput: CreatePostInput, @CurrentUser() user: UserTable) {
    return this.postsService.createNewPost(createPostInput, user.id);
  }

  @Query(() => [Post], { name: 'getAllPosts' })
  getAllPosts(@Args() paginationArgs: PaginitionArgs) {
    return this.postsService.getAllPostsPaginated(paginationArgs);
  }

  @Query(() => Post, { name: 'getPostById' })
  getPostById(@Args('postId', { type: () => Int }, ParseIntPipe) postId: number) {
    return this.postsService.getPostById(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [AuthorPost], { name: 'getUserPosts' })
  getUserPosts(@Args() paginationArgs: PaginitionArgs, @CurrentUser() user: UserTable) {
    return this.postsService.getUserPostsPaginated(user.id, paginationArgs);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'countUserPosts' })
  countUserPosts(@CurrentUser() user: UserTable) {
    return this.postsService.countUserPosts(user.id);
  }

  @Query(() => Int, { name: 'countAllPosts' })
  countAllPosts() {
    return this.postsService.countAllPosts();
  }
}
