import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent {

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  chatService: ChatService = inject(ChatService);
  groupName: string = '';
  chats: any[] = [];
  email: string = String(sessionStorage.getItem("email"));

  fb: FormBuilder = inject(FormBuilder);
  chatForm: FormGroup = this.fb.group({
    message: ['', [Validators.required]]
  })


  ngOnInit() {
    this.activeRoute.queryParams.subscribe({
      next: (query: any) => {
        this.groupName = query.groupName;
        this.chatService.priviousChats(this.groupName)
      }
    })

    this.chatService.chats.subscribe({
      next: (data: any) => {
        this.chats = data;
      }
    })

  }

  sendMsg() {
    this.chatService.sendGroupMsg(this.chatForm.value.message, this.groupName)
    this.chatForm.reset()
  }
}
