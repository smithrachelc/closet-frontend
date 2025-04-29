import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clothingItems: any[] = [];
  filteredItems: any[] = [];
  selectedCategory = '';
  selectedOutfit: any[] = [];
  outfitName = '';
  categories = ['Tops', 'Bottoms', 'Dresses', 'Jackets', 'Shoes', 'Accessories'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchClothing();
  }

  fetchClothing(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('https://closet-backend-pi.vercel.app/api/clothing/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.clothingItems = data;
        this.filterItems();
      },
      error: (err) => console.error('Failed to load clothing items:', err)
    });
  }

  navigateTo(category: string): void {
    this.selectedCategory = category;
    this.filterItems();
  }

  filterItems(): void {
    this.filteredItems = this.selectedCategory
      ? this.clothingItems.filter(item => item.category === this.selectedCategory)
      : this.clothingItems;
  }

  addToOutfit(item: any): void {
    if (!this.selectedOutfit.find(i => i._id === item._id)) {
      this.selectedOutfit.push(item);
    }
  }

  saveOutfit(): void {
    if (!this.outfitName.trim() || this.selectedOutfit.length === 0) return;
  
    const token = localStorage.getItem('token');
    this.http.post('https://closet-backend-pi.vercel.app/api/outfits/save', {
      name: this.outfitName,
      clothingItems: this.selectedOutfit
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.outfitName = '';
        this.selectedOutfit = [];
        alert('Outfit saved!');
      },
      error: (err) => {
        console.error('Failed to save outfit:', err);
        alert('Failed to save outfit');
      }
    });
  }
  
  

  cancelOutfit(): void {
    this.outfitName = '';
    this.selectedOutfit = [];
  }
}
