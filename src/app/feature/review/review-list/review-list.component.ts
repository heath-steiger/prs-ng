import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';
import { ReviewService } from '../../../service/review.service';
import { Request } from '../../../model/request';





@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
  
})
export class ReviewListComponent implements OnInit, OnDestroy{
    title: string = '[Request-Review]';
    requests! : Request[];
    subscription! : Subscription;
    welcomeMsg!: string;
    loggedInUser!: User; 
    isReviewer: boolean = false;
    userId: number = 0;
  
  constructor(
 
    private reviewSvc: ReviewService,
    private sysSvc: SystemService,
    
    
  
  ){}
  
    ngOnInit(): void {
      this.loggedInUser = this.sysSvc.loggedInUser;
      this.isReviewer = this.loggedInUser.reviewer;
      this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
      console.log('logged in user: ', this.sysSvc.loggedInUser);

     
        this.userId = this.loggedInUser.id;

    this.subscription = this.reviewSvc.getReviews(this.userId).subscribe({
      next: (resp) => {
        this.requests = resp;
      },
      error: (err) => {
        console.error("Error fetching review requests: ", err);
      }
    });

      this.subscription = this.reviewSvc.list().subscribe((resp) => {
        this.requests = resp;}
      );

      this.subscription = this.reviewSvc.list().subscribe((resp) => {
        this.requests = resp;}
      );

      
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    
  }

