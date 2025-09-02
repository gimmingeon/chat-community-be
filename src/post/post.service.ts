import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService
  ) { }

  async createPost(createPostDto: CreatePostDto, userId: number) {
    const { title, content, postType } = createPostDto;

    const user = await this.userService.findById(userId);

    const post = this.postRepository.create({
      title,
      content,
      postType,
      user
    });

    await this.postRepository.save(post);
  }

  async findAllPost() {
    const posts = await this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.user", "user")
      .select([
        "post.id",
        "post.title",
        "post.postType",
        "user.nickname",
      ])
      .getMany();

    return posts;
  }

  async findOnePost(id: number) {
    const post = await this.postRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.postHashtag", "postHashtag")
      .leftJoinAndSelect("post.user", "user")
      .select([
        "post.id",
        "post.title",
        "post.content",
        "post.postType",
        "postHashtag.hashtag",
        "user.id",
        "user.nickname"
      ])
      .where("post.id = :id", { id })
      .getOne();


    return post
  }

  async updatePost(id: number, userId: number, updatePostDto: CreatePostDto) {
    const { title, content, postType } = updatePostDto

    const post = await this.postRepository.findOne({
      where: { id },
      relations: { user: true }
    });

    if (post.user.id !== userId) {
      throw new ForbiddenException("게시글은 작성한 유저만 삭제가 가능합니다.");
    }

    await this.postRepository.update(
      { id },
      {
        title,
        content,
        postType
      }
    )
  }

  async removePost(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: { user: true }
    });

    if (post.user.id !== userId) {
      throw new ForbiddenException("게시글은 작성한 유저만 삭제가 가능합니다.")
    }

    await this.postRepository.delete({ id });
  }
}
