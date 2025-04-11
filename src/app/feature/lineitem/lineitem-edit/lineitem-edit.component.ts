import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lineitem } from '../../../model/lineitem';
import { Product } from '../../../model/product';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-lineitem-edit',
  standalone: false,
  templateUrl: './lineitem-edit.component.html',
  styleUrl: './lineitem-edit.component.css'
})
export class LineitemEditComponent implements OnInit, OnDestroy {
  title: string = "Lineitem-Edit"
  lineitemId!: number;
  lineitem!: Lineitem;
  subscription!: Subscription;
  products: Product[] = [];


constructor(
  private lineitemSvc: LineitemService,
  private router: Router,
  private actRoute: ActivatedRoute,
  private productSvc: ProductService
){}

ngOnInit(): void {
  // get the lineitem id from the url
    this.actRoute.params.subscribe((parms)=>{
      this.lineitemId = parms['id'];
      // get the lineitem for the id
      this.subscription = this.lineitemSvc.getById(this.lineitemId).subscribe({
        next: (resp) => {
          this.lineitem = resp;
        },
        error: (err) => {
          console.log('Error retrieving lineitem: ', err);
        }
      });
    });
    this.subscription = this.productSvc.list().subscribe({
      next: (resp) => {
        this.products = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading products.' + err.message
        );
      },
    });
  }
    save() {
      this.lineitemSvc.update(this.lineitem).subscribe({
        next: resp => {
          this.lineitem = resp;
          this.router.navigateByUrl('request-lines');
        },
        error: (err) => {
          console.log('error saving lineitem', err);
        },
    });


  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id == b.id;
  }

}