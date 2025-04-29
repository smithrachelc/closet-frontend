import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClothingService } from '../../services/clothing.service';

@Component({
  standalone: true,
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class UploadComponent {
  name = '';
  category = '';
  imageFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private clothingService: ClothingService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  uploadClothing() {
    if (!this.imageFile) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      this.clothingService.addClothingItem(this.name, this.category, base64).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: err => console.error('Upload failed:', err)
      });
    };
    reader.readAsDataURL(this.imageFile);
  }
}
