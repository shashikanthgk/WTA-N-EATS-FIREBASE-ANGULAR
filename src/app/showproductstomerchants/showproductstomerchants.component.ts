import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Observable } from "rxjs/internal/Observable";
import { AngularFirestore } from "@angular/fire/firestore";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {MercahntmodalComponent} from "../mercahntmodal/mercahntmodal.component"
import {AlertmodalComponent} from "../alertmodal/alertmodal.component"
import { AngularFireStorage } from "@angular/fire/storage";
@Component({
  selector: "app-showproductstomerchants",
  templateUrl: "./showproductstomerchants.component.html",
  styleUrls: ["./showproductstomerchants.component.css"]
})
export class ShowproductstomerchantsComponent implements OnInit, OnDestroy {
  user: firebase.User;
  userdata: any;
  uid: any;
  ismerchant: boolean = null;
  subscription: Subscription;
  products: any = [];
  productsid: any = [];
  animal: string="shashikanth";
  name: string = "shashikanth";
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFirestore,
    private _storage: AngularFireStorage,
    public dialog: MatDialog,
    
  ) {}
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
              this.showproducts();
              this.ismerchant = true;
              this.db = this.auth.getdb();
            }
          });
      }
    });
 
  }

  showproducts() {
    console.log("sjah");
    this.db
      .collection("Products", ref => ref.where("merchantid", "==", this.uid))
      .get()
      .subscribe(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        snapshot.forEach(doc => {
          this.products.push(doc.data());
          this.productsid.push(doc.id);
        });
        console.log("product id", this.productsid);
      });
  }
  Delete(index) {
    console.log(index);
    console.log(this.products[index].imageUrl);
    this._storage.storage
      .refFromURL(this.products[index].imageUrl)
      .delete()
      .catch(err => {
        console.log("product can not be deleted ", err);
      });
    this.db
      .doc(`Products/${this.productsid[index]}`)
      .get()
      .subscribe(function(doc) {
        doc.ref.delete().catch(err => {
          console.log("document can not be deleted ");
        });
      });
    this.products.splice(index, 1);
    this.productsid.splice(index, 1);

    console.log(this.products);
  }


  openDialog(i) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    console.log(this.products[i])
    dialogConfig.data = {
      name: this.products[i]['name'],
      description: this.products[i]['description'],
      price:this.products[i]['price']
  };

  const dialogRef= this.dialog.open(MercahntmodalComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
    data => {console.log("Dialog output:", data)
    this.products[i]['name'] = data['name'];
    this.products[i]['description']=data['description'];
    this.products[i]['price'] = data['price'];
    this.db.doc(`Products/${this.productsid[i]}`).update({description:data['description'],name: data['name'],price:data['price']})
    .then(res=>{console.log("sucess",res)}).catch(err=>{console.log("error",err)});
  });   
    

}



openAlertwindow(index) {

  const alertdialogConfig = new MatDialogConfig();

  alertdialogConfig.disableClose = true;
  alertdialogConfig.autoFocus = true;
  alertdialogConfig.data = {
    name: this.products[index]['name'],
    message1:"Item with name ",
    message2:" will be deleted permanently"
};
const alertdialogRef = this.dialog.open(AlertmodalComponent, alertdialogConfig);

alertdialogRef.afterClosed().subscribe(
  data => {console.log("Dialog output:", data)
if(data==1){
  console.log(index);
  console.log(this.products[index].imageUrl);
  this._storage.storage
    .refFromURL(this.products[index].imageUrl)
    .delete()
    .catch(err => {
      console.log("product can not be deleted ", err);
    });
  this.db
    .doc(`Products/${this.productsid[index]}`)
    .get()
    .subscribe(function(doc) {
      doc.ref.delete().catch(err => {
        console.log("document can not be deleted ");
      });
    });
  this.products.splice(index, 1);
  this.productsid.splice(index, 1);

  console.log(this.products);
}

}
); 


}


  ngOnDestroy() {
    if (this.user) this.subscription.unsubscribe();
  }
}
