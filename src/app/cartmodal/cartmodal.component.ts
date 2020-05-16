import { Component, OnInit,Input  } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cartmodal',
  templateUrl: './cartmodal.component.html',
  styleUrls: ['./cartmodal.component.css']
})
export class CartmodalComponent implements OnInit {

merchantid: string; 


cart_products:any=[];
flag:Boolean = false
total:any;
constructor(private routeractivated: ActivatedRoute,private router: Router,    private _snackBar: MatSnackBar
  ){
this.merchantid =  this.routeractivated.snapshot.paramMap.get('merchantid');

let x = localStorage.getItem(this.merchantid)
this.cart_products = JSON.parse(x);

if(this.cart_products){
this.total = this.cart_products.reduce((sum, item) => sum + (item.quantity)*(item.product.price), 0)
if(this.cart_products.length==0){
  this.flag = true
}
}
if(!this.cart_products)
{
  this.flag = true
 
}
console.log(this.cart_products)

}




  ngOnInit() {

  }

  cartincrement(index){
   
        this.cart_products[index]['quantity']=this.cart_products[index]['quantity']+1;
        localStorage.setItem(this.merchantid,JSON.stringify(this.cart_products))
        this.total = this.cart_products.reduce((sum, item) => sum + (item.quantity)*(item.product.price), 0)
    
    }
    cartdecrement(index){
      
          if(this.cart_products[index]['quantity']!=0){
          this.cart_products[index]['quantity']=this.cart_products[index]['quantity']-1;
          this.total = this.cart_products.reduce((sum, item) => sum + (item.quantity)*(item.product.price), 0)

        if(this.cart_products[index]['quantity']==0){
          this.openSnackBar(this.cart_products[index]['product']['name'])
          {this.cart_products.splice(index,1);
          console.log("item renp",this.cart_products)
          localStorage.setItem(this.merchantid,JSON.stringify(this.cart_products))
          this.total = this.cart_products.reduce((sum, item) => sum + (item.quantity)*(item.product.price), 0)
          console.log(this.total)
          }
        
    
     
        
      }
    }
    if(this.cart_products.length==0){
      this.flag = true
    }
    
  }
  callmerchant(){
    this.router.navigateByUrl('/showmerchants')

  }


  openSnackBar( itemname) {
    this._snackBar.open("Item rempved from the the cart",itemname , {
      duration: 2000,
    });
  }
  removeitem(index){
    this.openSnackBar(this.cart_products[index]['product']['name'])

    this.cart_products.splice(index,1);
    localStorage.setItem(this.merchantid,JSON.stringify(this.cart_products));
    this.total = this.cart_products.reduce((sum, item) => sum + (item.quantity)*(item.product.price), 0)

    if(this.cart_products.length==0){
      this.flag = true
    }
    
  }



  clearcart(){
    this.cart_products = []
    localStorage.clear();
    this.total = 0;
    if(this.cart_products.length==0){
      this.flag = true
    }
    this._snackBar.open("cart is cleared","success" , {
      duration: 2000,
    });
  }

checkout()
{
  this.router.navigate(['/checkout',this.merchantid])}

}
