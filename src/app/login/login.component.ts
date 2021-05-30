import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../helpers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :any
  mode:any='login'
  constructor(private authService:AuthService, private cookieService: CookieService ,private router:Router) { }
  
  ngOnInit(): void {
    this.loginForm =  new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  
  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }
  
  login(){ 
    if(this.loginForm.valid){
      this.authService.login({email:this.email.value,password:this.password.value}).subscribe(res => {
      this.cookieService.set('token',res.token)
      this.router.navigate(['/main'])
      },(err)=> {console.log(err);
      })  
    }
  }
}