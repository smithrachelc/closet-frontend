import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClothingService } from '../../services/clothing.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  clothingItems: any[] = [];

  constructor(private clothingService: ClothingService, private router: Router) {}

  ngOnInit(): void {
    this.clothingService.getMyClothing().subscribe({
      next: (items: any[]) => this.clothingItems = items,
      error: err => console.error('Failed to load clothing:', err)
    });
  }

  goToUpload() {
    this.router.navigate(['/upload']);
  }

  goToPlanner() {
    this.router.navigate(['/planner']);
  }
}
