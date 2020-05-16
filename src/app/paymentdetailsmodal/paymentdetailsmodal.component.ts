import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-paymentdetailsmodal',
  templateUrl: './paymentdetailsmodal.component.html',
  styleUrls: ['./paymentdetailsmodal.component.css']
})
export class PaymentdetailsmodalComponent implements OnInit {
  payment:any;
  constructor(public dialogRef: MatDialogRef<PaymentdetailsmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.payment = data['data']
      console.log("data",data)
    } 

  ngOnInit() {
  }


  save() {
    this.dialogRef.close(0);
}

close() {
    this.dialogRef.close(1);
}

}
