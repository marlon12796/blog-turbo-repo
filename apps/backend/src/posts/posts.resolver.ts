import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
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

  // Mutation: Crear un nuevo post
  @Mutation(() => Post, { name: 'createNewPost' })
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.createNewPost(createPostInput);
  }

  // Query: Obtener todos los posts paginados
  @Query(() => [Post], { name: 'getAllPosts' })
  getAllPosts(@Args() paginationArgs: PaginitionArgs) {
    return this.postsService.getAllPostsPaginated(paginationArgs);
  }

  // Query: Obtener un post específico por ID
  @Query(() => Post, { name: 'getPostById' })
  getPostById(@Args('postId', { type: () => Int }, ParseIntPipe) postId: number) {
    return this.postsService.getPostById(postId);
  }

  // Query: Obtener los posts de un usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Query(() => [AuthorPost], { name: 'getUserPosts' })
  getUserPosts(@Args() paginationArgs: PaginitionArgs, @CurrentUser() user: UserTable) {
    return this.postsService.getUserPostsPaginated(user.id, paginationArgs);
  }

  // Query: Contar el número total de posts de un usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Query(() => Int, { name: 'countUserPosts' })
  countUserPosts(@CurrentUser() user: UserTable) {
    return this.postsService.countUserPosts(user.id);
  }

  // Query: Contar el número total de posts en la base de datos
  @Query(() => Int, { name: 'countAllPosts' })
  countAllPosts() {
    return this.postsService.countAllPosts();
  }
}
