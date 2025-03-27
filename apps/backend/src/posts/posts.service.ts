import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput, UpdatePostInput } from './dto/create-post.input';
import { DBSetup } from 'src/db/types/db.types';
import { DB } from 'src/db/db.module';
import { PaginitionArgs } from '@/common/dto/args/pagination.args';
import slugify from 'slugify';
import { PostsRepository } from './repository/posts.repository.service';
import { TransactionRepository } from './repository/post-transactions.repository.service';
@Injectable()
export class PostsService {
  constructor(
    @Inject(DB) private db: DBSetup,
    private readonly postsRepository: PostsRepository,
    private readonly txPostsRepostitoty: TransactionRepository
  ) {}

  async createNewPost(createPostInput: CreatePostInput, authorId: number) {
    const slug = slugify(createPostInput.title, { lower: true, strict: true, trim: true });
    return this.postsRepository.createPost({ ...createPostInput, slug }, authorId);
  }

  async getAllPostsPaginated(paginationArgs: PaginitionArgs) {
    const { offset, limit } = paginationArgs;
    return this.postsRepository.getAllPostsPaginated(offset, limit);
  }

  async getPostById(postId: number) {
    const postWithTags = await this.postsRepository.getPostById(postId);
    if (!postWithTags) throw new NotFoundException(`No se encontró un post con el id: ${postId}`);
    const formattedPost = {
      ...postWithTags,
      tags: JSON.parse(postWithTags.tags as string).filter((tag: { id: number }) => tag.id !== null)
    };
    return formattedPost;
  }

  async getUserPostsPaginated(userId: number, paginationArgs: PaginitionArgs) {
    const { limit, offset } = paginationArgs;
    return this.postsRepository.getUsersPostPaginated(userId, { limit, offset });
  }
  async updatePost(updatePostInput: UpdatePostInput, id: number) {
    const { postId, tags, ...data } = updatePostInput;
    const slug = data.title ? slugify(data.title, { lower: true, strict: true, trim: true }) : undefined;
    const dataInputUpdate = {
      ...data,
      ...(slug && { slug })
    };
    const hasPostChanges = Object.values(dataInputUpdate).length > 0;
    const hasTags = Array.isArray(tags) && tags.length > 0;
    if (!hasPostChanges && !hasTags) return true;
    await this.db.transaction(async (tx) => {
      if (hasPostChanges) await this.txPostsRepostitoty.updatePost(tx, postId, dataInputUpdate);
      if (hasTags) {
        await this.txPostsRepostitoty.insertTagsIfNotExists(tx, tags);
        await this.txPostsRepostitoty.associateTagsWithPost(tx, postId, tags);
        await this.txPostsRepostitoty.deleteUnusedTags(tx, postId, tags);
      }
    });
    return true;
  }
  deletePost(postId: number, idUser: number) {
    return this.postsRepository.deletePost(postId, idUser);
  }

  async countUserPosts(userId: number) {
    return this.postsRepository.countUserPosts(userId);
  }
  async countAllPosts() {
    return this.postsRepository.countAllPosts();
  }
}
