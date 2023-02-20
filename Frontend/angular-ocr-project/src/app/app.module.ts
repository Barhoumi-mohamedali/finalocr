import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccountComponent } from './account/account.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordModule } from './UserComponent/reset-password/reset-password.module';
import { VerifyEmailComponent } from './UserComponent/verify-email/verify-email.component';
import { ChangePasswordModule } from './UserComponent/change-password/change-password.module';
import { NewPasswordModule } from './UserComponent/new-password/change-password.module';
import { ListDocumentsComponent } from './DocumentComponents/list-documents/list-documents.component';
import { ShowDocumentComponent } from './DocumentComponents/show-document/show-document.component';
import { EditDocumentComponent } from './DocumentComponents/edit-document/edit-document.component';
import { CreateDocumentModule } from './DocumentComponents/create-document/create-document.model';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontTemplateComponent } from './front-template/front-template.component';
import { DocsComponent } from './docs/docs.component';
import { DocsModule } from './docs/docs.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditDocumentModule } from './DocumentComponents/edit-document/edit-document.model';
import { DashComponent } from './dash/dash.component';


//import { DialogComponent } from './dialog/dialog.component';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ListReclamationComponent } from './reclamation/list-reclamation/list-reclamation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import { ArchiveComponent } from './archive/archive.component';
import { ListArchiveComponent } from './archive/list-archive/list-archive.component';
import { AuthService } from 'src/app/auth/auth.service';
import { ArticleComponent } from './article/article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    VerifyEmailComponent,
    ListDocumentsComponent,
    ShowDocumentComponent,
    MainComponent,
    FooterComponent,
    DashboardComponent,
    FrontTemplateComponent,
    DashComponent,
    ListReclamationComponent,
    ArchiveComponent,
    ListArchiveComponent,
    ArticleComponent,
    ReclamationComponent,
    ListArticleComponent,
    

   
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ResetPasswordModule,
    ChangePasswordModule,
    NewPasswordModule,
    CreateDocumentModule,
    DocsModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
    SweetAlert2Module.forChild({ /* options */ }),

    EditDocumentModule,
    NgbModule,
    FormsModule,
    RouterModule
  ],
  entryComponents: [NgbModule],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
