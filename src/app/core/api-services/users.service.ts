import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  /**
   * HTTP GET Request for get user list
   *
   * @return
   *
   * - `Observable<User[]>`
   */
  public getUsers(): Observable<User[]> {
    const endpoint = `users?_sort=registered&_order=DESC`
    return this.http.get<User[]>(`${this.apiUrl}${endpoint}`);
  }

  /**
   * HTTP GET Request for get user by id
   *
   * @return
   *
   * - `Observable<User>`
   */
  public getUserById(id: number): Observable<User[]> {
    const endpoint = `users?_id=${id}`;
    return this.http.get<User[]>(`${this.apiUrl}${endpoint}`);
  }
}
