import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;
  olduserid: any;
  data: any;
  ismerchant: any;
  emailerror:string;
  

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  //get corrently logged in user
  getUserState() {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.olduserid = res.uid;
        console.log("olduser", this.olduserid);
      } else {
        this.olduserid = null;
      }
    });
    return this.afAuth.authState;
  }

  // get the user data
  getUserData(userid) {
    var docRef = this.db.collection("Users").doc(userid);

    return docRef.get();
  }

  // get the merchant data
  getMerchantData(userid) {
    var docRef = this.db.collection("Merchants").doc(userid);

    return docRef.get();
  }

  //user/merchants login

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(["/home"]);
        }
      });
  }

  //user signin

  createUser(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({
          displayName: user.firstName + " " + user.lastName
        });

        this.insertUserData(userCredential).then(() => {
          this.router.navigate(["/home"]);
        });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  //insert userdata into user collection

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: "Appuser"
    });
  }

  // merchant sign in
  createMerchant(user) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({
          displayName: user.firstName + " " + user.lastName
        });

        this.insertMerchantData(userCredential).then(() => {
          this.router.navigate(["/home"]);
        });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  //login merchants

  // insert merchant into merchants collections

  insertMerchantData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Merchants/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: "Merchant",
      shopname: this.newUser.shopname,
      shopdisplayname: this.newUser.shopdisplayname
    });
  }


resetpassword(email)
{
  
  return this.afAuth.auth.sendPasswordResetEmail(
    email).then(eror=>{
      console.log("email activation link sent")
      this.emailerror = '<strong>email activation link sen</strong>';

      return eror;
    }).catch(err=>{
      console.log(err['code'])  
      switch (err['code']) {
        case 'auth/network-request-failed':
          this.emailerror = '<strong>Please check your internet connection</strong>';
            break;
        case 'auth/too-many-requests':
          this.emailerror = '<strong>We have detected too many requests from your device. Take a break please!</strong>';
            break;
        case 'auth/user-disabled':
          this.emailerror ='<strong>Your account has been disabled or deleted. Please contact the system administrator.</strong>'
          break;
        case 'auth/requires-recent-login':
          this.emailerror ='<strong>Please login again and try again!</strong>'
          break;
        case 'auth/user-not-found':
          this.emailerror ='<strong>We could not find user account associated with the email address</strong>'
          console.log(this.emailerror)
          break;
        case 'auth/invalid-email':
          this.emailerror ='<strong>The email address is not a valid email address!</strong>'
          break;
    
        default:
          this.emailerror ='<strong>Oops! Something went wrong. Try again later.</strong>'
          break;
    
    
  }
  return this.emailerror   

})
    
}

  //logout current user

  logout() {
    return this.afAuth.auth.signOut();
  }
  getdb() {
    return this.db;
  }
}
