import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { Auth0Wrapper } from './Auth/Auth0Wrapper';
import { Callback } from './Auth/Callback';
import { Login } from './Auth/Login';
import { LogoutBtn } from './Auth/LogoutBtn';
import { OnlineUser } from './OnlineUsers/OnlineUser';
import { OnlineUsersWrapper } from './OnlineUsers/OnlineUsersWrapper';
import { TaskItem } from './Todo/TaskItem';
import { TodoFilters } from './Todo/TodoFilters';
import { TodoInput } from './Todo/TodoInput';
import { TodoItem } from './Todo/TodoItem';
import { TodoPrivateList } from './Todo/TodoPrivateList';
import { TodoPrivateWrapper } from './Todo/TodoPrivateWrapper';
import { TodoPublicList } from './Todo/TodoPublicList';
import { TodoPublicWrapper } from './Todo/TodoPublicWrapper';
import { Header } from './Header';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Auth0Wrapper,
    Callback,
    Login,
    LogoutBtn,
    OnlineUser,
    OnlineUsersWrapper,
    TaskItem,
    TodoFilters,
    TodoInput,
    TodoItem,
    TodoPrivateList,
    TodoPrivateWrapper,
    TodoPublicList,
    TodoPublicWrapper,
    Header
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [Auth0Wrapper]
})
export class AppModule { }
