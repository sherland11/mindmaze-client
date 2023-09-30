import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileByUsernameService {
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${username}`)
  }
}
