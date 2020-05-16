import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component";
import { RegistrationmerchantComponent } from "./auth/registrationmerchant/registrationmerchant.component";
import { AddproductsComponent } from "./addproducts/addproducts.component";
import { ShowproductstomerchantsComponent } from "./showproductstomerchants/showproductstomerchants.component";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { DropZoneDirective } from "./addproducts/drop-zone.directive";
import { ImagesComponent } from "./images/images.component";
import { ImageComponent } from "./images/image/image.component";
import { ShowMerchantComponent } from './show-merchant/show-merchant.component';
import { MatSliderModule } from '@angular/material/slider';
import { ProductsComponent } from './products/products.component';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CartmodalComponent } from './cartmodal/cartmodal.component';
import { MatDialogModule } from '@angular/material';
import {MercahntmodalComponent} from "./mercahntmodal/mercahntmodal.component"
import {MatBadgeModule} from '@angular/material/badge';
import { BadgeModule, IconsModule, WavesModule } from 'angular-bootstrap-md'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AlertmodalComponent } from './alertmodal/alertmodal.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { PaypalcheckoutComponent } from './paypalcheckout/paypalcheckout.component';
import { SuccessmodalComponent } from './successmodal/successmodal.component';
import { MerchantordersComponent } from './merchantorders/merchantorders.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { PaymentdetailsmodalComponent } from './paymentdetailsmodal/paymentdetailsmodal.component'; // <-- Import
import {MatDividerModule, MatListModule} from '@angular/material';
import { AddressmodalComponent } from './addressmodal/addressmodal.component';
import { CustomerordersComponent } from './customerorders/customerorders.component';
import { CustomerorderdetailsComponent } from './customerorderdetails/customerorderdetails.component';
import { AdddelivaryboyComponent } from './adddelivaryboy/adddelivaryboy.component';
import { GetdelivaryboysComponent } from './getdelivaryboys/getdelivaryboys.component';
import { AssigndelivaryboyComponent } from './assigndelivaryboy/assigndelivaryboy.component';
import {MatRadioModule} from '@angular/material/radio';
import { CustmailboxComponent } from './custmailbox/custmailbox.component';
import { MatCheckboxModule} from '@angular/material';
import { SendcustommsgComponent } from './sendcustommsg/sendcustommsg.component';
import { GeneratemsgmodalComponent } from './generatemsgmodal/generatemsgmodal.component';
import { MerchantmailboxComponent } from './merchantmailbox/merchantmailbox.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    RegistrationmerchantComponent,
    AddproductsComponent,
    ShowproductstomerchantsComponent,
    DropZoneDirective,
    ImagesComponent,
    ImageComponent,
    ShowMerchantComponent,
    ProductsComponent,
    NavbarComponent,
    CartmodalComponent,
    MercahntmodalComponent,
    AlertmodalComponent,
    ResetpasswordComponent,
    PaypalcheckoutComponent,
    SuccessmodalComponent,
    MerchantordersComponent,
    OrderdetailsComponent,
    PaymentdetailsmodalComponent,
    AddressmodalComponent,
    CustomerordersComponent,
    CustomerorderdetailsComponent,
    AdddelivaryboyComponent,
    GetdelivaryboysComponent,
    AssigndelivaryboyComponent,
    CustmailboxComponent,
    SendcustommsgComponent,
    GeneratemsgmodalComponent,
    MerchantmailboxComponent,
  

  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,

    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    BadgeModule,
    IconsModule,
    WavesModule,
    MDBBootstrapModule,
    FilterPipeModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule

  ],
  entryComponents: [
    MercahntmodalComponent,
    AlertmodalComponent,
    SuccessmodalComponent,
    PaymentdetailsmodalComponent,
    AddressmodalComponent,
    AdddelivaryboyComponent,
    AssigndelivaryboyComponent,
    GeneratemsgmodalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
