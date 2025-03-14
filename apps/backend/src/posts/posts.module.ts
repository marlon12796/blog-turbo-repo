import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [PostsResolver, PostsService],
  imports: [DbModule]
})
export class PostsModule {}
