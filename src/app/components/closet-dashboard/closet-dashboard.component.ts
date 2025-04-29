import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutfitService } from '../../services/outfit.service';
import { OutfitPlannerComponent } from '../outfit-planner/outfit-planner.component';


interface ClothingItem {
  _id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-closet-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, OutfitPlannerComponent],
  templateUrl: './closet-dashboard.component.html',
  styleUrls: ['./closet-dashboard.component.css']
})
export class ClosetDashboardComponent implements OnInit {
  token = 'your-auth-token'; // Replace with real token logic
  clothing: ClothingItem[] = [];
  selectedItems: ClothingItem[] = [];

  newOutfitName: string = '';
  makePublic: boolean = false;

  private outfitService = inject(OutfitService);

  ngOnInit() {
    this.loadClothing();
  }

  loadClothing() {
    // You should replace this with your real clothing-fetching service
    // Example format:
    this.clothing = [
      {
        _id: '1',
        name: 'Blue Shirt',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
      },
      {
        _id: '2',
        name: 'Sunglasses',
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
      }
    ];
  }

  addToOutfit(item: ClothingItem) {
    if (!this.selectedItems.find(i => i._id === item._id)) {
      this.selectedItems.push(item);
    }
  }

  removeFromOutfit(item: ClothingItem) {
    this.selectedItems = this.selectedItems.filter(i => i._id !== item._id);
  }

  saveOutfit() {
    const items = this.selectedItems.map(item => ({ name: item.name, imageUrl: item.imageUrl }));

    this.outfitService.createOutfit(this.newOutfitName, items, this.token).subscribe(() => {
      this.selectedItems = [];
      this.newOutfitName = '';
      this.makePublic = false;
    });
  }
}
