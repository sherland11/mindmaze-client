import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = ''
  password: string = ''
  loginError: boolean = false

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  onSubmit(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.handleLoginResponse(response)
      },
      error: (error) => {
        console.error("Ошибка при отправке запроса: ", error)
        this.loginError = true
      }
    })
  }

  private handleLoginResponse(response: any): void {
    if (response.success) {
      this.cookieService.set('token', response.access_token);
      this.cookieService.set('user', JSON.stringify(response.user));
      console.log(response.user)
      console.log("Вход выполнен успешно: ", response.message)
      window.location.reload()
    } else {
      console.error(response)
      console.error("Ошибка при входе: ", response.message)
      this.loginError = true
    }
  }
}
