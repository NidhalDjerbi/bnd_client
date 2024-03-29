import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private CookieService:CookieService, private router:Router) { }
  
  ngOnInit(): void {
  }
  logout(){
    this.CookieService.set('token','')
    this.router.navigate(['/auth'])
  }

}
