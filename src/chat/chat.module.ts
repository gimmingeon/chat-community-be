import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatRoom } from "./entities/chatRoom.entity";
import { ChatService } from "./chat.service";
import { UserModule } from "src/user/user.module";
import { AuthModule } from "src/auth/auth.module";
import { ChatController } from "./chat.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ChatRoom]),
        UserModule,
        AuthModule,
    ],
    controllers: [ChatController],
    providers: [ChatGateway, ChatService],
})

export class ChatModule { }