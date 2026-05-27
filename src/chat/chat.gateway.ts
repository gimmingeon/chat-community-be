import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import * as cookie from "cookie";
import * as jwt from "jsonwebtoken";
import { ChatService } from "./chat.service";
// import { UserInfo } from "src/user/decorator/userInfo.decorator";

@WebSocketGateway({
    cors: {
        // 쿠키를 쓰려면 주소를 명확하게 지정해야함
        origin: "http://localhost:5173",
        credentials: true,
    }
})
export class ChatGateway {

    constructor(
        private readonly chatService: ChatService
    ) { }

    @WebSocketServer()
    server: Server

    handleConnection(socket: Socket) {

        try {
            const cookies = cookie.parse(
                socket.handshake.headers.cookie || ""
            );

            const authorization = cookies.authorization;

            if (!authorization) {
                console.log("로그인 안함");
                socket.disconnect();

                return;
            }

            const [tokenType, token] = authorization.split(" ");

            if (tokenType !== "Bearer") {
                socket.disconnect();
                return;
            }

            const user = jwt.verify(
                token,
                process.env.JWT_SECRET_KEY
            )

            console.log("유저: ", user);

            // 이후 이벤트에서 사용 가능
            socket.data.user = user;

        } catch (error) {

            console.log(
                "소켓 인증 에러:",
                error
            );
            socket.disconnect();
        }

    }

    @SubscribeMessage("joinRoom")
    async handleJoinRoom(
        @MessageBody() chatRoomId: number,
        @ConnectedSocket() socket: Socket,
    ) {
        const user = socket.data.user;

        await this.chatService.chatJoinRoom(chatRoomId, user.id);

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