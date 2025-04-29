import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true, // ✅ If you're using standalone components
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
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
        this.router.navigate(['/dashboard']); // or home
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Sign up failed. Email may already be in use.';
      }
    });
  }
}
