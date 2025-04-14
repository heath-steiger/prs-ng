import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lineitem } from '../../../model/lineitem';
import { Product } from '../../../model/product';
import { Request } from '../../../model/request';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-lineitem-create',
  standalone: false,
  templateUrl: './lineitem-create.component.html',
  styleUrl: './lineitem-create.component.css'
})
export class LineitemCreateComponent implements OnInit, OnDestroy {
  title: string = "Line-Item-Create";
  newLineitem: Lineitem = new Lineitem();
  subscription!: Subscription;
  products: Product[] = [];
  request!: Request;
  requestId!: number;
  
  constructor(private lineItemSvc: LineitemService,
              private productSvc: ProductService,
              private requestSvc: RequestService,
              private actRoute: ActivatedRoute,
              private router: Router
  ){}
  
    ngOnInit(): void {
      this.actRoute.params.subscribe((parms)=>{
        this.requestId = parms['requestId'];
        // get the request for the id
        console.log('Route param id:', parms['id']);
        this.subscription = this.requestSvc.getById(this.requestId).subscribe({
          next: (resp) => {
            this.request = resp;
            this.newLineitem.request = this.request;
          },
          error: (err) => {
            console.log('Error retrieving request: ', err);
          }
        });
      });
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
        this.router.navigateByUrl('request-lines/'+this.requestId);
      } );
    }
}
