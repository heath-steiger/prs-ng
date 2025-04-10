import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title: string = "Request-Create";
  newRequest: Request = new Request();
  subscription!: Subscription;
  users: User[] = [];
  deliveryMode: string[] = ['Delivery', 'Pick-up']
  
  constructor(private requestSvc: RequestService,
              private userSvc: UserService,
              private router: Router
  ){}
  
    ngOnInit(): void {
      this.subscription = this.userSvc.list().subscribe({
        next: (resp) => {
          this.users = resp;
        },
        error: (err) => {
          console.error(
            'Request Create Error: error loading users.' + err.message
          );
        },
      });
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
  
    }

    addRequest(): void {
      this.subscription = this.requestSvc.add(this.newRequest).subscribe((resp) => {
        this.router.navigateByUrl('request-list');
      } );
    }
}
