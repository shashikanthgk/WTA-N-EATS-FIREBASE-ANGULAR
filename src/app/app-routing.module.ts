import { ImageComponent } from "./images/image/image.component";
import { ImagesComponent } from "./images/images.component";
import { ShowproductstomerchantsComponent } from "./showproductstomerchants/showproductstomerchants.component";
import { AddproductsComponent } from "./addproducts/addproducts.component";
import { RegistrationmerchantComponent } from "./auth/registrationmerchant/registrationmerchant.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegistrationComponent } from "./auth/registration/registration.component";
import { HomeComponent } from "./home/home.component";
import {ShowMerchantComponent} from "./show-merchant/show-merchant.component"
import {ProductsComponent} from "./products/products.component"
import {CartmodalComponent} from "./cartmodal/cartmodal.component"
import {ResetpasswordComponent} from "./resetpassword/resetpassword.component"
import {PaypalcheckoutComponent} from "./paypalcheckout/paypalcheckout.component"
import {MerchantordersComponent} from "./merchantorders/merchantorders.component"
import {OrderdetailsComponent} from "./orderdetails/orderdetails.component"
import {CustomerordersComponent} from "./customerorders/customerorders.component"
import {CustomerorderdetailsComponent} from "./customerorderdetails/customerorderdetails.component"
import {GetdelivaryboysComponent} from "./getdelivaryboys/getdelivaryboys.component"
import { AdddelivaryboyComponent } from './adddelivaryboy/adddelivaryboy.component';
import {CustmailboxComponent} from "./custmailbox/custmailbox.component";
import {SendcustommsgComponent} from "./sendcustommsg/sendcustommsg.component";
import {MerchantmailboxComponent} from "./merchantmailbox/merchantmailbox.component"
const routes: Routes = [
  // { path: "", redirectTo: "image/upload", pathMatch: "full" },
  {
    path: "image",
    component: ImagesComponent,
    children: [{ path: "upload", component: ImageComponent }]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegistrationComponent
  },
  {
    path: "registermerchant",
    component: RegistrationmerchantComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "addproducts",
    component: AddproductsComponent
  },
  {
    path: "showmerchants",
    component: ShowMerchantComponent
  },
  {
    path: "mailbox",
    component: CustmailboxComponent
  },
  {
    path: "merchantmailbox",
    component: MerchantmailboxComponent
  },
  {
    path: "sendmsg",
    component: SendcustommsgComponent
  },
  {
    path: "Addproduct",
    component: ImagesComponent
  },
  {
    path: "merchantproducts",
    component: ShowproductstomerchantsComponent
  },
  {
    path: "cartpage/:merchantid",
    component: CartmodalComponent
  },
  {
    path: "ordersdetails/:orderid",
    component: OrderdetailsComponent
  },
  {
    path: "customerorderdetails/:orderid",
    component: CustomerorderdetailsComponent
  },
  {
    path: "customerorder/:userid",
    component: CustomerordersComponent
  },
  {
    path: "forgotpassword",
    component: ResetpasswordComponent
  },
  {
    path: "checkout/:merchantid",
    component: PaypalcheckoutComponent
  },
  {
    path: "orders",
    component:MerchantordersComponent 
  },
  {
    path: "products/:id",
    component: ProductsComponent
  },
  {
    path: "delivaryboys/:merid",
    component: GetdelivaryboysComponent
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

