import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashComponent } from './dash/dash.component';
import { DocsComponent } from './docs/docs.component';
import { CreateDocumentComponent } from './DocumentComponents/create-document/create-document.component';
import { EditDocumentComponent } from './DocumentComponents/edit-document/edit-document.component';
import { ListDocumentsComponent } from './DocumentComponents/list-documents/list-documents.component';
import { ShowDocumentComponent } from './DocumentComponents/show-document/show-document.component';
import { FrontTemplateComponent } from './front-template/front-template.component';
import { MainComponent } from './main/main.component';
import { ChangePasswordComponent } from './UserComponent/change-password/change-password.component';
import { NewPasswordComponent } from './UserComponent/new-password/new-password.component';
import { ResetPasswordComponent } from './UserComponent/reset-password/reset-password.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { ListReclamationComponent } from './reclamation/list-reclamation/list-reclamation.component';
import { ListArchiveComponent } from './archive/list-archive/list-archive.component';
import { ArticleComponent } from './article/article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';

const routes: Routes = [
  {path:'',component: FrontTemplateComponent ,
    children :[
      {path:'',component: MainComponent},
      {path:'auth',component: AuthComponent},
      {path:'reset',component: ResetPasswordComponent},
      {path:'new-password/:uidb64/:token',component:NewPasswordComponent},]},
      {path:'blog',component: ArticleComponent},
  {path:'dashboard',component: DashboardComponent,
    children:[
      {path:'dash',component: DashComponent},
      {path:'profile',component: AccountComponent},
      {path:'change',component: ChangePasswordComponent},
      {path:'createDoc',component: CreateDocumentComponent},
      {path:'listDocs',component: ListDocumentsComponent},
      {path:'editDoc/:id',component: EditDocumentComponent},
      {path:'showDoc/:id',component: ShowDocumentComponent},
      {path:'reclamation',component: ListReclamationComponent},
      {path:'archive',component: ListArchiveComponent},
      {path:'article',component: ListArticleComponent},
     

    ]},
  
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
