import { Component, OnInit } from '@angular/core';
import { Loc8rDataService } from '../loc8r-data.service';
import { GeolocationService } from '../geolocation.service';
import { Location } from'../location';

// Location 클래스 정의 (API 응답 데이터 구조)
// export class Location {
//   _id!: string;
//   name!: string;
//   distance!: number;
//   address!: string;
//   rating!: number;
//   facilities!: string[];
//   reviews!: any[];
//   coords!: number[];
//   openingTimes!: any[];
// }

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {
  
  public locations: Location[] = []; 
  public message: string = ''; 

  constructor(
    private loc8rDataService: Loc8rDataService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit(): void {
    this.getPosition();
  }

  // 1. Geolocation 성공 콜백: 위치 좌표를 추출하고 API 서비스에 전달
  private getLocations(position: any): void {
    this.message = 'Searching for nearby places';
    
    // Geolocation 응답에서 위도와 경도를 추출
    const lat: number = position.coords.latitude; 
    const lng: number = position.coords.longitude; 

    // 추출한 lat과 lng를 Loc8rDataService의 getLocations()에 인수로 전달
    this.loc8rDataService
      .getLocations(lat, lng) 
      .then(foundLocations => {
        this.message = foundLocations.length > 0 ? '' : 'No locations found';
        this.locations = foundLocations;
      });
  }

  // 2. 현재 위치 가져오기 프로세스를 시작하는 함수
  private getPosition(): void {
    this.message = 'Getting your location...';
    // 콜백 함수에 .bind(this)를 사용하여 컨텍스트를 유지
    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }
  
  // 3. Geolocation 실패 시 메시지 표시
  private showError(error: any): void {
    this.message = error.message;
  }

  // 4. Geolocation 미지원 시 메시지 표시
  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser.';
  }
}