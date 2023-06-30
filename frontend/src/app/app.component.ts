import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'devict';
  navCollapse = true;

  constructor(public authService: UserAuthService) {}

  ngOnInit(): void {

  }
}
