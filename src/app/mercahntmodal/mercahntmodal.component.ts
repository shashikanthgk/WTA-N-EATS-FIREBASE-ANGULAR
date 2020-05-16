
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MercahntDialogData } from "../showproductstomerchants/MerchantDialogData.interface"
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-mercahntmodal',
  templateUrl: './mercahntmodal.component.html',
  styleUrls: ['./mercahntmodal.component.css']
})
export class MercahntmodalComponent implements OnInit {
  form: FormGroup;
    description:string;
    product_data:any;
    selectedImage: any = null;
    imgSrc: string;

  constructor( public fb: FormBuilder,
    public dialogRef: MatDialogRef<MercahntmodalComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.product_data = data
      console.log("data",data)

    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit() {
    this.form = this.fb.group({
      description: [this.product_data['description'], [Validators.required]],
      name:[this.product_data['name'], [Validators.required]],
      price:[this.product_data['price'], [Validators.required]]
    });

  }


  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}
}
