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
  resetPasswordError: boolean = false
  usernameError: boolean = false
  selectedImage: any

  constructor(private authService: AuthService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      console.log(this.selectedImage)
    }
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Пароли не совпадают')
      this.resetPasswordError = true
      return
    }

    this.resetPasswordError = false

    this.authService.register(this.username, this.password, this.selectedImage).subscribe({
      next: (response) => {
        this.handleRegistrationResponse(response)
      },
      error: (error) => {
        console.error('Ошибка при отправке запроса:', error);
      }
    });
  }

  private handleRegistrationResponse(response: any): void {
    if (response.success) {
      localStorage.setItem('token', response.token);
      console.log('Пользователь успешно зарегистрирован:', response.message);
    } else {
      console.error('Ошибка при регистрации:', response.message);
      if (!this.resetPasswordError) this.usernameError = true
    }
  }
}
