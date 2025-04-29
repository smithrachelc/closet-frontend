import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClothingService } from '../../services/clothing.service';
import { OutfitService } from '../../services/outfit.service';

@Component({
  standalone: true,
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PlannerComponent implements OnInit {
  clothingItems: any[] = [];
  selectedItems: any[] = [];
  outfitName: string = '';
  isPublic: boolean = false;

  constructor(
    private clothingService: ClothingService,
    private outfitService: OutfitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clothingService.getClothingItems().subscribe({
      next: (items: any[]) => this.clothingItems = items,

      error: err => console.error('Failed to load clothing:', err)
    });
  }

  toggleSelection(item: any) {
    if (this.selectedItems.includes(item)) {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    } else {
      this.selectedItems.push(item);
    }
  }

  saveOutfit() {
    const itemIds = this.selectedItems.map(i => i._id);
    this.outfitService.createOutfit(this.outfitName, itemIds, this.isPublic).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => console.error('Failed to save outfit:', err)
    });
  }
}
