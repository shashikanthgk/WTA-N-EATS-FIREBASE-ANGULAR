import { Component, OnInit ,SimpleChanges,OnChanges} from '@angular/core';
import {AuthService} from "../auth/auth.service"
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { AngularFirestore } from "@angular/fire/firestore";
import { FilterPipe } from 'ngx-filter-pipe';
import {ActivatedRoute} from "@angular/router" 
import { AngularFireStorage } from "@angular/fire/storage";
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-merchantorders',
  templateUrl: './merchantorders.component.html',
  styleUrls: ['./merchantorders.component.css']
})
export class MerchantordersComponent implements OnInit {

  user: firebase.User;
  userdata: any;
  uid: any;
  ismerchant: boolean = null;
  subscription: Subscription;
  orders:any=[]
  orderflag:boolean=false
  constructor( private auth: AuthService,
    private router: Router,
    private db: AngularFirestore,private filterPipe: FilterPipe,private routeractivated: ActivatedRoute,
   ) { }

  ngOnInit() {
    this.auth.getUserState().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.uid = this.user["Sb"]["uid"];
        this.subscription = this.auth
          .getMerchantData(this.uid)
          .subscribe(data => {
            this.userdata = data.data();
            if (this.userdata) {
              this.showorders();
              this.ismerchant = true;
              this.db = this.auth.getdb();
            }
          });
      }
    });
 
  }
temp:any=[]

 showorders(){

  this.db
  .collection("Orders", ref => ref.where("merchantid", "==", this.uid))
  .get()
  .subscribe(snapshot => {
    if (snapshot.empty) {
      this.orderflag = false;
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach(docorder => {
      console.log(docorder.data())
      let x = docorder.data()['userid']
      this.db.collection('Users').doc(docorder.data()['userid']).ref.get().then(doc=>{
        if (doc.exists) {
          var x = {

            ordersid:docorder.id,
            firstname:doc.data()['firstname'],
            lastname:doc.data()['lastname']
          }
          this.orders.push(x)
          console.log(doc.data());
          console.log(this.orders)
        } else {
          console.log("There is no document!");
        } 
      });
  });
  this.orderflag = true
  })
 }


 inValid = /^\s$/;

 copy = this.orders

 applyFilter(filterValue){
  if(this.orders==null){this.orders=this.copy}
  if(/\S/.test(filterValue)){
    let x = (this.filterPipe.transform(this.orders, { firstname: filterValue}));
    let y = (this.filterPipe.transform(this.orders, { lastname: filterValue}));
    let z = (this.filterPipe.transform(this.orders, { ordersid: filterValue}));

    if(x.length!=0)
    {this.orders = null
    this.orders = x}
    else if(y.length!=0)
    {this.orders = null
    this.orders = y}
    else if(z.length!=0)
    {this.orders = null
    this.orders = z}

    else{
      this.orders=null
    }


  }
  else if(filterValue==null){
    this.orders = this.copy;
  }
  else{
    this.orders = this.copy;

  }
  
 }

gotodetails(i)
{
  this.router.navigate(['/ordersdetails',this.orders[i]['ordersid']])

}










ngOnChanges(changes: SimpleChanges)
{
  console.log(changes)
}

}
