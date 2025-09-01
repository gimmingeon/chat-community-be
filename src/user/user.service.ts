import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from "bcrypt"
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async signup(createUserDto: CreateUserDto) {
    const { email, password, passwordConfirm, nickname } = createUserDto;

    if (await this.userRepository.findOneBy({ email })) {
      throw new ConflictException("이미 가입된 이메일입니다. ")
    }

    if (password !== passwordConfirm) {
      throw new BadRequestException("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
    }

    if (await this.userRepository.findOneBy({ nickname })) {
      throw new ConflictException("이미 존재하는 닉네임입니다")
    }

    const hashedPassword = await hash(password, Number(this.configService.get<number>("HASH_NUMBER")));

    await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
    })

  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException("이메일 또는 비밀번호를 확인해주세요.");
    }

    const payload = { sub: user.id, userEmail: user.email }

    return { access_token: await this.jwtService.signAsync(payload) }
  }

  async findAllMember() {

    const users = await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.skills", "skill")
      .leftJoinAndSelect("user.post", "post")
      .select([
        "user.nickname",
        "skill.name",   // skill의 name 컬럼만
        "post.title"    // post의 title 컬럼만
      ])
      .getMany();

    return users;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });

  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
