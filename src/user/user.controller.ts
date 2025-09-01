import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from './decorator/userInfo.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.userService.signup(createUserDto);

    return { statusCode: 201, message: "회원가입에 성공했습니다." };
  }

  @Post("/login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.login(loginUserDto);
    res.cookie('authorization', `Bearer ${token.access_token}`);

    return { statusCode: 201, message: "로그인 성공" };
  }

  @Get("/allUserInfo")
  async findAll() {
    return await this.userService.findAllMember();
  }

  @UseGuards(AuthGuard("jwt"))
  @Get('/myInfo')
  async myInfo(@UserInfo('id') userId: number) {
    return await this.userService.myInfo(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
