import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lineitem } from '../../../model/lineitem';
import { Request } from '../../../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineitemService } from '../../../service/lineitem.service';
import { RequestService } from '../../../service/request.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-request-lines',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrl: './request-lines.component.css'
})
export class RequestLinesComponent implements OnInit, OnDestroy{

  title: string = '[Purchase Request Line Items]';
  subscription!: Subscription;
  requestId: number = 0;
  user! : User;
  request!: Request;
  lineItems!: Lineitem[];
  requests!: Request[];
  
 
  constructor(
   private actRoute: ActivatedRoute,
  private router: Router,
   private requestSvc: RequestService,
   private lineItemSvc: LineitemService,       
  ){}
 
   ngOnInit(): void {
     this.actRoute.params.subscribe((parms)=>{
      this.requestId = parms['id'];
      // get the request for the id
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
        },
        error: (err) => {
          console.log('Error retrieving request: ', err);
        }
      });
       this.subscription = this.lineItemSvc.getLineitemsForRequestId(this.requestId).subscribe({
         next: (resp) => {
           this.lineItems = resp;
           console.log("A", this.lineItems);
         },
         error: (err) => {
           console.log('Error retrieving lineItems for requests: ', err);
         }
     });
     this.subscription = this.requestSvc.list().subscribe({next: (resp) => {
         this.requests = resp;
       },
       error: (err) => {
         console.log('Error retrieving requests: ', err);
       }
       });
    });
     
   }
   ngOnDestroy(): void {
     this.subscription?.unsubscribe;
   }
   compRequest(a: Request, b: Request): boolean {
     return a && b && a.id == b.id;
   }
   delete(lineItemId: number) {
    this.subscription = this.lineItemSvc.delete(lineItemId).subscribe({
      next: () => {
        // refresh the lineitem list
        this.subscription = this.lineItemSvc.getLineitemsForRequestId(this.requestId).subscribe({
          next: (resp) => {
          this.lineItems = resp;
            
          this.subscription = this.requestSvc.getById(this.requestId).subscribe({
            next: (resp) => {
              this.request = resp;
            }
          });
        }
      });
     
        
      },
      error: (err) => {
        console.log('Error deleting lineItem for id: '+lineItemId);
        alert('Error deleting lineItem for id: '+lineItemId);
      }
    });
  }
  forReview() {
    this.requestSvc.forReview(this.request).subscribe({
      next: resp => {
        this.request = resp;
        this.router.navigateByUrl('request-list');
      },
      error: (err) => {
        console.log('error submitting for review', err);
      },
  });


}
   
 }
