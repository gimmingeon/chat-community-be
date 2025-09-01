import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PostType } from "../entities/type/postType.type";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty({ message: "제목을 입력하세요." })
    title: string;

    @IsString()
    @IsNotEmpty({ message: "내용을 입력하세요." })
    content: string;

    @IsEnum(PostType)
    postType: PostType;
}
