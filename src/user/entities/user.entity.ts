import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
