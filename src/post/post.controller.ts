import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/user/decorator/userInfo.decorator';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @UseGuards(AuthGuard("jwt"))
  @Post("")
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UserInfo("id") userId: number
  ) {
    await this.postService.createPost(createPostDto, userId);
    return { statusCode: 201, message: "게시물이 생성되었습니다." }
  }

  @Get("")
  async findAllPost() {
    return await this.postService.findAllPost();
  }

  @Get(':id')
  async findOnePost(@Param('id') id: number) {
    return await this.postService.findOnePost(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
