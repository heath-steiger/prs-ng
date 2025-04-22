import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy{
  title: string = 'User-List';
  users! : User[];
  subscription! : Subscription;
  loggedInUser!: User; 
  isAdmin: boolean = false;

constructor(
  private userSvc: UserService,
    private sysSvc: SystemService
){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.subscription = this.userSvc.list().subscribe((resp) => {
      this.users = resp;}
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete(id: number) {
    this.subscription = this.userSvc.delete(id).subscribe({
      next: () => {
        // refresh the user list
        this.subscription = this.userSvc.list().subscribe((resp) => {
          this.users = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user for id: '+id);
        alert('Error deleting user for id: '+id);
      }
    });
  }
}