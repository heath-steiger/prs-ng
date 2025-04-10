import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserLogin } from '../../../model/user-login';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  subsciption!: Subscription;
  user!: User;
  message: string = '';

constructor(private userSvc: UserService,
            private router: Router,
            private sysSvc: SystemService
){}


  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.subsciption?.unsubscribe();
  }

  login(){
    this.subsciption = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
          this.sysSvc.loggedInUser = resp;
          
          this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        //unsuccessful login
        this.message = 'Invalid login - bad username/password';
      }
    });
  }

}