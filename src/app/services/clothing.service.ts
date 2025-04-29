import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ClothingService {
  private baseUrl = 'https://closet-backend-pi.vercel.app/clothing';

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadClothing(name: string, category: string, imageBase64: any) {
    const token = this.authService.getToken();
    return this.http.post(`${this.baseUrl}/upload`, { name, category, image: imageBase64 }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getMyClothing() {
    const token = this.authService.getToken();
    return this.http.get(`${this.baseUrl}/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
