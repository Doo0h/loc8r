import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  // 🔽🔽🔽 [이미지 반영] getPosition 메서드 추가 🔽🔽🔽
  public getPosition(cbSuccess: any, cbError: any, cbNoGeo: any): void {
    if (navigator.geolocation) {
      // 브라우저가 geolocation을 지원하면 현재 위치를 가져옵니다.
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      // geolocation을 지원하지 않으면 콜백 함수를 호출합니다.
      cbNoGeo();
    }
  }
  // 🔼🔼🔼 [이미지 반영] getPosition 메서드 추가 🔽🔽🔽
}