import { Component, OnInit } from '@angular/core';
import { ProductService } from '../helpers/services/product.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  constructor(private productService:ProductService, private cookieService: CookieService, private router: Router) { }
  allProduct:any
  updateForm:any
  mode: any
  ngOnInit(): void {
    this.getProduct()
    this.updateForm = this.initForm() 
  }
  getProduct(){
    this.productService.getProduct().subscribe(res => {
      this.allProduct = res
    },(err)=> {console.log(err);
    })  
  }
  get name() { return this.updateForm.get('name'); }
  get quantity() { return this.updateForm.get('quantity'); }
  get brand() { return this.updateForm.get('brand'); }
  get price() { return this.updateForm.get('price'); }
  get model() { return this.updateForm.get('model'); }
  get category_id() { return this.updateForm.get('category_id'); }
  get productID() { return this.updateForm.get('productID'); }
  get product_code_id() { return this.updateForm.get('product_code_id'); }
  update(product:any){
    this.mode = 'update'
    this.updateForm = this.initForm(product)
  }
  initForm(product?:any){
    return new FormGroup({
      name: new FormControl(product && product.name? product.name : '', [
        Validators.required,
      ]),
      quantity: new FormControl(product && product.quantity? product.quantity : '', [
        Validators.required,
      ]),
      brand: new FormControl(product && product.brand? product.brand : '', [
        Validators.required,
      ]),
      price: new FormControl(product && product.price? product.price : '', [
        Validators.required,
      ]),
      model: new FormControl(product && product.model? product.model : '', [
        Validators.required,
      ]),
      category_id: new FormControl(product && product.category_id? product.category_id : '', [
        Validators.required,
      ]),
      productID: new FormControl(product && product.productID? product.productID : '', [
        Validators.required,
      ]),
      product_code_id: new FormControl(product && product.product_code_id? product.product_code_id : '', [
        Validators.required,
      ]),
      
    });
  }
  updateProduct(){
    if(this.updateForm.valid){
      this.productService.updateProduct({name:this.name.value,
        quantity:this.quantity.value,
        brand:this.brand.value,
        price:this.price.value,
        model:this.model.value,
        category_id:this.category_id.value,
        productID:this.productID.value,
        product_code_id:this.product_code_id.value,
      }).subscribe(res => {
      this.router.navigate(['/main'])
      },(err)=> {console.log(err);
      })  
    }
  }
  delete(product:any){
    this.productService.deleteProduct(product.id).subscribe(res => {
      this.router.navigate(['/main'])
      },(err)=> {console.log(err);
      })  
    }
}
