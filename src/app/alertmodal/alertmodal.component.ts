import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-alertmodal',
  templateUrl: './alertmodal.component.html',
  styleUrls: ['./alertmodal.component.css']
})
export class AlertmodalComponent implements OnInit {
name:any;
message1:any;
message2:any;
  constructor(
    private dialogRef: MatDialogRef<AlertmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.message1 = data.message1;
    this.message2=data.message2;
    this.name = data.name;
    console.log(this.name)
}

  ngOnInit() {
  }
  save() {
    this.dialogRef.close(1);
}

close() {
    this.dialogRef.close(0);
}
}
