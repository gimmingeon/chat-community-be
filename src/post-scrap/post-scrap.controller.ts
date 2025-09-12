import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostScrapService } from './post-scrap.service';
import { UpdatePostScrapDto } from './dto/update-post-scrap.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/user/decorator/userInfo.decorator';

@Controller('post-scrap')
export class PostScrapController {
  constructor(private readonly postScrapService: PostScrapService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post("")
  async create(
    @UserInfo("id") userId: number,
    @Body() postId: number
  ) {
    await this.postScrapService.createScrap(userId, postId);
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
