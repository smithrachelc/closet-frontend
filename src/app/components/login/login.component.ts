import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);

        // ✅ Small timeout to ensure state update before navigating
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 100); // 100 milliseconds
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
}
