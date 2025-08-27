import { Injectable } from '@nestjs/common';
import { CreatePostScrapDto } from './dto/create-post-scrap.dto';
import { UpdatePostScrapDto } from './dto/update-post-scrap.dto';

@Injectable()
export class PostScrapService {
  create(createPostScrapDto: CreatePostScrapDto) {
    return 'This action adds a new postScrap';
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
