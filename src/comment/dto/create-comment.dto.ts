import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty({ message: "내용을 입력해야 합니다." })
    content: string;
}
