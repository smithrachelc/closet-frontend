import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OutfitService } from '../../services/outfit.service';

interface ClothingItem {
  _id: string;
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-outfit-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './outfit-planner.component.html',
  styleUrls: ['./outfit-planner.component.css']
})
export class OutfitPlannerComponent {
  @Input() selectedItems: ClothingItem[] = [];
  @Input() token: string = '';

  outfitName: string = '';
  makePublic: boolean = false;

  constructor(private outfitService: OutfitService) {}

  removeItem(item: ClothingItem) {
    this.selectedItems = this.selectedItems.filter(i => i._id !== item._id);
  }

  saveOutfit() {
    const items = this.selectedItems.map(item => ({
      name: item.name,
      imageUrl: item.imageUrl
    }));

    this.outfitService.createOutfit(this.outfitName, items, this.token).subscribe(() => {
      this.selectedItems.length = 0; // clear selection
      this.outfitName = '';
      this.makePublic = false;
    });
  }
}
