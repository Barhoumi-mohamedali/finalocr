import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppModule } from '../app.module';
import { AuthService } from '../auth/auth.service';
import { DocsComponent } from './docs.component';


@NgModule({
    declarations:[
        DocsComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
       
    ],
    providers: [AuthService]
})

export class DocsModule{}