import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { NewPasswordResData } from 'src/app/auth/auth.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  NewPasswordForm: FormGroup;
  success:string=null;
  error:string=null;
  uidb64:string=null;
  token:string=null;

  constructor(private authService: AuthService,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
      this.uidb64 = params.get("uidb64");
      this.token = params.get("token");  
  }),
    this.NewPasswordForm = new FormGroup({
      'uidb64': new FormControl(this.uidb64),
      'token': new FormControl(this.token),
      'passwords': new FormGroup({
        'password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
        'confirmpassword': new FormControl(null, Validators.required)
      },this.passwordCheck)});

  }

  onNewPassword(){
    console.log(this.NewPasswordForm)
    this.authService.newPassword({
      'token': this.NewPasswordForm.get('token').value,
      'uidb64': this.NewPasswordForm.get('uidb64').value,
      'password': this.NewPasswordForm.get('passwords.password').value
    })
    .subscribe(
      (data: NewPasswordResData) => {
        
        this.success='Password has Been Changed';
        this.error = null;
      },(errorRes)=>{
        this.error='Activation link is invalid , please try again';
      }
    )
    
  }

  passwordCheck(control: FormGroup): {[s:string]:boolean}{
    if(control.get('password').value != control.get('confirmpassword').value){
      return {'notsame': true}
    }
    return null;
  }
}
