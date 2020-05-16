import { Component, OnInit ,ViewChild, ElementRef,AfterViewChecked,Input,Inject} from '@angular/core';
import {ActivatedRoute} from "@angular/router" 
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SendmsgserviceService} from "../msgservice/sendmsgservice.service";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-generatemsgmodal',
  templateUrl: './generatemsgmodal.component.html',
  styleUrls: ['./generatemsgmodal.component.css']
})
export class GeneratemsgmodalComponent implements OnInit {
  form: FormGroup;
  msg:string;
  invalidmsg:boolean=false;
  from:any;
  to:any;


  constructor(    private _snackBar: MatSnackBar,
    public msgservice:SendmsgserviceService,public fb: FormBuilder,private routeractivated: ActivatedRoute,private router: Router, private db: AngularFirestore,public dialogRef: MatDialogRef<GeneratemsgmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      console.log("data",data)
      this.from = data['from']
      this.to = data['to']
     
 
    }


 ngOnInit() {

    this.form = this.fb.group({
      msg:["", [Validators.required]],
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  oninvalidmsg(name){
    // console.log(this.form.value['msg'],name)
    if(name.length<10)
    {
      
      this.invalidmsg = true
    }
    else{
      this.invalidmsg = false
    }
  }


  save() {
    if(!this.invalidmsg){
      console.log("hello thter")
      this.msgservice.sendmessage(this.form.value['msg'],this.from,this.to,"specific")
      this.close()
    }
  

  
    


 
}

    close() {
  this.dialogRef.close();
}
}



