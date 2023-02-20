import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { ChangeResData, User } from '../../auth/auth.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit,OnDestroy {
  
  ChangePasswordForm: FormGroup;
  success:string=null;
  error:string=null;
  user: User;
  userSub: Subscription;

  

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(
      (data: User) => {
        this.user = data
      }
    )
    this.ChangePasswordForm = new FormGroup({
      'email': new FormControl(this.user.email),
      'passwords': new FormGroup({
        'old_password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
        'new_password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
        'confirmpassword': new FormControl(null, Validators.required)
      },this.passwordCheck)});

   
   
  }

  onChange(){
    console.log(this.ChangePasswordForm)
    this.authService.changePassword({
      'email': this.ChangePasswordForm.get('email').value,
      'old_password': this.ChangePasswordForm.get('passwords.old_password').value,
      'new_password': this.ChangePasswordForm.get('passwords.new_password').value
    })
    .subscribe(
      (data: ChangeResData) => {
        
        this.success='Password has Been Changed';
        this.error = null;
      },(errorRes)=>{
        this.error='Old Password is wrong';
      }
    )
    
  }

  passwordCheck(control: FormGroup): {[s:string]:boolean}{
    if(control.get('new_password').value != control.get('confirmpassword').value){
      return {'notsame': true}
    }
    return null;
  }

  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

}
