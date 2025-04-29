import { Component, OnInit } from '@angular/core';
import { OutfitService } from '../../services/outfit.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-outfits',
  templateUrl: './public-outfits.component.html',
  styleUrls: ['./public-outfits.component.css'],
  imports: [CommonModule, RouterModule]
})
export class PublicOutfitsComponent implements OnInit {
  outfits: any[] = [];

  constructor(private outfitService: OutfitService) {}

  ngOnInit(): void {
    this.loadPublicOutfits();
  }

  loadPublicOutfits() {
    this.outfitService.getPublicOutfits().subscribe({
      next: (outfits: any) => {
        this.outfits = outfits;
      },
      error: (err) => {
        console.error('Error fetching public outfits:', err);
      }
    });
  }
}
