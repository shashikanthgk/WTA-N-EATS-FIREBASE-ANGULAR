import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import {Router, ɵangular_packages_router_router_a} from "@angular/router"
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  authError: any;

  constructor(private auth: AuthService,public router:Router) {}

  ngOnInit() {
    this.loadScript("assets/js/main.js");
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
  }
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }
  resetpassword(){
    this.router.navigateByUrl('/forgotpassword');
    
  }
}
