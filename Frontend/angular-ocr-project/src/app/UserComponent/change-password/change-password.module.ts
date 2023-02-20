import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password.component';
import { AuthService } from '../../auth/auth.service';

@NgModule({
    declarations:[
        ChangePasswordComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [AuthService]
})

export class ChangePasswordModule{}