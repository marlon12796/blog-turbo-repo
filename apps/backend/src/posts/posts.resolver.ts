import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import { ParseIntPipe } from '@nestjs/common';
@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(@Args() paginationArgs: PaginitionArgs) {
    return this.postsService.findAll(paginationArgs);
  }
  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }, ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Query(() => Int, { name: 'postCount' })
  count() {
    return this.postsService.countTotal();
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}
