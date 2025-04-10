import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-request-edit',
  standalone: false,
  templateUrl: './request-edit.component.html',
  styleUrl: './request-edit.component.css'
})
export class RequestEditComponent implements OnInit, OnDestroy {
  title: string = "Request-Edit"
  requestId!: number;
  request!: Request;
  subscription!: Subscription;
  users: User[] = [];
  deliveryMode: string[] = ['Delivery', 'Pick-up']


constructor(
  private requestSvc: RequestService,
  private router: Router,
  private actRoute: ActivatedRoute,
  private userSvc: UserService
){}

ngOnInit(): void {
  // get the request id from the url
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
    });
    this.subscription = this.userSvc.list().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading users.' + err.message
        );
      },
    });
  }
    save() {
      this.requestSvc.update(this.request).subscribe({
        next: resp => {
          this.request = resp;
          this.router.navigateByUrl('request-list');
        },
        error: (err) => {
          console.log('error saving request', err);
        },
    });


  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id == b.id;
  }

}