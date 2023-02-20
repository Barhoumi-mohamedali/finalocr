import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResData } from 'src/app/auth/auth.model';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  error:string=null;
  success:string=null;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
    })
  }

  OnForgotPassword() {
    console.log(this.forgotPasswordForm)
    this.auth.forgotPassword({
      'email': this.forgotPasswordForm.get('email').value

    })
    .subscribe(
      (data: AuthResData) => {
        this.success='Link has been send , ckeck your email';
        this.error = null;
      },(errorRes)=>{
        this.error=errorRes;
      }
    )
  }
  }


