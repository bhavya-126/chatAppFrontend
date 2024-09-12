import { Injectable, inject } from '@angular/core';
import { io } from 'socket.io-client';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:5000/chat', {
    auth: {
      token: sessionStorage.getItem('token'),
    }
  })
  httpService: HttpService = inject(HttpService);
  room: string = '';
  users = [];
  chats = new Subject();
  chat: any[] = []
  groups = new Subject()

  constructor() {
    this.socket.on('connect', () => {
      console.log('socket connected');
      this.socket.on('receive message', (data: any) => {

        console.log("message received: ", data);
        if (data.room === this.room) {
          data['time'] = new Date()
          this.chat.push(data)
          this.chats.next(this.chat)
        }
        if (sessionStorage.getItem('email') !== data.senderEmail) {
          Swal.fire({
            text: `${data.message} from ${data.senderEmail}`,
            timer: 1500,
            position: 'top-right',
          })
        }
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
    this.getGroups()
  }

  ngOnInit() {

  }

  joinRoom(senderEmail: string, receiverEmail: string) {

    let roomId = [senderEmail, receiverEmail].sort((a, b) => a > b ? 1 : -1).join('-')

    this.socket.emit('join room', { room: roomId }, (res: any) => {
      this.room = roomId;
    })

    this.priviousChats(roomId)
  }


  priviousChats(roomID: string) {
    this.room = roomID;
    this.socket.emit('previous chats', roomID, (res: any) => {
      this.chat = res.roomChat
      this.chats.next(res.roomChat)
    })
  }

  sendMessage(message: string, senderEmail: string, receiverEmail: string) {

    this.socket.emit('send message', { room: this.room, message, senderEmail, receiverEmail })
  }

  createGroup(roomName: string, members: any[]) {
    this.socket.emit('create group', { room: roomName, members })

    console.log("group created");

  }

  sendGroupMsg(message: string, room: string) {
    this.socket.emit("send group message", { room, message, senderEmail: sessionStorage.getItem("email") })
  }

  getGroups() {
    this.socket.emit('get groups', (data: any) => {
      this.groups.next(data.groups)
    })
  }
}
