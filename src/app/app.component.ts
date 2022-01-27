import { Component } from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant-website';
  auth: AuthService;
  constructor(public authService: AuthService) {
    this.auth = authService;
  }

}
