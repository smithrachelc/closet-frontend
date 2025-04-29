import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OutfitService } from '../../services/outfit.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, RouterModule]
})
export class AdminComponent implements OnInit {
  publicOutfits: any[] = [];

  constructor(private outfitService: OutfitService) {}

  ngOnInit(): void {
    this.loadPublicOutfits();
  }

  loadPublicOutfits() {
    this.outfitService.getPublicOutfits().subscribe({
      next: (outfits: any[]) => this.publicOutfits = outfits,
,
      error: err => console.error('Error loading public outfits:', err)
    });
  }

  deleteOutfit(id: string) {
    this.outfitService.deletePublicOutfit(id).subscribe({
      next: () => this.loadPublicOutfits(),
      error: err => console.error('Failed to delete outfit:', err)
    });
  }
}
