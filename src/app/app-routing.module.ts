import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { PathNotFoundComponent } from './component/path-not-found/path-not-found.component';
import { HomeComponent } from './component/home/home.component';
import { ChatComponent } from './component/home/chat/chat.component';
import { AddGroupComponent } from './component/home/add-group/add-group.component';
import { AuthGuardService } from './services/auth-guard.service';
import { GroupChatComponent } from './component/home/group-chat/group-chat.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService], children: [
      { path: 'chat', component: ChatComponent },
      { path: 'addGroup', component: AddGroupComponent },
      { path: 'groupChat', component: GroupChatComponent }
    ]
  },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
