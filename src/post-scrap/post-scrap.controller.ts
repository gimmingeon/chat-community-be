import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostScrapService } from './post-scrap.service';
import { CreatePostScrapDto } from './dto/create-post-scrap.dto';
import { UpdatePostScrapDto } from './dto/update-post-scrap.dto';

@Controller('post-scrap')
export class PostScrapController {
  constructor(private readonly postScrapService: PostScrapService) {}

  @Post()
  create(@Body() createPostScrapDto: CreatePostScrapDto) {
    return this.postScrapService.create(createPostScrapDto);
  }

  @Get()
  findAll() {
    return this.postScrapService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postScrapService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostScrapDto: UpdatePostScrapDto) {
    return this.postScrapService.update(+id, updatePostScrapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postScrapService.remove(+id);
  }
}
