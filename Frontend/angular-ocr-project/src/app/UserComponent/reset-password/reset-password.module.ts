import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../auth/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        ResetPasswordComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
    ],
    providers: [AuthService]
})

export class ResetPasswordModule{}