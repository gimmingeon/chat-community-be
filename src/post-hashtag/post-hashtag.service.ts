import { Injectable } from '@nestjs/common';
import { CreatePostHashtagDto } from './dto/create-post-hashtag.dto';
import { UpdatePostHashtagDto } from './dto/update-post-hashtag.dto';

@Injectable()
export class PostHashtagService {
  create(createPostHashtagDto: CreatePostHashtagDto) {
    return 'This action adds a new postHashtag';
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
