import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [CommonModule]
})
export class AccountComponent {
  token = '';

  constructor(private authService: AuthService) {
    this.token = this.authService.getToken() || '';
  }
}
