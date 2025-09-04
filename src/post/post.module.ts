import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostHashtagModule } from 'src/post-hashtag/post-hashtag.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostHashtag } from 'src/post-hashtag/entities/post-hashtag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostHashtag]),
    UserModule,
    AuthModule,
    PostHashtagModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
