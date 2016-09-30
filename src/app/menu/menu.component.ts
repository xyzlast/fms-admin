import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userInfo: any = null;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.authService.checkAuth().then(data => {
      this.userInfo = data;
      // console.log(this.userInfo);
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/mongo') {

        }
        // console.log(event);
      }
    });
  }

  login() {
    window.location.href = '/fms-api/v2/auth/login';
  }

  logout() {
    window.location.href = '/fms-api/v2/admin/auth/logout';
  }
}
