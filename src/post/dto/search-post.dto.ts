export class SearchPostDto {
    keyword?: string;
    type?: "nomal" | "question" | "project" | "tip";
    page?: number = 1;
    limit?: number = 10;

}