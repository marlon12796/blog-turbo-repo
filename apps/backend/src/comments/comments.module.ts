import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { DbModule } from '@/db/db.module';

@Module({
  providers: [CommentsResolver, CommentsService],
  imports: [DbModule]
})
export class CommentsModule {}
