import { Component, OnInit,OnDestroy } from '@angular/core';
import {ActivatedRoute} from "@angular/router" 
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest, timer, from } from 'rxjs';
import { AuthService } from "../auth/auth.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {PaymentdetailsmodalComponent} from "../paymentdetailsmodal/paymentdetailsmodal.component";
import {AddressmodalComponent} from "../addressmodal/addressmodal.component";
import {AssigndelivaryboyComponent} from "../assigndelivaryboy/assigndelivaryboy.component";
import {SendmsgserviceService} from "../msgservice/sendmsgservice.service"
@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css'],
})
export class OrderdetailsComponent implements OnInit,OnDestroy {

  constructor(public msgservice:SendmsgserviceService,    private auth: AuthService,
    private routeractivated: ActivatedRoute,private router: Router, private db: AngularFirestore, public dialog: MatDialog,) { }
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
delivaryboys:any = [];
names:any=[];
isapproved:boolean=false;
  // products:any=[]
  ngOnInit() {
    this.auth.getUserState().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.uid = this.user["Sb"]["uid"];   
      }
    });

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
        this.isapproved = this.orderdetails['status']
        console.log("order details",this.orderdetails)
        this.address = this.orderdetails['address']
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
  getproducts({productid}){

    console.log("should be called later")


console.log("products",productid)

  

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

confirmorder()
{
  this.delivaryboys = []
  this.db
  .collection("Delivaryboys", ref => ref.where("merchantid", "==", this.uid))
  .get()
  .subscribe(snapshot => {
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    snapshot.forEach(doc => {
      var x = {
        name:doc.data()['name'],
        phone:doc.data()['phone'],
        id:doc.id
      }
    this.delivaryboys.push(x)
    this.names.push(doc.data()['name'])
    });
    console.log(this.delivaryboys)
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
     data:this.delivaryboys
  };
  const dialogRef= this.dialog.open(AssigndelivaryboyComponent, dialogConfig);  
    //open payment details modal 
    dialogRef.afterClosed().subscribe(data=>{
      console.log("data income",data)
      if(data!=0){
        this.db.doc(`Orders/${this.orderid}`).update({orderboyid:data['id'],status:"Approved"})
      .then(res=>{console.log("sucess",res)}).catch(err=>{console.log("error",err)});
      this.isapproved = true;
      this.db.doc(`Delivaryboys/${data['id']}`).get().subscribe(doc=>{
        console.log("delivary boy ",doc.data())
        let orders = doc.data()['orders'];
        orders.push(this.orderid)
        let status = doc.data()['status'];
        status.push("order assigned");
        console.log("orderid stastt",orders,status)
        this.db.doc(`Delivaryboys/${data['id']}`).update({orders:orders,status:status})
      .then(res=>{
        this.db.doc(`Orders/${this.orderid}`).get().subscribe(orderdetails=>{
        let message = `Your order with order id ${this.orderid} is confirmed by our merchant  successfully and Mr. ${doc.data()['name']} is bribging your order and use his phone number ${doc.data()['phone']} for further details. Thank you`
        this.msgservice.sendmessage(message,this.uid,orderdetails.data()['userid'],"specific")
        })
        console.log("sucess",res)})
        .catch(err=>{
        console.log("error",err)});
      })
    
    
    }

      
    })


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
  //open payment details modal  


}
adressdetail(i){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
   data:this.address
};
const dialogRef= this.dialog.open(AddressmodalComponent, dialogConfig); 

  // this.router.navigateByUrl('/merchantproducts')
}

ngOnDestroy()
{

}

}
