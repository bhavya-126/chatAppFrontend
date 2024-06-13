import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { PathNotFoundComponent } from './component/path-not-found/path-not-found.component';
import { HomeComponent } from './component/home/home.component';
import { ChatComponent } from './component/home/chat/chat.component';
import { AddGroupComponent } from './component/home/add-group/add-group.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'chat', component: ChatComponent },
      { path: 'addGroup', component: AddGroupComponent }
    ]
  },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
