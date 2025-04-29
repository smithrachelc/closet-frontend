import { Component } from '@angular/core';
import { ClothingService } from '../../services/clothing.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-upload-clothing',
  templateUrl: './upload-clothing.component.html',
  styleUrls: ['./upload-clothing.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class UploadClothingComponent {
  clothingName: string = '';
  clothingCategory: string = '';
  selectedImageFile: File | null = null;
  imageDataUrl: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  categories: string[] = ['Tops', 'Bottoms', 'Dresses', 'Jackets', 'Shoes', 'Accessories'];

  constructor(private clothingService: ClothingService) {}

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
    if (!this.clothingName.trim() || !this.clothingCategory || !this.selectedImageFile) {
      this.errorMessage = 'Please fill out all fields and select an image.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.clothingName);
    formData.append('category', this.clothingCategory);
    formData.append('image', this.selectedImageFile);

    this.clothingService.addClothingItem(formData).subscribe({
      next: (res: any) => {
        this.successMessage = 'Clothing uploaded successfully!';
        this.errorMessage = '';
        this.clothingName = '';
        this.clothingCategory = '';
        this.selectedImageFile = null;
        this.imageDataUrl = null;
      },
      error: (err) => {
        console.error('Upload failed:', err);
        this.errorMessage = 'Failed to upload clothing. Try again.';
        this.successMessage = '';
      }
    });
  }
}
