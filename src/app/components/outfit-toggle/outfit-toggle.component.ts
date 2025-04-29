import { Component, Input } from '@angular/core';
import { OutfitService } from '../../services/outfit.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-outfit-toggle',
  templateUrl: './outfit-toggle.component.html',
  styleUrls: ['./outfit-toggle.component.css'],
  imports: [CommonModule, FormsModule]
})
export class OutfitToggleComponent {
  @Input() outfitId: string = '';
  @Input() isPublic: boolean = false;
  message: string = '';

  constructor(private outfitService: OutfitService, private authService: AuthService) {}

  toggleVisibility() {
    const token = this.authService.getToken();
    if (!token) {
      this.message = 'You must be logged in.';
      return;
    }

    this.outfitService.toggleOutfitVisibility(this.outfitId, !this.isPublic, token).subscribe({
      next: (res: any) => {
        this.isPublic = !this.isPublic;
        this.message = res.message;
      },
      error: (err) => {
        console.error('Error toggling outfit visibility:', err);
        this.message = 'Error updating outfit.';
      }
    });
  }
}
