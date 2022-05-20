import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@core/material/material.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './pages/posts.component';

@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PostsRoutingModule
  ]
})
export class PostsModule {
}
