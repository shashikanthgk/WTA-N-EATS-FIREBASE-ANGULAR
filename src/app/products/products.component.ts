import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router" 
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Observable } from "rxjs/internal/Observable";
import { firestore } from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  public merid:string = null;
  user: firebase.User;
  userdata: any;
  uid: any;
  ismerchant: boolean = null;
  subscription: Subscription;
  products: any = [];
  productsid: any = [];
  cartbutton:any=[]
  cart:any=[];
  itemquantity:any=[];
  x:any;
  progress:boolean = true;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  cartlength:any;
  productflag:boolean = false;
  constructor( private routeractivated: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private db: AngularFirestore,
    private _storage: AngularFireStorage,
    private _snackBar: MatSnackBar
    ) {
       
    }

  ngOnInit() {

   let id =  this.routeractivated.snapshot.paramMap.get('id');
   this.merid = id;
   this.auth.getUserState().subscribe(user => {
    this.user = user;
    this.uid = user.uid;
    if (this.user && this.merid) {
    this.showproducts();
    }
  });
  console.log(this.itemquantity)
  console.log(this.cartbutton)
  }


  getsearch(searchvalue) {
   // do the filtering hear
}


addtocart(index){

  
  let x = localStorage.getItem(this.merid)
  this.itemquantity[index] = this.itemquantity[index]+1
  this.cartbutton[index] = 1
  if(x!=null)
  {
    this.cart= []   
    let c = JSON.parse(x)
    let flag = true
    let selected_p_id = this.productsid[index]
    for(var i=0;i<c.length;i++)
    {
      if(selected_p_id==c[i]['productid'])
      {
      var qun  =c[i]['quantity']
      qun = parseInt(qun)
      qun = qun+1;
      c[i]['quantity'] = qun
      this.cart.push(c[i])
      this.cartbutton[index] = 1
      flag = false  
     }
      else{
        this.cart.push(c[i])
        this.cartbutton[index] =1

      }
    } 
    if(flag){
      var temp2 = {
        product:this.products[index],
        productid:this.productsid[index],
        quantity:1,
        userid:this.uid,

      }
      this.cart.push(temp2)
      this.cartbutton[index] = 1


    }
    localStorage.setItem(this.merid,JSON.stringify(this.cart))
    this.cartlength = this.cart.length

  }
  else{
    this.cart=[]
    var temp = {
      product:this.products[index],
      productid:this.productsid[index],
      quantity:1,
      userid:this.uid,
    }
    this.cart.push(temp)
    this.cartbutton[index] = 1

    localStorage.setItem(this.merid,JSON.stringify(this.cart))
    this.cartlength = this.cart.length

  }
}



openSnackBar( index) {
  this._snackBar.open("item added to the cart",this.products[index]['name'] , {
    duration: 2000,
  });
}


cartincrement(index){
for(var i=0;i<this.cart.length;i++)
{
  if(this.cart[i]['productid']==this.productsid[index])
  {
    this.cart[i]['quantity']=this.cart[i]['quantity']+1;
    this.itemquantity[index] = this.itemquantity[index]+1;
    localStorage.setItem(this.merid,JSON.stringify(this.cart))
    this.cartlength = this.cart.length

  }
}

}
cartdecrement(index){
  console.log('')
  for(var i=0;i<this.cart.length;i++)
  {
    if(this.cart[i]['productid']==this.productsid[index])
    {
      if(this.cart[i]['quantity']!=0){
      this.cart[i]['quantity']=this.cart[i]['quantity']-1;
      this.itemquantity[index] =this.itemquantity[index]-1;
    if(this.itemquantity[index]==0){
      this.cartbutton[index] = 0
      this.cart.splice(i,1);
      console.log("item renp",this.cart)
      localStorage.setItem(this.merid,JSON.stringify(this.cart))
      this.cartlength = this.cart.length
    }
      localStorage.setItem(this.merid,JSON.stringify(this.cart))
      this.cartlength = this.cart.length

      }
      else{
        
      }
    }
    
  }
}

clearcart(){
  this.cart = []
  this.cartbutton = []
  this.itemquantity =[]
  localStorage.clear();
  this._snackBar.open("cart is cleared","success" , {
    duration: 2000,
  });
}
buynow(index){

  let c = localStorage.getItem(this.merid);
  let x = JSON.parse(c)
  if(x!=null){
  for(var i=0;i<x.length;i++)
  {
    if(this.cart[i]['productid']==this.productsid[index])
    {
      this.router.navigate(['/cartpage',this.merid]);
      return;
    }
 
}
}
var temp = {
  product:this.products[index],
  productid:this.productsid[index],
  quantity:1,
  userid:this.uid,
}
this.cart.push(temp)
console.log("shashi",this.cart)
this.cartbutton[index] = 1
this.itemquantity[index] = 1
localStorage.setItem(this.merid,JSON.stringify(this.cart))
this.cartlength = this.cart.length;
this.router.navigate(['/cartpage',this.merid]);
// this.router.navigate(['/products',this.merchantsid[merchnatselected]])



  console.log(x)
  console.log(this.cartbutton)
  console.log(this.itemquantity)
}


  showproducts(){
    let counter = 0
    this.db
    .collection("Products", ref => ref.where("merchantid", "==", this.merid))
    .get()
    .subscribe(snapshot => {
      if (snapshot.empty) {
        this.productflag = true;
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach(doc => {
        this.products.push(doc.data());
        this.productsid.push(doc.id);
        this.cartbutton.push(0)
        this.itemquantity.push(0)
        counter = counter+1;
       
      });

      console.log("current okay",this.productsid.indexOf(this.productsid[1])
      )
    
      this.progress = false
      this.x = localStorage.getItem(this.merid);
      if(this.x!=null){
      let c = JSON.parse(this.x)
      console.log("current okay")
      console.log("curreitemquq",this.itemquantity)
      console.log("currentcartbutt",this.cartbutton)
      for(var j =0 ;j<c.length;j++){
        let index = this.productsid.indexOf(c[j]['productid'])
       this.cartbutton[index] = 1;
       this.itemquantity[index] = c[j]['quantity']
       this.cart.push(c[j])
      }
      this.cartlength = this.cart.length

      console.log("itemquq",this.itemquantity)
      console.log("cartbutt",this.cartbutton)
    }


    });
    this.progress = false

  }


  callmerchant(){
    this.router.navigateByUrl('/showmerchants')

  }
//if the merchant remove the product while ordering manage synchronisation
  ngOnDestroy(){
    console.log("this.is called")
    var tempproducts = []
    var temppid=[]
    this.db
    .collection("Products", ref => ref.where("merchantid", "==", this.merid))
    .get()
    .subscribe(snapshot => {
      if (snapshot.empty) {
        // this.productflag = true;
        console.log("No matching documents.",this.productflag);
        return;
      }

      snapshot.forEach(doc => {
        tempproducts.push(doc.data());
        temppid.push(doc.id);


       
      });
      console.log("temparoryid",temppid)
      for(var i=0;i<this.productsid.length;i++)
      {
        console.log(this.productsid,temppid)
        let ind = temppid.indexOf(this.productsid[i])
        if(ind==-1){
          //item is removed
          console.log("item removed")
          let j= this.cart.indexOf(this.productsid[i])
          this.cart.splice(j,1);
          localStorage.setItem(this.merid,JSON.stringify(this.cart))
          this.cartlength = this.cart.length
          // this.cartbutton.splice(j,1);
          // this.cartbutton.
        }
        else{
          //item is removed and inserted back no problem here
  
        }
     
      }
    })



  }

}
