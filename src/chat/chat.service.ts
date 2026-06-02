import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatRoom } from "./entities/chatRoom.entity";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatRoom)
        private readonly chatRoomRepository: Repository<ChatRoom>,
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>
    ) { }

    // 채팅룸
    async createChatRoom(postId: number, postUserId: number, myId: number) {
        const chatRoom = await this.chatRoomRepository.findOneBy({ postId, postUserId, myId })

        if (chatRoom) {
            return chatRoom.id;
        } else {
            const chatRoom = await this.chatRoomRepository.save({ postId, postUserId, myId });
            return chatRoom.id
        }
    }

    async chatJoinRoom(chatRoomId: number, userId: number) {
        const chatRoom = await this.chatRoomRepository.findOneBy({ id: chatRoomId });

        if (!chatRoom) {
            throw new Error("존재하지 않는 채팅방입니다.");
        }
        if (chatRoom.myId !== userId && chatRoom.postUserId !== userId) {
            throw new ForbiddenException("허락되지 않은 채팅방 유저입니다.");
        }
    }



    // 채팅
    async createChat(userId: number, chatRoomId: number, content: string) {

        const chat = await this.chatRepository.save({
            content,
            user: { id: userId } as User,
            chatRoom: { id: chatRoomId } as ChatRoom
        });

        return chat;
    }

    async getChat(chatRoomId: number) {

        const chat = await this.chatRepository
            .createQueryBuilder("chat")
            .leftJoinAndSelect("chat.user", "user")
            .where("chat.chatRoom = :chatRoomId", { chatRoomId })
            .select([
                "chat.id",
                "chat.content",
                "chat.createdAt",
                "user.id",
                "user.nickname"
            ])
            .orderBy("chat.createdAt", "ASC")
            .getMany();

        return chat;
    }
}