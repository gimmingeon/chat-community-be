import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: "*"
    }
})
export class ChatGateway {

    @WebSocketServer()
    server: Server

    @SubscribeMessage("joinRoom")
    handleJoinRoom(
        @MessageBody() chatRoomId: number,
        @ConnectedSocket() socket: Socket
    ) {
        socket.join(`room-${chatRoomId}`)
    }

    @SubscribeMessage("message")
    handleMessage(
        @MessageBody() data: { roomId: number, message: string },
        // @ConnectedSocket() socket: Socket
    ) {
        this.server.to(`room-${data.roomId}`).emit("message", data.message);
    }
}