import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostHashtagService } from './post-hashtag.service';
import { CreatePostHashtagDto } from './dto/create-post-hashtag.dto';
import { UpdatePostHashtagDto } from './dto/update-post-hashtag.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/user/decorator/userInfo.decorator';

@Controller('post-hashtag')
export class PostHashtagController {
  constructor(private readonly postHashtagService: PostHashtagService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post("")
  createHashtag(
  ) {
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
