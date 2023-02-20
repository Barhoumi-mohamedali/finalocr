import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocService } from '../document.service';
import { EditDocumentComponent } from './edit-document.component';

@NgModule({
    declarations:[
        EditDocumentComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        RouterModule,
        
    ],
    providers: [DocService]
})

export class EditDocumentModule{}