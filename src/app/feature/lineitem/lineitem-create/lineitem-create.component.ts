import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lineitem } from '../../../model/lineitem';
import { Product } from '../../../model/product';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-lineitem-create',
  standalone: false,
  templateUrl: './lineitem-create.component.html',
  styleUrl: './lineitem-create.component.css'
})
export class LineitemCreateComponent implements OnInit, OnDestroy {
  title: string = "LineItem-Create";
  newLineitem: Lineitem = new Lineitem();
  subscription!: Subscription;
  products: Product[] = [];
  
  constructor(private lineItemSvc: LineitemService,
              private productSvc: ProductService,
              private router: Router
  ){}
  
    ngOnInit(): void {
     this.subscription = this.productSvc.list().subscribe({
        next: (resp) => {
          this.products = resp;
        }, 
        error: (err) => {
          console.error(
            'LineItem Create Error: error loading products.' + err.message
          );
        },
      });
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
  
    }

    addLineitem(): void {
      this.subscription = this.lineItemSvc.add(this.newLineitem).subscribe((resp) => {
        this.router.navigateByUrl('request-lines');
      } );
    }
}
