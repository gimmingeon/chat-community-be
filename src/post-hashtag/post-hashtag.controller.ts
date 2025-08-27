import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostHashtagService } from './post-hashtag.service';
import { CreatePostHashtagDto } from './dto/create-post-hashtag.dto';
import { UpdatePostHashtagDto } from './dto/update-post-hashtag.dto';

@Controller('post-hashtag')
export class PostHashtagController {
  constructor(private readonly postHashtagService: PostHashtagService) {}

  @Post()
  create(@Body() createPostHashtagDto: CreatePostHashtagDto) {
    return this.postHashtagService.create(createPostHashtagDto);
  }

  @Get()
  findAll() {
    return this.postHashtagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postHashtagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostHashtagDto: UpdatePostHashtagDto) {
    return this.postHashtagService.update(+id, updatePostHashtagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postHashtagService.remove(+id);
  }
}
