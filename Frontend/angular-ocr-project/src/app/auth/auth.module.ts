import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';


@NgModule({
    declarations:[
        AuthComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
       
    ],
    providers: [AuthService]
})

export class AuthModule{}