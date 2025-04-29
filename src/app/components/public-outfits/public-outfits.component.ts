
import { CommonModule } from '@angular/common';
import { OutfitService } from '../../services/outfit.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Component({
  standalone: true,
  selector: 'app-public-outfits',
  templateUrl: './public-outfits.component.html',
  styleUrls: ['./public-outfits.component.css'],
  imports: [CommonModule, RouterModule]
})
export class PublicOutfitsComponent implements OnInit {
  publicOutfits: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPublicOutfits();
  }

  fetchPublicOutfits(): void {
    this.http.get<any[]>('https://closet-backend-pi.vercel.app/api/outfits/public').subscribe({
      next: (data) => {
        this.publicOutfits = data;
      },
      error: (err) => {
        console.error('Failed to fetch public outfits:', err);
      }
    });
  }
}
