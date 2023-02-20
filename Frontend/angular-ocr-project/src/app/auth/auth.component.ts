import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthResData } from './auth.model';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  signupForm: FormGroup;
  loginForm: FormGroup;
  token: string;
  error:string=null;
  success:string=null;
  age:number =null;

  constructor(private authService: AuthService ,private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'username': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'birthday': new FormControl(null),
      'passwords': new FormGroup({
        'password': new FormControl(null,[Validators.required,Validators.minLength(8)]),
        'confirmpassword': new FormControl(null, Validators.required)
      },this.passwordCheck)
    });
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(8)])
    })
  }

  onSwitch(){
    this.isLoginMode = !this.isLoginMode;
  }
  
  onSignup(){
    console.log(this.signupForm)
    this.authService.signup({
      'email': this.signupForm.get('email').value,
      'username': this.signupForm.get('username').value,
      'name': this.signupForm.get('name').value,
      'password': this.signupForm.get('passwords.password').value,
      'birthday': this.signupForm.get('birthday').value,
    })
    .subscribe(
      (data: AuthResData) => {
        this.isLoginMode = true;
        this.success='Signup was successfull , Please Verify Your E-mail';
        Swal.fire({
          icon: 'success',
          title: 'Welcome',
          text: 'Signup was successfull , Please Verify Your E-mail',
         
        })
        this.error = null;
      },(errorRes)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    )
  }


  onLogin(){
    this.authService.login(this.loginForm.value)
    .subscribe(
      (data: AuthResData) => {
        this.token = data.token
        console.log(data)
        this.router.navigate(['/dashboard/dash'])
      },(errorRes)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    )
    this.loginForm.reset()

  }

  passwordCheck(control: FormGroup): {[s:string]:boolean}{
    if(control.get('password').value != control.get('confirmpassword').value){
      return {'notsame': true}
    }
    return null;
  }



}