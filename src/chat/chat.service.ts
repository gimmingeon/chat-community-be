import { Injectable } from "@nestjs/common";
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
}