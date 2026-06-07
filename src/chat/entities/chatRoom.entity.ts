import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./chat.entity";
import { User } from "src/user/entities/user.entity";
import { Post } from "src/post/entities/post.entity";

@Index(
    ["postId", "postUserId", "myId"],
    // 이렇게 unique를 넣음으로서 동시에 눌렀을때 중복되어 생성되는 것을 방지할 수 있다
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

    @OneToMany(() => Chat, (chat) => chat.chatRoom)
    chat: Chat[];

    @ManyToOne(() => User)
    @JoinColumn({
        name: "myId"
    })
    user: User;

    @ManyToOne(() => Post)
    @JoinColumn({
        name: "postId"
    })
    post: Post;

}