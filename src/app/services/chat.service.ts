import { Injectable, inject } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:3000/chat')
  httpService: HttpService = inject(HttpService);
  room: string = '';
  users = [];
  chats = new Subject();
  chat: any[] = []

  constructor() {
    this.socket.on('connect', () => {
      console.log('socket connected');
      this.socket.on('receive message', (data: any) => {

        console.log("message received: ", data);
        this.chat.push(data)
        this.chats.next(this.chat)

      })

      this.socket.on('disconnect', () => {
        console.log('socket disconnected');

      })

    })
    this.httpService.getUser().subscribe({
      next: (res: any) => {
        this.users = res.data
      }
    })

  }

  ngOnInit() { }

  joinRoom(senderEmail: string, receiverEmail: string) {

    let roomId = [senderEmail, receiverEmail].sort((a, b) => a > b ? 1 : -1).join('-')

    this.socket.emit('join room', roomId, (res: any) => {
      this.room = roomId;
    })

    this.priviousChats(roomId)
  }

  priviousChats(roomID: string) {
    this.socket.emit('previous chats', roomID, (res: any) => {
      this.chat = res.roomChat
      this.chats.next(res.roomChat)
    })
  }

  sendMessage(message: string, senderEmail: string, receiverEmail: string) {

    this.socket.emit('send message', this.room, message, senderEmail, receiverEmail)
  }

  addGroup(roomName: string) {
    this.socket.emit('join room', roomName, (res: any) => {
      console.log("room created: ", res);
    })
  }
}
