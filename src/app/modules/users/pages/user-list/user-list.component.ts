import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatDialog } from '@angular/material/dialog';

import { UsersService } from '@core/api-services/users.service';
import { PostsService } from '@core/api-services/posts.service';
import { Post, User } from '@core/models';
import { ExportDialogComponent } from '@shared/components/export-dialog/export-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userPager: any = {
    limit: 10,
    count: 0,
    offset: 1
  };
  isSpinnerVisible = true;

  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  private destroy$: Subject<void> = new Subject<void>();
  constructor(private usersService: UsersService,
              private dialog: MatDialog,
              private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  /**
   * call onGetUsers and onGetPosts methods to get users and posts
   *
   * @return `null`
   */
  onLoadData(): void {
    forkJoin([
      this.onGetUsers(),
      this.onGetPosts()])
      .subscribe(([userArr, postArr]) => {
        this.users = userArr;
        this.userPager.count = this.users.length;
        postArr.filter((post: Post) => {
          const idx = this.users.findIndex(user => user._id === post.userId);
          if (idx !== -1) {
            this.users[idx].posts.push(post);
          }
        });
        setTimeout(() => {
          this.isSpinnerVisible = false;
        }, 2000)
      }, err => {
        alert('Run "npm run server" command in order to run json server')
      });
  }

  /**
   * api call onGetUsers method to get users
   *
   * @return `Observable<User[]>`
   */
  onGetUsers(): Observable<User[]> {
    return this.usersService.getUsers()
  }

  /**
   * api call getPosts method to get posts
   *
   * @return `Observable<Post[]>`
   */
  onGetPosts(): Observable<Post[]> {
    return this.postsService.getPosts()
  }

  onLimitChange(limit): void {
    this.userPager.offset = 1;
    this.userPager.limit = limit;
    this.onLoadData();
  }

  onTablePagerChange(page: number): void {
    this.userPager.offset = page;
    this.onLoadData();
  }

  openExportDialog(): void {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      data: {users: this.users, title: 'User list'},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
