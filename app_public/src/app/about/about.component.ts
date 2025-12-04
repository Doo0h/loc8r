import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // 🔽🔽🔽 [이미지 반영] pageContent 속성 추가 🔽🔽🔽
  public pageContent = {
    header: {
      title: 'About Loc8r 2021810009 kimdooyoung',
      strapline: ''
    },
    content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
  // 🔼🔼🔼 [이미지 반영] pageContent 속성 추가 🔽🔽🔽
}