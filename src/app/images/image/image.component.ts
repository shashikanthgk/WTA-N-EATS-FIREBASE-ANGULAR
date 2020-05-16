import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { ImageService } from "src/app/shared/image.service";
import { AuthService } from "/home/shashikanth/projects/Firebaseauth/firebaseauth/src/app/auth/auth.service";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styles: ["./image.component.css"]
})
export class ImageComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  user: firebase.User;
  userdata: any;
  uid: string;
  ismerchant: boolean = null;
  subscription: Subscription;

  formTemplate = new FormGroup({
    productname: new FormControl("", Validators.required),
    description: new FormControl(""),
    price: new FormControl("", Validators.required),
    imageUrl: new FormControl("", Validators.required)
  });

  constructor(
    private auth: AuthService,
    private storage: AngularFireStorage,
    private service: ImageService
  ) {}

  ngOnInit() {
    this.loadScript("assets/js/main.js");
    this.resetForm();
    this.auth.getUserState().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.uid = this.user["Sb"]["uid"];

        this.subscription = this.auth
          .getMerchantData(this.uid)
          .subscribe(data => {
            this.userdata = data.data();
            if (this.userdata) {
              this.ismerchant = true;
              console.log("  nside");
            }
          });
        console.log(this.ismerchant);
      }
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


  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = "firebaseauth/src/assets/img/image_placeholder.jpg";
      this.selectedImage = null;
    }
  }

  onSubmit(formValue) {
    if (this.ismerchant) {
      this.isSubmitted = true;
      if (this.formTemplate.valid) {
        var filePath = `${this.uid}/${this.selectedImage.name
          .split(".")
          .slice(0, -1)
          .join(".")}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage
          .upload(filePath, this.selectedImage)
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                formValue["imageUrl"] = url;
                console.log(url);
                console.log("merchantid ", this.uid);
                this.service.insertImageDetails(formValue, this.uid);
                this.resetForm();
              });
            })
          )
          .subscribe();
      }
    } else {
      console.log(this.ismerchant);
    }
  }

  get formControls() {
    return this.formTemplate["controls"];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      productname: "",
      imageUrl: "",
      description: "",
      price: ""
    });
    this.imgSrc = "/assets/img/image_placeholder.jpg";
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
