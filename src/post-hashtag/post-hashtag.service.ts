import { Injectable } from '@nestjs/common';
import { CreatePostHashtagDto } from './dto/create-post-hashtag.dto';
import { UpdatePostHashtagDto } from './dto/update-post-hashtag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostHashtag } from './entities/post-hashtag.entity';
import { EntityManager, Repository } from 'typeorm';
import { PostService } from 'src/post/post.service';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class PostHashtagService {

  constructor(
    @InjectRepository(PostHashtag)
    private readonly postHashtagRepository: Repository<PostHashtag>,
  ) { }

  async createHashtag(
    hashTag: string[],
    postId: number,
    manager?: EntityManager
  ) {

    const repo = manager ? manager.getRepository(PostHashtag) : this.postHashtagRepository;

    for (const tag of hashTag) {
      const ht = repo.create({
        hashtag: tag,
        post: { id: postId } as Post
      });

      await repo.save(ht);
    }

    // hashTag.map((tag, index) => {
    //   const ht = this.postHashtagRepository.create({
    //     hashtag: tag,
    //     post: { id: postId } as Post
    //   });

    //   this.postHashtagRepository.save(ht);
    // })
  }

  findAll() {
    return `This action returns all postHashtag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postHashtag`;
  }

  update(id: number, updatePostHashtagDto: UpdatePostHashtagDto) {
    return `This action updates a #${id} postHashtag`;
  }

  remove(id: number) {
    return `This action removes a #${id} postHashtag`;
  }
}
