import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css'
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  title: string = "Vendor-Detail";
  vendorId!: number;
  vendor!: Vendor;
  subscription!: Subscription;
   loggedInUser!: User; 
      isAdmin: boolean = false;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    // get the vendor id from the url
    this.actRoute.params.subscribe((parms)=>{
      this.vendorId = parms['id'];
      // get the vendor for the id
      this.subscription = this.vendorSvc.getById(this.vendorId).subscribe({
        next: (resp) => {
          this.vendor = resp;
        },
        error: (err) => {
          console.log('Error retrieving vendor: ', err);
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.vendorSvc.delete(this.vendorId).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/vendor-list');
      },
      error: err => {
        console.log(err);
      }
  });
  }
}