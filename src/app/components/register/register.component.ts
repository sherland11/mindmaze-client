import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = ''
  password: string = ''
  confirmPassword: string = ''

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Пароли не совпадают')
      return
    }

    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        this.handleRegistrationResponse(response)
      },
      (error) => {
        console.error('Ошибка при отправке запроса:', error)
      }
    )
  }

  private handleRegistrationResponse(response: any): void {
    if (response.success) {
      localStorage.setItem('token', response.token)
    } else {
      console.error('Ошибка при регистрации:', response.error)
    }
  }
}
