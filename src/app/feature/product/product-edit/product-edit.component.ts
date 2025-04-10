import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { Vendor } from '../../../model/vendor';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  title: string = "Product-Edit"
  productId!: number;
  product!: Product;
  subscription!: Subscription;
  vendors: Vendor[] = [];


constructor(
  private productSvc: ProductService,
  private router: Router,
  private actRoute: ActivatedRoute,
  private vendorSvc: VendorService
){}

ngOnInit(): void {
  // get the product id from the url
    this.actRoute.params.subscribe((parms)=>{
      this.productId = parms['id'];
      // get the product for the id
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next: (resp) => {
          this.product = resp;
        },
        error: (err) => {
          console.log('Error retrieving product: ', err);
        }
      });
    });
    this.subscription = this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading vendors.' + err.message
        );
      },
    });
  }
    save() {
      this.productSvc.update(this.product).subscribe({
        next: resp => {
          this.product = resp;
          this.router.navigateByUrl('product-list');
        },
        error: (err) => {
          console.log('error saving product', err);
        },
    });


  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compVendor(a: Vendor, b: Vendor): boolean {
    return a && b && a.id == b.id;
  }

}