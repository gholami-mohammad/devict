import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'devict';

  constructor(public authService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.whoami().subscribe({
      next: res => {
        this.authService.authenticatedUser = res;
      },
      error: err => {
        this.router.navigate(['login']);
      },
    });
  }
}
