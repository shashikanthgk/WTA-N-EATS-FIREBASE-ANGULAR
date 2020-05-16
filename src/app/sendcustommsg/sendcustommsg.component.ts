import { Component, OnInit } from '@angular/core';
import {SendmsgserviceService} from "../msgservice/sendmsgservice.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {GeneratemsgmodalComponent} from "../generatemsgmodal/generatemsgmodal.component";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-sendcustommsg',
  templateUrl: './sendcustommsg.component.html',
  styleUrls: ['./sendcustommsg.component.css']
})
export class SendcustommsgComponent implements OnInit {

  constructor(    private afAuth: AngularFireAuth,
    public msgser:SendmsgserviceService, public dialog: MatDialog) { }
  from:any;
  ngOnInit() {
  
      this.afAuth.authState.subscribe(res => {
        if (res && res.uid) {
          this.from = res.uid;
          console.log("olduser2", this.from);
          
        } 
      });
    }
  

  sendmsg()
  {

    if(this.from){
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
     from:this.from,
     to:"someone right now"
  };
  dialogConfig.maxHeight = "50%";
  dialogConfig.maxWidth = "50%";
  dialogConfig.minHeight = "50%";
  dialogConfig.minWidth = "50%";

  const dialogRef= this.dialog.open(GeneratemsgmodalComponent, dialogConfig,);  
  //open payment details modal 
  dialogRef.afterClosed().subscribe(data=>{


  });

}
  }
}
