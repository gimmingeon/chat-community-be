import { Post } from "src/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

Entity({
    name: "comment"
})
export class Comment {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: "varchar", nullable: false })
    content: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => Post, (post) => post.comment, { onDelete: "CASCADE" })
    post: Post;
}
