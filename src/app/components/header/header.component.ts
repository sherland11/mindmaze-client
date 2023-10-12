import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLogIn: boolean = false

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout()
    console.log("Вы вышли из аккаунта")
    window.location.reload()
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.isUserLogIn = true
    }
  }
}
