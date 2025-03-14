import { Inject, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { DBSetup } from 'src/db/types/db.types';
import { DB } from 'src/db/db.module';
import { postsTable } from 'src/db/schema/posts.schema';

@Injectable()
export class PostsService {
  constructor(@Inject(DB) private db: DBSetup) {}
  async create(createPostInput: CreatePostInput) {
    return 'all posts';
  }

  async findAll() {
    const posts = await this.db.select().from(postsTable);
    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
