import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private base = `https://closet-backend-pi.vercel.app/api//clothing`;

  constructor(private http: HttpClient) { }

  /** Used by ClosetDashboardComponent */
  getClothingItems(category?: string): Observable<any[]> {
    // if a category is passed, call /category/:category
    if (category) {
      return this.http.get<any[]>(`${this.base}/category/${category}`);
    }
    // otherwise list all
    return this.http.get<any[]>(`${this.base}/all`);
  }

  /** Used by UploadClothingComponent */
  addClothingItem(name: string, category: string, image: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post('/api/clothing/upload', {
      name,
      category,
      image
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  
  
  
}
