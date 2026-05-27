import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { AuthGuard } from "@nestjs/passport";
import { UserInfo } from "src/user/decorator/userInfo.decorator";

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }

    @UseGuards(AuthGuard("jwt"))
    @Post("chatRoom")
    async createChatRoom(
        @Body() roomData: { postId: number, postUserId: number },
        @UserInfo("id") userId: number
    ) {
        // console.log("채팅 컨트롤러: ", roomData.postId);
        return await this.chatService.createChatRoom(
            roomData.postId,
            roomData.postUserId,
            userId
        );
    }
}