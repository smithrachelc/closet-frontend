import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planner',
  standalone: true,
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  savedOutfits: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOutfits();
  }

  fetchOutfits(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('https://closet-backend-pi.vercel.app/api/outfits/my', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        console.log('Fetched outfits:', data);
        this.savedOutfits = data;
      },
      error: (err) => {
        console.error('Failed to fetch outfits:', err);
      }
    });
  }

  makePublic(outfitId: string): void {
    const token = localStorage.getItem('token');
    this.http.patch('https://closet-backend-pi.vercel.app/api/outfits/toggle', {
      outfitId: outfitId,
      isPublic: true
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.fetchOutfits();
      },
      error: (err) => {
        console.error('Failed to make outfit public:', err);
      }
    });
  }
}
