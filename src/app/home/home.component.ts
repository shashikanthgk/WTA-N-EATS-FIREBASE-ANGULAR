import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { OnDestroy } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: firebase.User;
  userdata: any;
  uid: any;
  ismechant: any = {};
  subscription: any;
  filtersLoaded: Promise<boolean>;

  constructor(private auth: AuthService, private router: Router,private db: AngularFirestore) {}

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

            console.log(data.data());
            if (this.userdata) {
              console.log("insuide");
              this.ismechant = true;

              // console.log(this.userdata);
            } else {
              this.auth.getUserData(this.uid).subscribe(data => {
                this.userdata = data.data();
                console.log(this.userdata);

                this.ismechant = false;
              });
            }
          });
      }
      console.log(this.userdata);
    });
    this.checkupdates();
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
  somefunc() {
    console.log("somelog" + this.ismechant);
  }
  login() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.auth.logout();
  }

  register() {
    this.router.navigate(["/register"]);
  }
  registermerchant() {
    this.router.navigate(["/registermerchant"]);
  }
  adddelivaryboys(){
    this.router.navigate(['/delivaryboys',this.uid])
  }

  checkupdates()
  {
    let x = this.db.collection('/Delivaryboys').valueChanges().subscribe((userData) => {
      // put your logic here
      console.log(userData);
  });

  

}
}
