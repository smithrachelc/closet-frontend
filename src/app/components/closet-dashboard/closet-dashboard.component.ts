import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../../services/clothing.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-closet-dashboard',
  templateUrl: './closet-dashboard.component.html',
  styleUrls: ['./closet-dashboard.component.css'],
  imports: [CommonModule, RouterModule]
})
export class ClosetDashboardComponent implements OnInit {
  clothingItems: any[] = [];
  errorMessage = '';

  constructor(private clothingService: ClothingService) {}

  ngOnInit(): void {
    this.loadClothingItems();
  }

  loadClothingItems(): void {
    this.clothingService.getClothingItems().subscribe({
      next: (items: any[]) => {
        this.clothingItems = items;
      },
      error: (err) => {
        console.error('Error loading clothing:', err);
        this.errorMessage = 'Failed to load clothing. Please refresh.';
      }
    });
  }
}
