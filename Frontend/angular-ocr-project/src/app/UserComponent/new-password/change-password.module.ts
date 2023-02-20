import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { NewPasswordComponent } from './new-password.component';

@NgModule({
    declarations:[
        NewPasswordComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [AuthService]
})

export class NewPasswordModule{}