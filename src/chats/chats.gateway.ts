import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

@WebSocketGateway({
  // ws://localhost:3000/chats
  namespace: 'chats',
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatsService: ChatsService) {}

  @WebSocketServer()
  server: Server;

  //연결된 유저의 상태
  connectedUser: { [socketId: string]: boolean } = {};
  //유저의 닉네임
  userNickname: { [socketId: string]: any } = {};
  //해당 방의 유저 배열
  roomParticipant: { [key: string]: string[] } = {};

  handleConnection(socket: Socket) {
    this.connectedUser[socket.id] = true;
    console.log(`on connect called : ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    delete this.connectedUser[socket.id];

    //유저가 연결을 종료했을 때 모든 방에서 제거
    Object.keys(this.roomParticipant).forEach((room) => {
      const index = this.roomParticipant[room]?.indexOf(
        this.userNickname[socket.id],
      );
      if (index !== -1) {
        this.roomParticipant[room].splice(index, 1);
      }
    });
  }

  //닉네임 생성
  @SubscribeMessage('createUserNickname')
  createUserNickname(
    @MessageBody() userNickname: string,
    @ConnectedSocket() socket: Socket,
  ): void {
    if (!userNickname) {
      throw new Error('required nickname');
    }

    this.userNickname[socket.id] = userNickname;
  }

  @SubscribeMessage('enter_chat')
  enterChat(
    // 방의 지역 코드를 숫자로 받음
    @MessageBody() cityId: number[],
    @ConnectedSocket() socket: Socket,
    // socket: Socket, cityId: number
  ) {
    //숫자를 문자로 변환
    const room = cityId.toString();

    //이미 접속한 방인지 확인
    if (socket.rooms.has(room)) {
      return;
    }
    socket.join(room);
  }

  @SubscribeMessage('send_message')
  sendMessage(
    @MessageBody() message: { message: string; cityId: number },
    @ConnectedSocket() socket: Socket,
  ) {
    const userNickname = this.userNickname[socket.id].userNickname;
    socket.to(message.cityId.toString()).emit('receive_message', {
      message: message.message,
      userNickname,
    });

    return this.chatsService.createChat(
      userNickname,
      message.cityId,
      message.message,
    );
  }
}
