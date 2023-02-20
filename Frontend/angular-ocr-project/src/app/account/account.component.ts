import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent  implements OnInit,OnDestroy {
 age:number;

 private userSub: Subscription;
 user: User;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user)=>{
      this.user=user
      
    })
   
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}