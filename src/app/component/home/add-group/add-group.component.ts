import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  email: string = sessionStorage.getItem('email') || '';
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    members: this.fb.array([sessionStorage.getItem('email')])
  })
  selectMember: FormGroup = this.fb.group({
    member: new FormControl()
  })

  users: any[] = []
  allUsers: any[] = [];

  chatService: ChatService = inject(ChatService);


  constructor() {

    this.allUsers = [...this.chatService.users]
    this.users = [...this.chatService.users]
  }
  ngOnInit() { }

  addUser() {
    let selectedUser: any = (this.selectMember.value.member)
    this.form.value.members.push(this.selectMember.value.member)
    this.selectMember.reset()
    this.users = this.users.filter(user => user.email !== selectedUser)
  }

  removeUser(email: string) {
    this.form.value.members = this.form.value.members.filter((memberEmail: string) => memberEmail !== email)
    this.users.push(this.allUsers.find(user => user.email === email))
  }

  submit() {
    // console.log(this.form.value);
    this.chatService.createGroup(this.form.value.name, this.form.value.members)
    this.users = [...this.allUsers]
    this.form.reset()
  }

}
