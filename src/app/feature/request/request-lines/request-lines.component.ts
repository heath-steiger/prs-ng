import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lineitem } from '../../../model/lineitem';
import { Request } from '../../../model/request';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineitemService } from '../../../service/lineitem.service';
import { RequestService } from '../../../service/request.service';

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
  request!: Request;
  lineItems!: Lineitem[];
  requests!: Request[];
 
  constructor(
   private actRoute: ActivatedRoute,
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
   delete(id: number) {
    this.subscription = this.requestSvc.delete(id).subscribe({
      next: () => {
        // refresh the request list
        this.subscription = this.requestSvc.list().subscribe((resp) => {
          this.requests = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting request for id: '+id);
        alert('Error deleting request for id: '+id);
      }
    });
  }
   
 }
 