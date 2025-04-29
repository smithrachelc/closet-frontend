import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upload-clothing',
  templateUrl: './upload-clothing.component.html',
  styleUrls: ['./upload-clothing.component.css']
})
export class UploadClothingComponent {
  clothingName = '';
  clothingCategory = '';
  selectedImageFile: File | null = null;
  imageDataUrl: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDataUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadClothing(): void {
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.clothingName);
    formData.append('category', this.clothingCategory);
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`
    });

    this.http.post('https://closet-backend-theta.vercel.app/api/clothing/upload', formData, { headers })
      .subscribe({
        next: (res) => {
          alert('Upload successful!');
          // optionally reload clothing list
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert('Upload failed');
        }
      });
  }
}

