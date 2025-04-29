import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  name = '';
  category = '';
  categories = ['Tops', 'Bottoms', 'Dresses', 'Jackets', 'Shoes', 'Accessories'];
  preview: string | null = null;
  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadClothing(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'You must be logged in to upload clothing.';
      return;
    }
    if (!this.preview) {
      this.errorMessage = 'Please select an image.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.post('https://closet-backend-pi.vercel.app/api/clothing/upload', {
      name: this.name,
      category: this.category,
      image: this.preview
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Clothing uploaded successfully!';
        this.name = '';
        this.category = '';
        this.preview = null;
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: err => {
        console.error('Upload error:', err);
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = 'Upload failed. Please try again.';
      }
    });
  }
}
