// src/app/rating-stars/rating-stars.component.ts (확인/수정)
import { Component, OnInit, Input } from '@angular/core'; 

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent implements OnInit {
  // 🔽🔽🔽 [확인] @Input()과 기본값 초기화가 필수 🔽🔽🔽
  @Input() rating: number = 0; 
  
  constructor() { }
  ngOnInit(): void { }
}