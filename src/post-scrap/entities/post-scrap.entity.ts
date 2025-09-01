import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "post_scrap"
})
export class PostScrap {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: Number;

    @ManyToOne(() => User, (user) => user.postScrap, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Post, (post) => post.postScrap, { onDelete: "CASCADE" })
    post: Post;

    @CreateDateColumn()
    createdAt: Date
}
