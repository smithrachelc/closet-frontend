import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => this.errorMessage = 'User Created!'
    });
  }
}
