import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent implements OnInit, OnDestroy{
  title: string = 'Vendor-List';
  vendors! : Vendor[];
  subscription! : Subscription;
  loggedInUser!: User; 
    isAdmin: boolean = false;

constructor(
  private vendorSvc: VendorService,
  private sysSvc: SystemService
){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.subscription = this.vendorSvc.list().subscribe((resp) => {
      this.vendors = resp;}
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete(id: number) {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next: () => {
        // refresh the movie list
        this.subscription = this.vendorSvc.list().subscribe((resp) => {
          this.vendors = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting vendor for id: '+id);
        alert('Error deleting vendor for id: '+id);
      }
    });
  }
}
