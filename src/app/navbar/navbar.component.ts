import { Component, OnInit,EventEmitter,SimpleChanges, Output ,Input,OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService} from "../auth/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() valueChange = new EventEmitter();
  @Input() data;
  @Input() merchantid;
  count:any;
  userid:any;
  constructor(private router: Router,public auth:AuthService, private afAuth: AngularFireAuth,
    ) { }
  ngOnInit() {
    this.count = this.data
    console.log("count",this.count)
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.userid = res.uid;
        console.log("olduser", this.userid);
      } else {
        this.router.navigateByUrl('/login')
      }
    });
  }
  valueChanged(serchvalue:string) { // You can give any function name
    this.valueChange.emit(serchvalue);
}
ngOnChanges(changes: SimpleChanges) {
  if(changes['data']!=null){ this.count = changes['data']['currentValue']
  console.log(changes)}
 
}
gotocartpage(){
 console.log("shashi rourter")
 this.router.navigate(['/cartpage',this.userid])
}

gotoshowmerchant(){
  if(this.userid){ this.router.navigateByUrl('/showmerchants')}
  else{
    this.router.navigateByUrl('/login')

  }
 
}
gotouserorderspage()
{
  if(this.userid!=null){
    this.router.navigate(['/customerorder',this.userid]);
  }
  else{
    this.router.navigateByUrl('/login')
  }
}
}
