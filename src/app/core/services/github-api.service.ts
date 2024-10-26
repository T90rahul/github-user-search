import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private readonly apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUsers(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`);
  }

  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${username}`);
  }

  getUserRepos(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${username}/repos`);
  }

  getUserFollowers(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${username}/followers`);
  }
}
