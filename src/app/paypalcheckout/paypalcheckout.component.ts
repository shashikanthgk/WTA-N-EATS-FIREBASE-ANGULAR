import { Component, OnInit ,ViewChild, ElementRef,AfterViewChecked,Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router" 
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import { SuccessmodalComponent } from '../successmodal/successmodal.component';

declare let paypal: any;

@Component({
  selector: 'app-paypalcheckout',
  templateUrl: './paypalcheckout.component.html',
  styleUrls: ['./paypalcheckout.component.css']
})
export class PaypalcheckoutComponent implements OnInit {
  addScript: boolean = false;
  paypalLoad: boolean = true;
  total:any;
  finalAmount: number = 1;
  userid:any;
  products:any;
  paymentid:any;
  orderid:any;
  address:string;
  texterror:string;
  merchantid:string;
  quantity:any = [];
  constructor(private routeractivated: ActivatedRoute,private router: Router, private db: AngularFirestore,    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.merchantid =  this.routeractivated.snapshot.paramMap.get('merchantid');
    let x = localStorage.getItem(this.merchantid)
    let m = JSON.parse(x);
    this.userid =m[0]['userid']
    console.log("cart",this.userid)
    this.total = m.reduce((sum, item) => sum + (item.quantity)*(item.product.price), 0)
    this.products = m.map(x=>x.productid)
    this.quantity = m.map(x=>x.quantity)
    console.log("quantity",this.quantity)
  }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AV8LZn7IZBfpFnf1vq1oCzAuXRX96wCCExEcst3RrQQNKhTIHjSoZuy93NFFrJKoF2qWojl2nWG5Zshc',
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.total, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
      
        console.log(payment)
        this.createpayment(payment);
      })
    }
  };
  confirmadress() {
    if(this.address && this.address.length>10){  
       if (!this.addScript ) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
    else{
      console.log(this.address)

      this.texterror = `<strong>The adress length should be atleast  10 characters long</strong>`

    }
 
  }
  
  addPaypalScript() {

    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  createpayment(payment){
    console.log(this.address)
    this.db.collection(`Payments/`).add({
      userid:this.userid,
      paypalid:payment['id'],
      createtime:payment['create_time'],
      status:payment['state'],
      transactions:payment['transactions'][0]['amount']['total'],
      merchantid:this.merchantid
    }).then(res=>{
      this.paymentid = res['id']
      console.log("payment added sucess fully", res["id"]);
      this.createorder();


    }).catch(err=>{
      console.log("errores", err);

    })
  }

createorder(){
  this.db
  .collection(`Orders/`)
  .add({
    userid: this.userid,
    products:this.products,
    quantity:this.quantity,
    total: this.total,
    address:this.address,
    paymentid:this.paymentid,
    merchantid:this.merchantid,
    status:"Not approved",
    orderboyid:"not yet assigned"
  })
  .then(res => {
    this.orderid = res["id"];
    console.log("orders added sucess  yoye order id", res["id"]);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
     orderid:this.orderid
  };
  const dialogRef= this.dialog.open(SuccessmodalComponent, dialogConfig);
  localStorage.clear();
  })
  .catch(err => {
    console.log("errores", err);
  });

  this.router.navigateByUrl('/showmerchants')
  
}

}
