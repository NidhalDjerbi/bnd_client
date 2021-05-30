import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { 
    
  }

  getProduct():Observable<any>{
    return this.http.get(environment.url+'/produit')
  }

  addProduct(body:any):Observable<any>{
    return this.http.post(environment.url+'/produit',body)
  }

  updateProduct(body:any):Observable<any>{
    console.log(body);
    
    return this.http.put(environment.url+'/produit/'+body.productID,body)
  }

  deleteProduct(id:any):Observable<any>{
    return this.http.delete(environment.url+'/produit/'+id)
  }
}
