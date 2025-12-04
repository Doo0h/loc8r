import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // 🔽🔽🔽 [이미지 반영] pageContent 객체에 header와 sidebar 내용 추가 🔽🔽🔽
  public pageContent = {
    header: {
      // 사용자의 학번/이름 정보와 Loc8r 제목을 합쳤습니다.
      title: '2021810009 김두영 Loc8r', 
      strapline: 'Find places to work with wifi near you!'
    },
    // 이미지에 나온 sidebar 텍스트를 그대로 반영합니다.
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.'
  };
  // 🔼🔼🔼 [이미지 반영] pageContent 객체에 header와 sidebar 내용 추가 🔽🔽🔽
}