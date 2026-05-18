import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class ChatGateway {

    @WebSocketServer()
    server: Server

    @SubscribeMessage("message")
    handleMessage(
        @MessageBody() data: string
    ) {
        console.log(data);

        this.server.emit("message", data);
    }
}