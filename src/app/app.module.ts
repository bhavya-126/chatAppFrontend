import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { PathNotFoundComponent } from './component/path-not-found/path-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './component/home/chat/chat.component';
import { AddGroupComponent } from './component/home/add-group/add-group.component';
import { GroupChatComponent } from './component/home/group-chat/group-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    PathNotFoundComponent,
    ChatComponent,
    AddGroupComponent,
    GroupChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
