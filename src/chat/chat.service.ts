import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatRoom } from "./entities/chatRoom.entity";
import { Repository } from "typeorm";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatRoom)
        private readonly chatRoomRepository: Repository<ChatRoom>
    ) { }

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
}