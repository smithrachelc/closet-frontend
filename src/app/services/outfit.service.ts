import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OutfitService {
  private base = `${environment.apiUrl}/outfit`;

  constructor(private http: HttpClient) {}

  getPublicOutfits() {
    return this.http.get(`${this.base}/public`);
  }

  getMyOutfits(token: string) {
    return this.http.get(`${this.base}/mine`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  createOutfit(name: string, items: any[], token: string) {
    return this.http.post(`${this.base}/create`, { name, items }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  toggleOutfitVisibility(outfitId: string, isPublic: boolean, token: string) {
    return this.http.patch(`${this.base}/toggle/${outfitId}`, { isPublic }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
