import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

interface user {
  name: string,
  email: string,
  id: number
}
interface message {
  message: string,
  recieverEmail: string,
  room: string,
  senderEmail: string,
  time: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  email: string = String(sessionStorage.getItem("email"));
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  receiver: user = { name: "", email: "", id: 0 };
  chatService: ChatService = inject(ChatService);

  fb: FormBuilder = inject(FormBuilder);
  chatForm: FormGroup = this.fb.group({
    message: ['']
  })

  chats: message[] = []

  constructor() {

  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((query: any) => {
      if (query.userId) {
        this.chatService.users.find((user: any) => {
          if (user.id == query.userId) {
            this.receiver = user;
          }
        })
      }

      // if (query.groupName) {
      //   console.log("group name: ", query.groupName);
      //   this.chatService.priviousChats(query.groupName)
      // }
    })

    this.chatService.chats.subscribe((chats: any) => {
      this.chats = chats;
    })
  }

  sendMessage() {
    let msg = this.chatForm.value.message;
    this.chatService.sendMessage(msg, String(sessionStorage.getItem("email")), this.receiver.email)
    this.chatForm.reset();
  }
}
