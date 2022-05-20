import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './pages/user-list/user-list.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';

const routes: Routes = [
  {
    path: 'all', component: UserListComponent,
  },
  {
    path: 'posts', component: UserPostsComponent
  },
  { path: '**', redirectTo: 'all', }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
