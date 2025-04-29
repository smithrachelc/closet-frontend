import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private base = `${environment.apiUrl}/clothing`;

  constructor(private http: HttpClient) {}

  /** Used by ClosetDashboardComponent */
  getMyClothing(category?: string): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    if (category) {
      return this.http.get<any[]>(`${this.base}/category/${category}`, { headers });
    }
    return this.http.get<any[]>(`${this.base}/all`, { headers });
  }

  /** Used by UploadClothingComponent */
  addClothingItem(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(
      `${this.base}/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
