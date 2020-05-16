import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ImageService {
  productid: any;
  constructor(private router: Router, private db: AngularFirestore) {}

  insertImageDetails(imageDetails: any, merchantid: string) {
    console.log(imageDetails, merchantid);
    this.db
      .collection(`Products/`)
      .add({
        name: imageDetails.productname,
        price: imageDetails.price,
        description: imageDetails.description,
        merchantid: merchantid,
        imageUrl: imageDetails.imageUrl
      })
      .then(res => {
        this.productid = res["id"];
        console.log("product added sucess fully", res["id"]);
      })
      .catch(err => {
        console.log("errores", err);
      });
  }
}
