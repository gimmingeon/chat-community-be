import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/user/decorator/userInfo.decorator';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post("/:postId")
  async createComment(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @UserInfo("id") userId: number
  ) {
    return await this.commentService.createComment(createCommentDto, postId, userId);
  }

  @Get("/:postId")
  async findAllComment(
    @Param("postId") postId: number,
  ) {
    return await this.commentService.findAllComment(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: CreateCommentDto,
    @UserInfo("id") userId: number
  ) {
    await this.commentService.updateComment(id, updateCommentDto, userId);

    return { message: "댓글을 삭제했습니다." }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async removeComment(
    @Param('id') id: number,
    @UserInfo("id") userId: number
  ) {
    await this.commentService.removeComment(id, userId);

    return { message: "댓글을 삭제했습니다." }
  }
}
