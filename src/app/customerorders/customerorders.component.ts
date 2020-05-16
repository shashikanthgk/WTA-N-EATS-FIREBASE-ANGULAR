import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";


@Component({
  selector: 'app-customerorders',
  templateUrl: './customerorders.component.html',
  styleUrls: ['./customerorders.component.css']
})
export class CustomerordersComponent implements OnInit {

  constructor( private routeractivated: ActivatedRoute,public router:Router,private db: AngularFirestore,
    ) { }
 userid:any;
 ordersid:any=[];
  ngOnInit() {

    this.userid=  this.routeractivated.snapshot.paramMap.get('userid');
    this.db
    .collection("Orders", ref => ref.where("userid", "==", this.userid))
    .get()
    .subscribe(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach(doc => {
        this.ordersid.push(doc.id)

      });
      console.log(this.ordersid)
    }
    )
  }

  applyFilter(filtervalue){

  }
gotodetails(i)
{
  this.router.navigate(['/customerorderdetails',this.ordersid[i]])

}

}
