import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/auth.model';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import Swal from 'sweetalert2';
import { DocService } from '../document.service';
import { Document, PassportModel, VitaleModel } from '../document.model';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {

  editForm: FormGroup;
  verifyForm: FormGroup;
  verifyVitaleForm: FormGroup;

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
  e:any;
  pass: PassportModel;
  private passSub: Subscription;
  doct:Document;
  data_ref:string;
  full_ref :string;
  editData = false;
  editDataVitale = false;
  vitale: VitaleModel;



  constructor(private docService: DocService ,private dash: DashboardComponent ,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(){
    this._Activatedroute.paramMap.subscribe(params => { 
      this.doc_id = params.get("id"); 
    });
    this.user = this.dash.user ;
    this.docService.detailDoc(this.doc_id).subscribe((data:Document)=>{
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
    });
    this.editForm = new FormGroup({
      'title' : new FormControl(''),
      'description': new FormControl('',Validators.required),
      'modelType': new FormControl('',[Validators.required,Validators.email]),
      'owner': new FormControl(this.user.email),
      'docImage':new FormControl(''),
      'img': new FormControl(),
     });
     this.verifyForm = new FormGroup({
      'names' : new FormControl(''),
      'surname': new FormControl(''),
      'nationality': new FormControl(''),
      'type': new FormControl(''),
      'sex': new FormControl(''),
      'date_of_birth': new FormControl(''),
      'expiration_date': new FormControl(''),
     });
     this.verifyVitaleForm = new FormGroup({
      'full_name' : new FormControl(''),
      'emise_date': new FormControl(''),
      'gender': new FormControl(''),
      'date_of_birth': new FormControl(''),
      'cle_de_securite': new FormControl(''),
     });
     
    }

  onCreate(){
    console.log(this.editForm)
    
    const formData = new FormData();
    formData.append('title',this.editForm.get('title').value)
    formData.append('description',this.editForm.get('description').value)
    formData.append('modelType',this.editForm.get('modelType').value)
    formData.append('owner',this.user.user_id)
    if(!this.url){
      
    }
    else
    {formData.append('file', this.editForm.get('docImage').value) }
    

    this.docService.EditDoc(formData,this.doc_id).subscribe(
      (res) => {
        Swal.fire({
          title: 'Document has Been Edited',
          text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }
  

  imagePreviewEdit(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.editForm.patchValue({
      img: file
    });

    this.editForm.get('img').updateValueAndValidity()

    
    
      this.url = this.doc.file
    
  
  }


  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.editForm.patchValue({
      img: file
    });

    this.editForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.url = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  //selectFile(event) { //Angular 8
	selectFile(event :any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
    const file = event.target.files[0];
    this.editForm.get('docImage').setValue(file);

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
      //this.img = ("http://127.0.0.1:8000/media/images/" + event.target.files[0].name);
    
		}

	}

  onVerify(){
    console.log(this.verifyForm)
    
    const formData = new FormData();
    formData.append('names',this.verifyForm.get('names').value)
    formData.append('surname',this.verifyForm.get('surname').value)
    formData.append('nationality',this.verifyForm.get('nationality').value)
    formData.append('type',this.verifyForm.get('type').value)
    formData.append('sex',this.verifyForm.get('sex').value)
    formData.append('date_of_birth',this.verifyForm.get('date_of_birth').value)
    formData.append('expiration_date',this.verifyForm.get('expiration_date').value)
  
    this.docService.verifyDataById(formData,this.doc.data).subscribe(
      (res) => {
        Swal.fire({
          title: 'Data has Been Saved',
          text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }


  onVerifyVitale(){
    console.log(this.verifyVitaleForm)
    
    const formData = new FormData();
    formData.append('full_name',this.verifyVitaleForm.get('full_name').value)
    formData.append('emise_date',this.verifyVitaleForm.get('emise_date').value)
    formData.append('gender',this.verifyVitaleForm.get('gender').value)
    formData.append('cle_de_securite',this.verifyVitaleForm.get('cle_de_securite').value)
    formData.append('date_of_birth',this.verifyVitaleForm.get('date_of_birth').value)
    
  
    this.docService.verifyDataVitaleById(formData,this.doc.vitale_data).subscribe(
      (res) => {
        Swal.fire({
          title: 'Vitale Data has Been Saved',
          text: "You won't be able to revert this!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
        })
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  onEditData(){
    if(this.doc.modelType =='PASSPORT')
    {
    this.verifyForm.patchValue({
      names: this.pass.names,
      surname: this.pass.surname,
      nationality: this.pass.nationality,
      type: this.pass.type,
      sex: this.pass.sex,
      date_of_birth: this.pass.date_of_birth,
      expiration_date: this.pass.expiration_date,
    });
    this.editData=true;
  }
  else if(this.doc.modelType =='VITALE'){
    this.verifyVitaleForm.patchValue({
      full_name: this.vitale.full_name,
      emise_date: this.vitale.emise_date,
      gender: this.vitale.gender,
      cle_de_securite: this.vitale.cle_de_securite,
      date_of_birth: this.vitale.date_of_birth,
    });
    this.editDataVitale=true;
  }
  }

}
