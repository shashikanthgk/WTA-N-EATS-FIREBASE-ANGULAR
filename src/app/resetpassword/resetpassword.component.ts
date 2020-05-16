import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs/";
import { from } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
email:string;
emailerror:string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  resetpassword(){
    console.log(this.email)

this.auth.resetpassword(this.email).then(response=>{
  const res = JSON.stringify(response);
  console.log("shashikanth",res)
    this.emailerror = res

})
   
}
}
