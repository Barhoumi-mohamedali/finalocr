import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from './docs.service';
@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})

export class DocsComponent{
  DJANGO_SERVER = 'http://127.0.0.1:8000'
  docForm: FormGroup;
  response;
  imageURL;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    
    this.docForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      docImage: ['']
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.docForm.get('docImage').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title',this.docForm.get('title').value)
    formData.append('file', this.docForm.get('docImage').value)

    this.uploadService.upload(formData).subscribe(
      (res) => {
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
}
