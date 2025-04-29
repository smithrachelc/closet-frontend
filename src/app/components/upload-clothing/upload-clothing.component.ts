import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-clothing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload-clothing.component.html',
  styleUrls: ['./upload-clothing.component.css']
})
export class UploadClothingComponent {
  clothingName = '';
  category = '';
  selectedFile: File | null = null;
  imageBase64: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadClothing() {
    if (!this.imageBase64 || !this.clothingName) {
      alert('Please select an image and provide a name.');
      return;
    }

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const payload = {
      name: this.clothingName,
      category: this.category,
      imageBase64: this.imageBase64
    };

    this.http.post(`${environment.apiUrl}/clothing/upload`, payload, { headers })
      .subscribe({
        next: (res) => {
          alert('Clothing item uploaded successfully!');
          this.clothingName = '';
          this.category = '';
          this.selectedFile = null;
          this.imageBase64 = '';
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert('Failed to upload clothing item.');
        }
      });
  }
}
