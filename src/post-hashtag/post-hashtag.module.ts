import { Module } from '@nestjs/common';
import { PostHashtagService } from './post-hashtag.service';
import { PostHashtagController } from './post-hashtag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostHashtag } from './entities/post-hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostHashtag])],
  controllers: [PostHashtagController],
  providers: [PostHashtagService],
})
export class PostHashtagModule { }
