import {Component, HostListener, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Observable } from 'rxjs';

import { UsersService } from '@core/api-services/users.service';
import { PostsService } from '@core/api-services/posts.service';
import { Post, User } from '@core/models';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  userId: number;
  user: User;
  userPosts: Post[] = [];
  isSpinnerVisible = true;
  innerWidth;
  postPager: any = {
    limit: 10,
    count: 0,
    offset: 1
  };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(private activatedRoute: ActivatedRoute,
              private usersService: UsersService,
              private router: Router,
              private postsService: PostsService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = +params['userId'];
      if (!this.userId) {
        this.router.navigate(['/'])
      }
    });
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
      this.onGetUser(),
      this.onGetUserPosts()])
      .subscribe(([userArr, postArr]) => {
        this.user = userArr[0];
        console.log('this.user', this.user);
        this.userPosts = postArr;
        setTimeout(() => {
          this.isSpinnerVisible = false;
        }, 2000)

        // this.userPager.count = this.users.length;
        // postArr.filter((post: Post) => {
        //   const idx = this.users.findIndex(user => user._id === post.userId);
        //   if (idx !== -1) {
        //     this.users[idx].posts.push(post);
        //   }
        // });
        // setTimeout(() => {
        //   this.isSpinnerVisible = false;
        // }, 2000)
      }, err => {
        alert('Run "npm run server" command in order to run json server')
      });
  }

  /**
   * api call onGetUser method to get user by id
   *
   * @return `Observable<User>`
   */
  onGetUser(): Observable<User[]> {
    return this.usersService.getUserById(this.userId);
  }

  /**
   * api call onGetUserPosts method to get user posts
   *
   * @return `Observable<Post[]>`
   */
  onGetUserPosts(): Observable<Post[]> {
    return this.postsService.getUserPosts(this.userId);
  }

  onLimitChange(limit): void {
    this.postPager.offset = 1;
    this.postPager.limit = limit;
    this.onLoadData();
  }

  onTablePagerChange(page: number): void {
    this.postPager.offset = page;
    this.onLoadData();
  }

}
