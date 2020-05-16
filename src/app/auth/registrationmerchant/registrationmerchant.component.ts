import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-registrationmerchant",
  templateUrl: "./registrationmerchant.component.html",
  styleUrls: ["./registrationmerchant.component.css"]
})
export class RegistrationmerchantComponent implements OnInit {
  authError: any;

  constructor(private auth: AuthService) {}
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
  createMerchant(frm) {
    this.auth.createMerchant(frm.value);
  }
}
