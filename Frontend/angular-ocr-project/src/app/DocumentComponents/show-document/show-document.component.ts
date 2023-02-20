import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { DocService } from '../document.service';
import { Document, PassportModel, VitaleModel } from '../document.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.css']
})
export class ShowDocumentComponent implements OnInit,OnDestroy{
  error:string=null;
  success:string=null;
  user: User;
  userSub: Subscription;
  modelTypes = ["CIN","FACTURE","PASSPORT","MEDICAL_DOC"];
  selectedValue = "Select the Document Type";
  url: any; //Angular 11, for stricter type
	msg = "";
  img :string='';
  imgf :File;
  DJANGO_SERVER = 'http://127.0.0.1:8000'
  response;
  imageURL;
  doc : Document;
  doc_id:any;
  ext_id:any;
  pass: PassportModel;
  private docSub: Subscription;
  private passSub: Subscription;
  vitale: VitaleModel;


  constructor(private docService: DocService ,private dash: DashboardComponent ,private _Activatedroute:ActivatedRoute) {}

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.doc_id = params.get("id")
    }),
    this.user = this.dash.user ,
    this.docSub =this.docService.detailDoc(this.doc_id).subscribe((data:Document)=>{
      this.doc=data

      if(data.modelType=='PASSPORT')
      {
      this.passSub =this.docService.detailExt(data.data).subscribe((data:PassportModel)=>{
        this.pass=data;
        
      });}
      else if(data.modelType=='VITALE')
      {
      this.docService.detailExtVitale(data.vitale_data).subscribe((data:VitaleModel)=>{
        this.vitale=data;
      });
    }
    })
   
  }


  OnShow(){
    if(this.doc.modelType == 'PASSPORT')
    {
      Swal.fire({
        title: '<strong>'+this.doc.title+'\'s Data</strong>',
        icon: 'info',
        html:
        '<div class="table-responsive">'+
                  '<table class="table align-items-center table-flush">'+
                      '<thead class="thead-light">'+
                          '<tr>'+
                              '<th scope="col" >nationality</th>'+
                              '<th scope="col" >First Name</th>'+
                              '<th scope="col" >Last Name</th>'+
                              '<th scope="col" >Type</th>'+
                              '<th scope="col" >Date of Birth</th>'+
                              '<th scope="col"> Gender</th>'+
                              '<th scope="col"> Experation Date</th>'+
                          '</tr>'+
                      '</thead>'+
                      '<tbody class="list">'+
                          '<tr>'+
                              '<th scope="row">'+
                                  
                                      '<div class="media-body"><span class="name mb-0 text-sm">'+this.pass.nationality+'</span></div>'+
                                  
                              '</th>'+
                              '<td class="budget">'+this.pass.names+'</td>'+
                              '<td class="budget">'+this.pass.surname+'</td>'+
                              '<td class="budget">'+this.pass.type+'</td>'+
                              '<td class="budget">'+this.pass.date_of_birth+'</td>'+
                              '<td class="budget">'+this.pass.sex+'</td>'+
                              '<td class="budget">'+this.pass.expiration_date+'</td>'+

                          '</tr>'+
                      '</tbody>'+
                  '</table>'+
              '</div>',
        showCancelButton: false,
        focusConfirm: false,
        cancelButtonText:
          'Exit',
        cancelButtonAriaLabel: 'Thumbs down'
      })
    }
    else if(this.doc.modelType == 'VITALE')
    {
      Swal.fire({
        title: '<strong>'+this.doc.title+'\'s Data</strong>',
        icon: 'info',
        html:
        '<div class="table-responsive">'+
                  '<table class="table align-items-center table-flush">'+
                      '<thead class="thead-light">'+
                          '<tr>'+
                              '<th scope="col" >Ful Name</th>'+
                              '<th scope="col" >Emise Date</th>'+
                              '<th scope="col" >Gender</th>'+
                              '<th scope="col" >Security Key</th>'+
                              '<th scope="col" >Date of Birth</th>'+
                          '</tr>'+
                      '</thead>'+
                      '<tbody class="list">'+
                          '<tr>'+
                              '<th scope="row">'+
                                  
                                '<div class="media-body"><span class="name mb-0 text-sm">'+this.vitale.full_name+'</span></div>'+
                                  
                              '</th>'+
                              '<td class="budget">'+this.vitale.emise_date+'</td>'+
                              '<td class="budget">'+this.vitale.gender+'</td>'+
                              '<td class="budget">'+this.vitale.cle_de_securite+'</td>'+
                              '<td class="budget">'+this.vitale.date_of_birth+'</td>'+
                              

                          '</tr>'+
                      '</tbody>'+
                  '</table>'+
              '</div>',
        showCancelButton: false,
        focusConfirm: false,
        cancelButtonText:
          'Exit',
        cancelButtonAriaLabel: 'Thumbs down'
      })
    }
    }

    ngOnDestroy(){
      if(this.doc.modelType=='PASSPORT')
      {
      this.passSub.unsubscribe();
    }
      this.docSub.unsubscribe();
      

    }

}

