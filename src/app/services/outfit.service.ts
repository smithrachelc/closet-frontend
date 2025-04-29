import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class OutfitService {
  private baseUrl = 'https://closet-backend-pi.vercel.app/outfit';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createOutfit(name: string, clothingItems: any[], isPublic: boolean) {
    const token = this.authService.getToken();
    return this.http.post(`${this.baseUrl}/create`, { name, items: clothingItems, isPublic }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  toggleOutfitVisibility(outfitId: string, isPublic: boolean) {
    const token = this.authService.getToken();
    return this.http.patch(`${this.baseUrl}/toggle`, { outfitId, isPublic }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getPublicOutfits() {
    return this.http.get(`${this.baseUrl}/public`);
  }

  deletePublicOutfit(outfitId: string) {
    const token = this.authService.getToken();
    return this.http.delete(`${this.baseUrl}/delete/${outfitId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
