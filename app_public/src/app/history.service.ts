import { Injectable } from '@angular/core';
// 🔽🔽🔽 [이미지 12.20 반영] Router 관련 모듈 import 🔽🔽🔽
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
// 🔼🔼🔼 [이미지 12.20 반영] Router 관련 모듈 import 🔼🔼🔼

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // 🔽🔽🔽 [이미지 12.20 반영] URL 히스토리 저장 배열 🔽🔽🔽
  private urls: string[] = [];
  // 🔼🔼🔼 [이미지 12.20 반영] URL 히스토리 저장 배열 🔼🔼🔼

  // 🔽🔽🔽 [이미지 12.20 반영] 생성자에서 라우터 이벤트 구독 🔽🔽🔽
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((routerEvent): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd))
      .subscribe((routerEvent: NavigationEnd) => {
        const url = routerEvent.urlAfterRedirects;
        this.urls = [...this.urls, url];
      });
  }
  // 🔼🔼🔼 [이미지 12.20 반영] 생성자에서 라우터 이벤트 구독 🔼🔼🔼

  // 🔽🔽🔽 [이미지 12.21 반영] 이전 URL 반환 메서드 🔽🔽🔽
  public getPreviousUrl(): string {
    const length = this.urls.length;
    return length > 1 ? this.urls[length - 2] : '/';
  }
  // 🔼🔼🔼 [이미지 12.21 반영] 이전 URL 반환 메서드 🔼🔼🔼
}