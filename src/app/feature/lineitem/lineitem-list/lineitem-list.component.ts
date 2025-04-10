import { Component, OnDestroy, OnInit } from '@angular/core';
import { LineitemService } from '../../../service/lineitem.service';
import { Subscription } from 'rxjs';
import { Lineitem } from '../../../model/lineitem';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-lineitem-list',
  standalone: false,
  templateUrl: './lineitem-list.component.html',
  styleUrl: './lineitem-list.component.css'
})
export class LineitemListComponent implements OnInit, OnDestroy{
  title: string = 'Lineitem-List';
  lineitems! : Lineitem[];
  subscription! : Subscription;
  welcomeMsg!: string;
  loggedInUser!: User; 
  isAdmin: boolean = false;

constructor(
  private lineitemSvc: LineitemService,
  private sysSvc: SystemService
){}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.admin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    console.log('logged in user: ', this.sysSvc.loggedInUser);
    
    this.subscription = this.lineitemSvc.list().subscribe((resp) => {
      this.lineitems = resp;}
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete(id: number) {
    this.subscription = this.lineitemSvc.delete(id).subscribe({
      next: () => {
        // refresh the lineitem list
        this.subscription = this.lineitemSvc.list().subscribe((resp) => {
          this.lineitems = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting lineitem for id: '+id);
        alert('Error deleting lineitem for id: '+id);
      }
    });
  }
}