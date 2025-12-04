import { Component, OnInit, Input } from '@angular/core'; // ⬅️ [수정] OnInit과 Input을 import

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // ⬅️ styleUrls로 수정
})
export class SidebarComponent implements OnInit { // ⬅️ [수정] implements OnInit 추가

  // 🔽🔽🔽 [이미지 반영] @Input() content 속성 추가 🔽🔽🔽
  @Input() content!: string; // ⬅️ 부모 컴포넌트로부터 문자열 데이터를 받기 위한 @Input()
  
  constructor() { }

  ngOnInit(): void { // ⬅️ ngOnInit 메서드 추가
  }
}