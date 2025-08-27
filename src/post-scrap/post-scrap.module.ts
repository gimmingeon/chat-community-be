import { Module } from '@nestjs/common';
import { PostScrapService } from './post-scrap.service';
import { PostScrapController } from './post-scrap.controller';

@Module({
  controllers: [PostScrapController],
  providers: [PostScrapService],
})
export class PostScrapModule {}
