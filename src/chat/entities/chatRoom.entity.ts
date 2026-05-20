import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index(
    ["postId", "postUserId", "myId"],
    { unique: true }
)

@Entity({
    name: "chat_room"
})
export class ChatRoom {
    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ unsigned: true })
    postId: number;

    @Column({ unsigned: true })
    postUserId: number;

    @Column({ unsigned: true })
    myId: number;
}