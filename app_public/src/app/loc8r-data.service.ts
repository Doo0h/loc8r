import { Injectable, Inject } from '@angular/core'; // ⬅️ [이미지 반영] Inject 추가
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage'; // ⬅️ [이미지 반영] BROWSER_STORAGE import 추가
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class Loc8rDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage // ⬅️ [이미지 반영] Storage 주입 (Listing 12.30)
  ) { }

  private apiBaseUrl = environment.apiBaseUrl;

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 200000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return firstValueFrom(this.http.get<Location[]>(url))
      .catch(this.handleError);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return firstValueFrom(this.http.get<Location>(url))
      .catch(this.handleError);
  }

  // 🔽🔽🔽 [이미지 반영] 헤더에 토큰 추가 (Listing 12.31) 🔽🔽🔽
  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    
    // Authorization 헤더에 Bearer 토큰 추가
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    };

    // httpOptions를 세 번째 인자로 전달
    return firstValueFrom(this.http.post<Review>(url, formData, httpOptions))
      .catch(this.handleError);
  }
  // 🔼🔼🔼 [이미지 반영] 헤더에 토큰 추가 🔼🔼🔼

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return firstValueFrom(this.http.post<AuthResponse>(url, user))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}