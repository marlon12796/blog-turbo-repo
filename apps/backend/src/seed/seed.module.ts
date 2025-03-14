import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { DbModule } from 'src/db/db.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [DbModule]
})
export class SeedModule {}
