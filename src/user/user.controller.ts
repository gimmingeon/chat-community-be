import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from './decorator/userInfo.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    await this.userService.signup(createUserDto);

    return { message: "회원가입에 성공했습니다." };
  }

  @Post("/login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.login(loginUserDto);
    res.cookie('authorization', `Bearer ${token.accessToken}`, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.cookie("refreshToken", token.resfreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })

    return { message: "로그인 성공" };
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

  @Get('/userInfo/:userId')
  async userInfo(@Param("userId") userId: number) {
    return await this.userService.userInfo(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/logout")
  logout(@Res({ passthrough: true }) res: Response) {

    res.clearCookie("authorization");
    res.clearCookie("refreshToken");

    return { message: "로그아웃 성공" }
  }

  @Post("/refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {

    const refreshToken = req.cookies["refreshToken"];
    const newAccessToken = await this.userService.refresh(refreshToken);

    res.cookie("accessToken", `Bearer ${newAccessToken}`, {
      httpOnly: true,
      sameSite: "lax",
    });

    return { message: "token refreshed" };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
