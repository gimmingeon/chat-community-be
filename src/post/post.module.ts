import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { CommentModule } from 'src/comment/comment.module';
import { PostHashtagModule } from 'src/post-hashtag/post-hashtag.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommentModule,
    PostHashtagModule,
    UserModule,
    AuthModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
