import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { Loc8rDataService } from './loc8r-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private loc8rDataService: Loc8rDataService
  ) { }

  public getToken(): string {
    return this.storage.getItem('loc8r-token') || ''; 
  }

  public saveToken(token: string): void {
    this.storage.setItem('loc8r-token', token);
  }

  public login(user: User): Promise<any> {
    return this.loc8rDataService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public register(user: User): Promise<any> {
    return this.loc8rDataService.register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('loc8r-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // 🔽🔽🔽 [이미지 반영] 현재 사용자 정보 가져오기 메서드 추가 🔽🔽🔽
  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      // 토큰의 payload(두 번째 부분)를 디코딩하여 email과 name을 추출
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return null!; // 로그인되지 않은 경우 null 반환 (TypeScript 컴파일을 위해 ! 사용)
  }
  // 🔼🔼🔼 [이미지 반영] 현재 사용자 정보 가져오기 메서드 추가 🔼🔼🔼
}