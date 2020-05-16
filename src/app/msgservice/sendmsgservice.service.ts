import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { BehaviorSubject } from "rxjs";
import {AuthService } from "../auth/auth.service";
import {MatSnackBar} from '@angular/material/snack-bar';

 @Injectable({
  providedIn: 'root'
})
export class SendmsgserviceService {

  constructor( private _snackBar: MatSnackBar,private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,private auth :AuthService) { }
  uid:any;
  fromdata:any;
  from:any;
user:any;

    getuser()
    {
      this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
          this.user = res.uid;
          console.log("olduser2", this.user);
          return this.user
        } else {
          this.user = null;
          return ;
        }
      });
    }






  openSnackBar(x,info) {
    this._snackBar.open(x,info , {
      duration: 2000,
    });
  }
    



    sendmessage(msg:any,from:any,to:any,type:any)
    {
      
      this.db.collection(`Messages/`).add({
        msg:msg,
        from:from,
        to:to,
        type:type
      }).then(res=>{
        
        this.openSnackBar("😀😀😀😀😀😀","Message sent")

      }).catch(err=>{
        this.openSnackBar("😥😥😥😥😥😥","Message not sent")
        console.log("errores", err);

      })
  }

    getmessage(to:any)
    {
      return this.db.collection(`Messages/`,ref =>
      ref.where('to', '==', `${to}`)).valueChanges({idField: 'id'});
    }

    getshopname(uid:any)
    {
      return this.db.collection(`Merchants`).doc(uid).ref.get()
    }
    getusername(uid:any)
    {
      return this.db.collection(`Users`).doc(uid).ref.get()
    }
    deletemessage(id)
    {
      this.db
      .doc(`Messages/${id}`)
      .get()
      .subscribe(function(doc) {
        doc.ref.delete().catch(err => {
          if(err){
            this.openSnackBar("😫😫😫😫😫😫","Message deleted")
          }
          else{
            this.openSnackBar("😨😨😨😨😨😨","Message can't be deleted")
          }
          console.log("document can not be deleted ");
        });
      });
    }

}
