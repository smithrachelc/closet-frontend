import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  logIn(): void {
    this.http
      .post<{ token: string }>(
        `${environment.apiUrl}/api/login`,
        { email: this.email, password: this.password }
      )
      .subscribe({
        next: res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.error('Login error:', err);
          this.errorMessage = 'Invalid email or password.';
        }
      });
  }
}
