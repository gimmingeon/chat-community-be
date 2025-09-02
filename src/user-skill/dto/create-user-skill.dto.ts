import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserSkillDto {
    @IsString()
    @IsNotEmpty({ message: "기술을 입력해주세요" })
    skill: string;
}
