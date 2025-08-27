import { Module } from '@nestjs/common';
import { PostHashtagService } from './post-hashtag.service';
import { PostHashtagController } from './post-hashtag.controller';

@Module({
  controllers: [PostHashtagController],
  providers: [PostHashtagService],
})
export class PostHashtagModule {}
