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
  httpService: HttpService = inject(HttpService);
  chatService: ChatService = inject(ChatService);
  users: any[] = [];
  constructor() {
    this.httpService.getUser().subscribe({
      next: (res: any) => {
        this.users = res.data
        console.log(this.users);
      }
    })
  }

  router: Router = inject(Router);
  addChat(user: any) {


    this.chatService.joinRoom(String(sessionStorage.getItem("email")), user.email)

    this.router.navigate(["home", "chat"], { queryParams: { userId: user.id } })
  }

  addGroup(){
    
  }

}
