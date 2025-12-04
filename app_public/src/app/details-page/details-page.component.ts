import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';   // ⬅️ [ADDED] For route parameter
import { Loc8rDataService } from '../loc8r-data.service';     // ⬅️ [ADDED] Import data service
import { Location } from'../location';
import { switchMap } from 'rxjs/operators';                   // ⬅️ [ADDED] For Observable chaining

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  // ✅ ActivatedRoute와 Loc8rDataService를 생성자에서 주입
  constructor(
    private loc8rDataService: Loc8rDataService,
    private route: ActivatedRoute
  ) { }

  // ✅ Location 타입의 프로퍼티 선언 (strict 모드 대응)
  public newLocation!: Location;

  // ✅ 페이지 내용 정의
  public pageContent = {
    header: {
      title: '',
      strapline: ''
    },
    sidebar: ''
  };

  // ✅ ngOnInit에서 route의 paramMap Observable 구독
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('locationId');
          return this.loc8rDataService.getLocationById(id!);
        })
      )
      .subscribe((newLocation: Location) => {
        this.newLocation = newLocation;
        this.pageContent.header.title = newLocation.name!;
        this.pageContent.sidebar = `${newLocation.name} is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.\n\nIf you've been and you like it - or if you don't - please leave a review to help other people just like you. \n\n 2021810009 김두영`;
      });
  }
}
