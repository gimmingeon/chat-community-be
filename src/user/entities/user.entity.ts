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

    @OneToMany(() => Post, (post) => post.user, { cascade: true })
    post: Post[];

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
