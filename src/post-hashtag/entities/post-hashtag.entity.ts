import { Post } from "src/post/entities/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "post_hashtag"
})
export class PostHashtag {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: Number

    @Column({ type: "varchar", nullable: true })
    hashtag: string;

    @ManyToOne(() => Post, (post) => post.postHashtag, { onDelete: "CASCADE" })
    post: Post;
}
