import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/internal/Subscription";
import { Observable } from "rxjs/internal/Observable";
import { firestore } from "firebase";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { stringify } from "querystring";
import * as firebase from "firebase/app";
declare var jQuery: any;

@Component({
  selector: "app-addproducts",
  templateUrl: "./addproducts.component.html",
  styleUrls: ["./addproducts.component.css"]
})
export class AddproductsComponent implements OnInit, OnDestroy {
  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;
  imageurl: any;
  // Download URL
  uploadProgress: any;
  productid: string;
  isHovering: boolean;

  user: firebase.User;
  userdata: any;
  uid: string;
  ismerchant: boolean = null;
  subscription: Subscription;
  filtersLoaded: Promise<boolean>;
  errors: string = null;
  formerrors: { [key: number]: string } = { 1: null, 2: null, 3: null };
  downloadURL: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFirestore,
    private storage: AngularFireStorage
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
            this.filtersLoaded = Promise.resolve(true);
            if (this.userdata) {
              this.ismerchant = true;
              this.db = this.auth.getdb();
            }
          });
      }
    });
  }

  addproducts(formdata) {
    if (formdata.value["name"] == "") {
      this.formerrors[1] = "name can not be blank";
      console.log("inside name");
    }

    if (formdata.value["price"] == "") {
      this.formerrors[2] = "price can not be blank";
    }
    if (formdata.value["description"] == "") {
      this.formerrors[3] = "description can not be blank";
    }
    if (
      this.userdata &&
      this.ismerchant &&
      this.formerrors[1] == null &&
      this.formerrors[2] == null &&
      this.formerrors[3] == null
    ) {
      console.log(this.formerrors);
      console.log(formdata.value);
      this.db
        .collection(`Products/`)
        .add({
          name: formdata.value.name,
          price: formdata.value.price,
          description: formdata.value.description,
          merchantid: this.uid
        })
        .then(res => {
          this.productid = res["id"];
          console.log("product added sucess fully", res["id"]);
        })
        .catch(err => {
          this.errors = err;
          console.log("errores", err);
        });
    }
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  addImage(result) {
    return;
  }

  ngOnDestroy() {
    console.log("shashi");
    this.subscription.unsubscribe();
  }
}
