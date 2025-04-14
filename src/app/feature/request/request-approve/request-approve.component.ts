import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lineitem } from '../../../model/lineitem';
import { LineitemService } from '../../../service/lineitem.service';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request';
import { ApproveService } from '../../../service/approve.service';
import { RejectService } from '../../../service/reject.service';

@Component({
  selector: 'app-request-approve',
  standalone: false,
  templateUrl: './request-approve.component.html',
  styleUrl: './request-approve.component.css'
})
export class RequestApproveComponent  implements OnInit, OnDestroy{

  title: string = '[Purchase Request Approve/Reject]';
  subscription!: Subscription;
  requestId: number = 0;
  request!: Request;
  lineItems!: Lineitem[];
  requests!: Request[];
  
 
  constructor(
   private actRoute: ActivatedRoute,
   private requestSvc: RequestService,
   private approveSvc: ApproveService,
   private rejectSvc: RejectService,
   private lineItemSvc: LineitemService,   
   private router: Router    
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
  approve() {
    this.approveSvc.update(this.request).subscribe({
      next: resp => {
        this.request = resp;
        this.router.navigateByUrl('review-list');
      },
      error: (err) => {
        console.log('error approving request', err);
      },
  });
 }
 reject() {
  this.rejectSvc.update(this.request).subscribe({
    next: resp => {
      this.request = resp;
      this.router.navigateByUrl('review-list');
    },
    error: (err) => {
      console.log('error rejecting request', err);
    },
});
}
   ngOnDestroy(): void {
     this.subscription?.unsubscribe;
   }
   
 }