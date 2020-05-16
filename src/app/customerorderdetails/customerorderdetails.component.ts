import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router" 
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest, timer, from } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {PaymentdetailsmodalComponent} from "../paymentdetailsmodal/paymentdetailsmodal.component";


@Component({
  selector: 'app-customerorderdetails',
  templateUrl: './customerorderdetails.component.html',
  styleUrls: ['./customerorderdetails.component.css']
})
export class CustomerorderdetailsComponent implements OnInit {

  constructor(public dialog: MatDialog,private routeractivated: ActivatedRoute,private router: Router, private db: AngularFirestore) { }
orderid:any;
paymentid:any;
orderdetails:any;
orderflag:boolean = false;
products:any=[];
productdetailflag:boolean=false;
selectedproduct:any;
address:any;
user:any;
uid:any;
payment:any;
  ngOnInit() {
    this.orderid =  this.routeractivated.snapshot.paramMap.get('orderid');
    // console.log(this.orderid)
    this.getorderdetails();
  }


  async getorderdetails()
  {

    await this.db.collection('Orders').doc(this.orderid).ref.get().then(doc=>{
      if (doc.exists) {
        let counter = 0 ;
        this.orderdetails=doc.data()
        console.log("order details",this.orderdetails)
        this.getpaymentdetails(this.orderdetails['paymentid']);
        const col = this.db.collection('Products');
        const queries = this.orderdetails['products'].map(el => col.doc(el).valueChanges());
        combineLatest(...queries)
              .subscribe(data=>{
                console.log(data)
       for (var i=0;i<data.length;i++)
       {
        var m = {
          name:data[i]['name'],
          imageUrl:data[i]['imageUrl'],
          price:data[i]['price'],
          quantity:this.orderdetails['quantity'][i],
          productid:this.orderdetails['products'][i]
        }
        this.products.push(m)
        // console.log(m)
        //  console.log("products",data[i])
        //  console.log("id",this.orderdetails['products'][i])
        //  console.log("quqn",this.orderdetails['quantity'][i])
       }
console.log(this.products)

      })

       
        
      } else {
        console.log("There is no document!");
      } 

    
    });
  }



  getpaymentdetails(paymentid)
  {
    this.db.collection('Payments').doc(paymentid).ref.get().then(doc=>{
      if (doc.exists) {
  
        this.db.collection('Users').doc(doc.data()['userid']).ref.get().then(docuser=>{
          console.log("userd ata",docuser.data())
          var x = {
            time:doc.data()['createtime'],
            paymentid:doc.data()['paypalid'],
            status:doc.data()['status'],
            amount:doc.data()['transactions'],
            useremail:docuser.data()['email'],
            username:docuser.data()['firstname'],
            lastname:docuser.data()['lastname']
  
          }
          this.payment = x
          console.log("payment",this.payment);
  
        });
  
   
      } else {
        console.log("There is no document!");
      } 
    });
  }


  paymentdetails(i)
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
   data:this.payment
};
const dialogRef= this.dialog.open(PaymentdetailsmodalComponent, dialogConfig);  


}

checkstatus()
{
//check the status of order from this.orderdetails and goto another module and check delivary boy assigned or not
}



deleteorder(){
//delete the order from the databasse
}
}
