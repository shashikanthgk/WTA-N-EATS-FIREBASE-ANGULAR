import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-addressmodal',
  templateUrl: './addressmodal.component.html',
  styleUrls: ['./addressmodal.component.css']
})
export class AddressmodalComponent implements OnInit {
address:any;
  constructor( private dialogRef: MatDialogRef<AddressmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.address = data.data;
  
}

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();

}

}
