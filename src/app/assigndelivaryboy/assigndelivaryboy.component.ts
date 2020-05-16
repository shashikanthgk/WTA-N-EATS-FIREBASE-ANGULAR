import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-assigndelivaryboy',
  templateUrl: './assigndelivaryboy.component.html',
  styleUrls: ['./assigndelivaryboy.component.css']
})
export class AssigndelivaryboyComponent implements OnInit {
  selected: any;
  
  dboysname: any;
  
  constructor(public dialogRef: MatDialogRef<AssigndelivaryboyComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      console.log("data",data)
      this.dboysname = data['data']
 
    }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close(0);
  }

  save() {
    console.log(this.selected)
    this.dialogRef.close(this.selected);
}

close() {
    this.dialogRef.close(0);
}
}
