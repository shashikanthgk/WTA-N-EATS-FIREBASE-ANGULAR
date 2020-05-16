import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from "@angular/router"
@Component({
  selector: 'app-successmodal',
  templateUrl: './successmodal.component.html',
  styleUrls: ['./successmodal.component.css']
})
export class SuccessmodalComponent implements OnInit {

  orderid:any;
  constructor(public router:Router,
    private dialogRef: MatDialogRef<SuccessmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.orderid = data.orderid;
    console.log(this.orderid)
}
  ngOnInit() {
  }
  close() {
    this.dialogRef.close();

}

}
