import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { DetailsPageComponent } from '../details-page/details-page.component';
import { RegisterComponent } from '../register/register.component';
// 🔽🔽🔽 [추가] LoginComponent 임포트 🔽🔽🔽
import { LoginComponent } from '../login/login.component';
// 🔼🔼🔼 [추가] LoginComponent 임포트 🔼🔼🔼

// 라우트(경로) 정의
const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'location/:locationId',
    component: DetailsPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // 🔽🔽🔽 [추가] 로그인(login) 경로 추가 🔽🔽🔽
  {
    path: 'login',
    component: LoginComponent
  }
  // 🔼🔼🔼 [추가] 로그인(login) 경로 추가 🔼🔼🔼
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }