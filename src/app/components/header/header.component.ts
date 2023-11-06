import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLogIn: boolean = false
  user: User = {
    username: '',
    avatar: ''
  }

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout()
    console.log("Вы вышли из аккаунта")
    window.location.reload()
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('user')
    if (userData) {
      this.user = JSON.parse(userData)
      this.isUserLogIn = true

    }
  }
}
