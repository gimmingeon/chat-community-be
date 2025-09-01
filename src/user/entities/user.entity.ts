import { Comment } from "src/comment/entities/comment.entity";
import { PostScrap } from "src/post-scrap/entities/post-scrap.entity";
import { Post } from "src/post/entities/post.entity";
import { UserSkill } from "src/user-skill/entities/user-skill.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
    name: "user"
})
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: "varchar", unique: true, nullable: false })
    email: string;

    @Column({ type: "varchar", nullable: false })
    password: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    nickname: string;

    @OneToMany(() => UserSkill, (userSkill) => userSkill.user, { cascade: true })
    skills: UserSkill[];

    @OneToMany(() => Post, (post) => post.user)
    post: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comment: Comment[];

    @OneToMany(() => PostScrap, (postScrap) => postScrap.user)
    postScrap: PostScrap[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
