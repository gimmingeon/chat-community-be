import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserSkillService } from './user-skill.service';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/user/decorator/userInfo.decorator';

@Controller('user-skill')
export class UserSkillController {
  constructor(private readonly userSkillService: UserSkillService) { }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(
    @Body() createUserSkillDto: CreateUserSkillDto,
    @UserInfo("id") userId: number,
  ) {
    return await this.userSkillService.createUserSkill(createUserSkillDto, userId);
  }

  @Get()
  findAll() {
    return this.userSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSkillDto: UpdateUserSkillDto) {
    return this.userSkillService.update(+id, updateUserSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSkillService.remove(+id);
  }
}
