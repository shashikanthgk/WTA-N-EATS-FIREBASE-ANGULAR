import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Observable } from "rxjs/internal/Observable";
import { firestore } from "firebase";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import {MatRipple} from "@angular/material"



@Component({
  selector: 'app-show-merchant',
  templateUrl: './show-merchant.component.html',
  styleUrls: ['./show-merchant.component.css']
})
export class ShowMerchantComponent implements OnInit, OnDestroy  {

  user: firebase.User;
  userdata: any;
  uid: any;
  flag:boolean  = false;
  subscription: Subscription;
  merchants: any = [];
  merchantsid:any = [];
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFirestore,
    private _storage: AngularFireStorage
  ) {}
  ngOnInit() {
    this.subscription =  this.auth.getUserState().subscribe(user => {
      this.user = user;
      if (this.user) {
       this.getShops()
       console.log(this.merchants)
       console.log(this.merchantsid)
       this.flag=true;
      }
    });

  }



  getShops() {
    let userDoc = this.db.firestore.collection(`Merchants`);
    userDoc.get().then((querySnapshot) => { 
       querySnapshot.forEach((doc) => {
            this.merchants.push(doc.data())
            this.merchantsid.push(doc.id)
       })
    })
  }

  productsmerchant(merchnatselected){
    console.log("selected ",merchnatselected)
    this.router.navigate(['/products',this.merchantsid[merchnatselected]])
  }

  ngOnDestroy() {
    if (this.user) this.subscription.unsubscribe();
  }

  getsearch(searchvalue) {
    // do the filtering hear
 }



}
