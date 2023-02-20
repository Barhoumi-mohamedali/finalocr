import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DocService } from '../../DocumentComponents/document.service';
import { Document, listDocs, listDocss } from '../../DocumentComponents/document.model';
import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-list-archive',
  templateUrl: './list-archive.component.html',
  styleUrls: ['./list-archive.component.css']
})
export class ListArchiveComponent implements OnInit {

  
docs : Document[];
user : User;

private docssub: Subscription;

  public compteur : any;

  @Output() varNameOut: EventEmitter<any> = new EventEmitter();

  constructor(private docService: DocService ,private dash: DashboardComponent ,private authService: AuthService ) { }

  ngOnInit(): void {

  this.user = this.dash.user

  this.docService.listDocs(this.user.user_id).subscribe((data)=>{

    this.docs=data;

  this.compteur=this.docs.length;
 // this.authService.setCountArchive=this.compteur;
 // console.log(this.compteur)
 this.varNameOut.emit(this.compteur);
 

  })
  
  
}
  OnDelete(doc_id :string){
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
          'Your file has been deleted.',
          'success'
        ),
        this.docService.deleteDoc(doc_id).subscribe(response => {
          console.log(response);
          this.ngOnInit();
        })

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
