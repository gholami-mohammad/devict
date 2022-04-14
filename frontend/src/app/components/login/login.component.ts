import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credencials: LoginCredentials = new LoginCredentials();
  errors: any = {};

  constructor(private authService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.credencials).subscribe({
      next: res => {
        this.authService.authToken = res.token;
        this.authService.authenticatedUser = res.user;
        this.router.navigate(['/']);
      },
      error: err => {
        if (err.errors) {
          this.errors = err.error;
        }
      },
    });
  }

}
