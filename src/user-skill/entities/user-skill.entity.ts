import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "user_skill"
})
export class UserSkill {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: "varchar", nullable: true })
    skill: string;

    @ManyToOne(() => User, (user) => user.skills, { onDelete: "CASCADE" })
    user: User;
}
