import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = ''
  password: string = ''

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        this.handleLoginResponse(response)
      },
      (error) => {
        console.error('Ошибка при отправке запроса: ', error)
      }
    )
  }

  private handleLoginResponse(response: any): void {
    if (response.success) {
      localStorage.setItem('token', response.token)
    } else {
      console.error("Ошибка при входе: ", response.error)
    }
  }
}
