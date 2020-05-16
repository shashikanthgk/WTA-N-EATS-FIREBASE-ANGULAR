import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
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
  createUser(frm) {
    this.auth.createUser(frm.value);
  }
}
