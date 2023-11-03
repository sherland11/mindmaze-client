import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'http://localhost:3000/auth'

  constructor(private http: HttpClient) { }

  register(username: string, password: string, avatar: File): Observable<any> {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('avatar', avatar)
    return this.http.post(`${this.apiBaseUrl}/register`, formData)
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/login`, { username, password })
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
  }
}
