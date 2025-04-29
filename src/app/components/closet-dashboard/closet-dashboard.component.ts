import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutfitService } from '../../services/outfit.service';
import { ClothingService } from '../../services/clothing.service';
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
  token = 'your-auth-token'; // Replace with real logic
  clothing: ClothingItem[] = [];
  selectedItems: ClothingItem[] = [];

  newOutfitName: string = '';
  makePublic: boolean = false;

  constructor(
    private outfitService: OutfitService,
    private clothingService: ClothingService
  ) {}

  ngOnInit() {
    this.loadClothing();
  }

  loadClothing() {
    this.clothingService.getMyClothing(this.token).subscribe((items: ClothingItem[]) => {
      this.clothing = items;
    });
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
    const items = this.selectedItems.map(item => ({
      name: item.name,
      imageUrl: item.imageUrl
    }));

    this.outfitService.createOutfit(this.newOutfitName, items, this.token).subscribe(() => {
      this.selectedItems = [];
      this.newOutfitName = '';
      this.makePublic = false;
    });
  }
}
