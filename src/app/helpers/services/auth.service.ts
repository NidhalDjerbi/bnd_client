import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { 
    
  }

  login(body:any):Observable<any>{
    return this.http.post(environment.url+'/login',body)
  }
  register(body:any):Observable<any>{
    return this.http.post(environment.url+'/register',body)
  }
  
}
