import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private readonly apiUrl = 'https://api.github.com/users';

  private usernameSubject = new ReplaySubject<string>(1);; 
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  setUsername(name: string) {
    this.usernameSubject.next(name);
  }

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

  // Generalized function to fetch the count of items from a URL
  getCount(url: string): Observable<number> {
    return this.http.get<any[]>(url).pipe(map(data => data.length));
  }

   // Function to fetch the list of users a specific user is following
  getUserFollowing(username: string): Observable<any[]> {
    const url = `${this.apiUrl}/${username}/following`;
    return this.http.get<any[]>(url);
  }
}
