import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('https://closet-backend-pi.vercel.app/api/clothing/my', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Failed to load clothing:', err)
    });
  }
}
