import { IsEnum } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostType } from "./type/postType.type";
import { PostScrap } from "src/post-scrap/entities/post-scrap.entity";
import { PostHashtag } from "src/post-hashtag/entities/post-hashtag.entity";
import { Comment } from "src/comment/entities/comment.entity";

@Entity({
    name: "post"
})
export class Post {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: "varchar", nullable: false })
    title: string;

    @Column({ type: "varchar", nullable: false })
    content: string;

    @IsEnum(PostType)
    @Column({ type: "enum", enum: PostType, default: PostType.nomal })
    postType: PostType;

    @ManyToOne(() => User, (user) => user.post, { onDelete: "CASCADE" })
    user: User;

    // 여기서 casecade는 post가 저장될때 같이 저장되고 같이 삭제되는 거임
    @OneToMany(() => PostScrap, (postScrap) => postScrap.post)
    postScrap: PostScrap[];

    @OneToMany(() => PostHashtag, (postHashtag) => postHashtag.post, { cascade: true })
    postHashtag: PostHashtag[];

    @OneToMany(() => Comment, (comment) => comment.post)
    comment: Comment[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
