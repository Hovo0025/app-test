import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@core/material/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from "./pages/user-list/user-list.component";
import { SharedModule } from '@shared/shared.module';
import { UserPostsComponent } from "./pages/user-posts/user-posts.component";

@NgModule({
  declarations: [
    UserListComponent,
    UserPostsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule {
}
