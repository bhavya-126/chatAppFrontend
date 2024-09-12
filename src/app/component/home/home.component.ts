import { query } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  email: string = sessionStorage.getItem("email") || '';
  httpService: HttpService = inject(HttpService);
  chatService: ChatService = inject(ChatService);
  users: any[] = [];
  groups: any[] = [];
  constructor() {
    this.httpService.getUser().subscribe({
      next: (res: any) => {
        this.users = res.data
        console.log("users", this.users);
      }
    })

    this.chatService.groups.subscribe({
      next: (data: any) => {
        this.groups = data
        console.log("groups: ", this.groups);
      }
    })

  }

  router: Router = inject(Router);
  addChat(user: any) {

    this.chatService.joinRoom(String(sessionStorage.getItem("email")), user.email)

    this.router.navigate(["home", "chat"], { queryParams: { userId: user.id } })
  }

  addGroup(groupName: string) {
    this.router.navigate(["home", "groupChat"], { queryParams: { groupName } })
  }

  logOut() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("email")
    this.router.navigate(["/login"])
  }

  sendGroupMsg() {
    this.chatService.sendGroupMsg('hello group', 'frndz')
  }
}
