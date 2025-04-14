import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { User } from '../../model/user';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  title: string = 'PRS';
  menuItems: MenuItem[] = [];
  menuReview: MenuItem[] = [];
  loggedInUser!: User; 
  isReviewer: boolean = false;
  login: MenuItem[] = [];

   constructor(
      
      private sysSvc: SystemService
    ){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isReviewer = this.loggedInUser.reviewer;
    console.log("AA"+this.loggedInUser);  
    console.log("AA"+this.isReviewer);
    console.log('logged in user: ', this.sysSvc.loggedInUser);
  this.menuItems = [
    new MenuItem('Vendor', '/vendor-list', 'VendorList'),
    new MenuItem('Product', '/product-list', 'ProductList'),
    new MenuItem('User', '/user-list', 'UserList'),
    new MenuItem('Request', '/request-list', 'RequestList')
  ]
  this.menuReview = [
    new MenuItem('Review', '/review-list', 'ReviewList')
  ]
  this.login = [
    new MenuItem('Login', '/user-login', 'UserLogin')
  ]
  
}
}