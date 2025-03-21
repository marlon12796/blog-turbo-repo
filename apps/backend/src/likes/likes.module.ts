import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { DbModule } from '@/db/db.module';

@Module({
  providers: [LikesResolver, LikesService],
  imports: [DbModule]
})
export class LikesModule {}
