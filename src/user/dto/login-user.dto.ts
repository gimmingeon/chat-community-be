import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty({ message: "이메일을 입력하세요" })
    email: string;

    @IsString()
    @IsNotEmpty({ message: "비밀번호를 입력하세요" })
    password: string;
}