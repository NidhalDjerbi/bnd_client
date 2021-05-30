import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../helpers/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any
  constructor(private authService:AuthService, private cookieService: CookieService ,private router:Router) { }

  ngOnInit(): void {
    this.registerForm =  new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(4)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      password_confirmation: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),

    });
    console.log(this.password);
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get password_confirmation() { return this.registerForm.get('password_confirmation'); }
  
  register(){ 
    
    if(this.registerForm.valid){
      this.authService.register({
        name: this.name.value, 
        email:this.email.value,
        password:this.password.value,
        password_confirmation:this.password_confirmation.value
      }).subscribe(res => {
      this.cookieService.set('token',res.token)
      this.router.navigate(['/main'])
      },(err)=> {console.log(err);
      })  
    }
  }

}
