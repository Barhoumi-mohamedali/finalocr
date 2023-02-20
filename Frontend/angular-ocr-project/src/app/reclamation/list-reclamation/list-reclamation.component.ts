import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../reclamation.model';
import { Observable, Subscription } from 'rxjs';
import { ReclamationService } from '../reclamation.service';

import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import Swal from 'sweetalert2';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UntypedFormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.css']
})
export class ListReclamationComponent implements OnInit {

  recs : Reclamation[]=[];
  user : User;
  private docssub: Subscription;
  editForm: UntypedFormGroup;

  closeResult: string = '';
  constructor(private RecService: ReclamationService ,private dash: DashboardComponent ) { }

  ngOnInit(): void {

  this.user = this.dash.user

  this.RecService.listRecs(this.user.user_id).subscribe((data)=>{
    this.recs=data
    
  })
  
}

OnDelete(rec_id :string){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
    
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your reclamation has been deleted.',
        'success'
      ),
      this.RecService.deleteRec(rec_id).subscribe(response => {
        console.log(response);
        this.ngOnInit();
      })

    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your reclamation is safe :)',
        'error'
      )
    }
  })
}

reclamationLaunch:Reclamation=new Reclamation();
indexLaunch:any;
 Launch(reclamation:Reclamation,index:any){
   this.reclamationLaunch=reclamation;
   this.indexLaunch=index;
   console.log(this.reclamationLaunch)
   console.log(this.indexLaunch)
 }
 

OnEdit(){

  this.RecService.EditRec(this.reclamationLaunch).subscribe(response => {
    this.recs[this.indexLaunch]=response
  })
  
}

reclamation:Reclamation=new Reclamation();
RecCreate(){ 
  this.reclamation.owner=this.user.user_id;
  this.RecService.createRec(this.reclamation).subscribe(response => {
    this.recs.push(response);
      })
  
}


 
}


