import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {
  outfits: any[] = [];

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
        this.outfits = data;
      },
      error: (err) => {
        console.error('Failed to fetch outfits:', err);
      }
    });
  }

  makePublic(index: number): void {
    const outfitId = this.outfits[index]._id;
    const token = localStorage.getItem('token');
    this.http.patch('https://closet-backend-pi.vercel.app/api/outfits/toggle', {
      outfitId,
      isPublic: true
    }, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => this.fetchOutfits());
  }

  deleteOutfit(index: number): void {
    const outfitId = this.outfits[index]._id;
    const token = localStorage.getItem('token');
    this.http.delete(`https://closet-backend-pi.vercel.app/api/outfits/delete/${outfitId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => this.fetchOutfits());
  }
}
