import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginId: String;

  constructor(public loginService: AuthenticationService,private router:Router) {}

  ngOnInit(): void {
    this.loginId = this.loginService.getLoginId();
  }

  goToHome() {
    if(this.loginService.isAdmin()) {
      this.router.navigate(['insurance']);  
    }
    if(this.loginService.isUser()) {
      this.router.navigate(['userHome']);
    }
  }
}
