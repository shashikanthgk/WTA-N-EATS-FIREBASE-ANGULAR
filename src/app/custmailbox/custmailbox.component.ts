import { Component, OnInit } from '@angular/core';
import {SendmsgserviceService}  from "../msgservice/sendmsgservice.service";
import { AngularFireAuth } from "@angular/fire/auth";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {GeneratemsgmodalComponent} from "../generatemsgmodal/generatemsgmodal.component";
import {AlertmodalComponent} from "../alertmodal/alertmodal.component"
@Component({
  selector: 'app-custmailbox',
  templateUrl: './custmailbox.component.html',
  styleUrls: ['./custmailbox.component.css']
})
export class CustmailboxComponent implements OnInit {
flag:boolean = true;
messages:any=[];
  constructor( public dialog: MatDialog,public msgser:SendmsgserviceService,private afAuth: AngularFireAuth,) { 
      this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.userid = res.uid;
        console.log("olduser2", this.userid);
        this.msgser.getmessage(this.userid).subscribe(data=>{
          console.log(data)
          this.messages = []
          data.forEach(message=>{
            this.msgser.getshopname(message['from']).then(doc=>{
              if(doc.exists)
              {
                var x = {
                  message:message['msg']+`You can email us on email id ${doc.data()['email']}`,
                  from:doc.data()['shopname'],
                  fromuid:doc.id,
                  msgid:message['id']
                }
                console.log(doc.data())
                this.messages.push(x)
              }
              else
              {

              }
            })
          })
          console.log("messgae",this.messages) 
         this.flag = false;
        })
        
      } 
    });
  }
userid:any;
 ngOnInit() {
//  console.log("shashikanth")
  }



  sendmsg(i)
  {
    if(this.userid){
      var dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
       from:this.userid,
       to:this.messages[i]['fromuid']
    };
    dialogConfig.maxHeight = "50%";
    dialogConfig.maxWidth = "50%";
    dialogConfig.minHeight = "50%";
    dialogConfig.minWidth = "50%";
  
    const dialogRef= this.dialog.open(GeneratemsgmodalComponent, dialogConfig,);  
    dialogRef.afterClosed().subscribe(data=>{
  
    });
  
  }
  }

  deletemsg(index)
  {

  const alertdialogConfig = new MatDialogConfig();

  alertdialogConfig.disableClose = true;
  alertdialogConfig.autoFocus = true;
  alertdialogConfig.data = {
    name: this.messages[index]['from'],
    message1:"Message from ",
    message2:" will be deleted permanently"
};
const alertdialogRef = this.dialog.open(AlertmodalComponent, alertdialogConfig);

alertdialogRef.afterClosed().subscribe(
  data => {console.log("Dialog output:", data)


  if(data==1)
  {
    this.msgser.deletemessage(this.messages[index]['msgid']);

  }
  }
);

  }
}
