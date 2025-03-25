import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { DbModule } from 'src/db/db.module';
import { TransactionRepository } from './repository/post-transactions.repository.service';
import { PostsRepository } from './repository/posts.repository.service';

@Module({
  imports: [DbModule],
  providers: [PostsResolver, PostsService, PostsRepository, TransactionRepository],
  exports: [PostsRepository, TransactionRepository]
})
export class PostsModule {}
