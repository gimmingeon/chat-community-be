import { Injectable } from '@nestjs/common';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserSkillService {

  constructor(
    @InjectRepository(UserSkill)
    private readonly userSkillRepository: Repository<UserSkill>
  ) { }
  async createUserSkill(createUserSkillDto: CreateUserSkillDto, userId: number) {
    const { skill } = createUserSkillDto;

    const userSkill = await this.userSkillRepository.create({
      skill,
      user: { id: userId } as User
    });

    return await this.userSkillRepository.save(userSkill);
  }

  findAll() {
    return `This action returns all userSkill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSkill`;
  }

  update(id: number, updateUserSkillDto: UpdateUserSkillDto) {
    return `This action updates a #${id} userSkill`;
  }

  async removeSkill(id: number, userId: number) {

    const skill = await this.userSkillRepository.findOne({
      where: { id },
      relations: { user: true }
    });

    if (skill.user.id !== userId) {
      throw new Error("본인만 스킬을 삭제할 수 있습니다.");
    }

    await this.userSkillRepository.delete({ id });
  }
}
