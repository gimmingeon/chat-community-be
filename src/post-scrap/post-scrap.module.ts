import { Module } from '@nestjs/common';
import { PostScrapService } from './post-scrap.service';
import { PostScrapController } from './post-scrap.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostScrap } from './entities/post-scrap.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostScrap, Post, User])
  ],
  controllers: [PostScrapController],
  providers: [PostScrapService],
})
export class PostScrapModule { }
