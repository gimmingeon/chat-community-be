import { PostType } from "../entities/type/postType.type";

export class SearchPostDto {
    keyword?: string;
    type?: "all" | PostType;
    page?: number = 1;
    limit?: number = 10;

}