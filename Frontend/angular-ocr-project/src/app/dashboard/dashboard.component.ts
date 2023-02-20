import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { AuthService } from '../auth/auth.service';
import { DocService } from '../../app/DocumentComponents/document.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAuthenticated:boolean = false;
  private userSub: Subscription;
  user: User;
 

  constructor(private authService: AuthService,public docService: DocService) { }

  ngOnInit():void {
    this.userSub = this.authService.user.subscribe((user)=>{
      this.user=user
      this.isAuthenticated =!user? false: true;
    });
  //  console.log(this.authService.GetCountArchive);

   
  }

  parentMethodToUseVarNameOutContent(varNameOut: any){
    console.log("****************")

    console.log(varNameOut);
    console.log("****************")

 }
 


  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }

}
