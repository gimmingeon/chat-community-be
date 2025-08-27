import { IsEnum } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostType } from "./type/postType.type";

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

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
