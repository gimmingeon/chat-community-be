import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostHashtagDto {

    @IsString()
    @IsNotEmpty({ message: "해쉬태그를 입력하세요." })
    hashtag: string;
}
