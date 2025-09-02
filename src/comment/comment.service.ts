import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) { }

  async createComment(createCommentDto: CreateCommentDto, postId: number, userId: number) {
    const { content } = createCommentDto;

    // 이렇게 하면 constructor에 조회 안하고 바로 가능
    const comment = await this.commentRepository.create({
      content,
      user: { id: userId } as User,
      post: { id: postId } as Post
    });

    return await this.commentRepository.save(comment);
  }

  async findAllComment(postId: number) {
    const comment = await this.commentRepository
      .createQueryBuilder("comment")
      .leftJoinAndSelect("comment.user", "user")
      .where("comment.postId = :postId", { postId })
      .select([
        "comment.id",
        "comment.content",
        "comment.createdAt",
        "user.id",
        "user.nickname"
      ])
      .getMany()

    return comment;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
