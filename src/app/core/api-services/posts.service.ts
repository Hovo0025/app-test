import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Post } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  /**
   * HTTP GET Request for get post list
   *
   * @return
   *
   * - `Observable<Post[]>`
   */
  public getPosts(): Observable<Post[]> {
    const endpoint = `posts?_sort=createdAt&_order=DESC`;
    return this.http.get<Post[]>(`${this.apiUrl}${endpoint}`);
  }

  /**
   * HTTP GET Request for get post list by userId
   *
   * @return
   *
   * - `Observable<Post[]>`
   */
  public getUserPosts(id: number): Observable<Post[]> {
    const endpoint = `posts?userId=${id}&_sort=_id&_order=ASC`;
    return this.http.get<Post[]>(`${this.apiUrl}${endpoint}`);
  }
}
