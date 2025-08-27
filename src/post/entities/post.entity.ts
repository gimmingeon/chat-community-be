import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => User, (user) => user.post, { onDelete: "CASCADE" })
    user: User

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;


}
