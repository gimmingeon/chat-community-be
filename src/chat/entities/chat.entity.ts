import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatRoom } from "./chatRoom.entity";

@Entity({
    name: "chat"
})
export class Chat {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ type: "text" })
    content: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.chat)
    user: User;

    @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chat, { onDelete: "CASCADE" })
    chatRoom: ChatRoom;
}