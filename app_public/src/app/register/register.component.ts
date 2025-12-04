import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service'; // ⬅️ [ADDED] Import HistoryService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  public pageContent = {
    header: {
      title: 'Create a new account',
      strapline: ''
    },
    sidebar: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService // ⬅️ [ADDED] Inject HistoryService
  ) { }

  ngOnInit(): void {
  }

  public onRegisterSubmit(): void {
    this.formError = '';
    if (
      !this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {
    this.authenticationService.register(this.credentials)
      .then(() => {
        // 🔽🔽🔽 [MODIFIED] Redirect to previous URL instead of home 🔽🔽🔽
        this.router.navigateByUrl(this.historyService.getPreviousUrl());
        // 🔼🔼🔼 [MODIFIED] Redirect to previous URL instead of home 🔼🔼🔼
      })
      .catch((message) => this.formError = message);
  }

}