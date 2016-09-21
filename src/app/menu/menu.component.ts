import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userInfo: any = null;
  constructor(private authService: AuthService) { }
  ngOnInit() {
    this.authService.checkAuth().then(data => {
      this.userInfo = data;
      console.log(this.userInfo);
    });
  }

  login() {
    window.location.href = '/fms-api/v2/admin/auth/login';
  }

  logout() {
    window.location.href = '/fms-api/v2/admin/auth/logout';
  }
}
