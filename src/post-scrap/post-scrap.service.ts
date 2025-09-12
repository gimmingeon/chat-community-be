import { Injectable } from '@nestjs/common';
import { UpdatePostScrapDto } from './dto/update-post-scrap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostScrap } from './entities/post-scrap.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class PostScrapService {

  constructor(
    @InjectRepository(PostScrap)
    private readonly postScrapRepository: Repository<PostScrap>
  ) { }

  async createScrap(userId: number, postId: number) {

    const scrap = await this.postScrapRepository.create({
      user: { id: userId } as User,
      post: { id: postId } as Post
    });

    return await this.postScrapRepository.save(scrap);
  }

  findAll() {
    return `This action returns all postScrap`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postScrap`;
  }

  update(id: number, updatePostScrapDto: UpdatePostScrapDto) {
    return `This action updates a #${id} postScrap`;
  }

  remove(id: number) {
    return `This action removes a #${id} postScrap`;
  }
}
