import { Component, OnInit, Input } from '@angular/core'; // ⬅️ [수정] Input을 import

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'] // ⬅️ styleUrls로 수정
})
export class PageHeaderComponent implements OnInit {

  // 🔽🔽🔽 [이미지 반영] @Input() content 속성 추가 🔽🔽🔽
  @Input() content: any; // ⬅️ 부모 컴포넌트로부터 데이터를 받기 위한 @Input() 데코레이터
  
  constructor() { }

  ngOnInit(): void {
  }
}