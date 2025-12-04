import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
// 🔽🔽🔽 [이미지 반영] HistoryService import 🔽🔽🔽
import { HistoryService } from '../history.service';
// 🔼🔼🔼 [이미지 반영] HistoryService import 🔼🔼🔼

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  // 🔽🔽🔽 [이미지 반영] HistoryService 주입 🔽🔽🔽
  constructor(
    private authenticationService: AuthenticationService,
    private historyService: HistoryService // ⬅️ private으로 주입하여 컴포넌트 내에서 사용 가능
  ) { }
  // 🔼🔼🔼 [이미지 반영] HistoryService 주입 🔼🔼🔼

  ngOnInit(): void {
  }

  public doLogout(): void {
    this.authenticationService.logout();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.name : 'Guest';
  }

}