import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { createDoc, listDocs, listDocss, passport } from "./document.model";
import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../auth/auth.model";
import { HttpParams } from '@angular/common/http';
@Injectable({providedIn: 'root'})
export class DocService{ 

   

    document = new BehaviorSubject<Document>(null);

    DJANGO_SERVER: string = "http://127.0.0.1:8000";

    constructor(private http: HttpClient ,private router: Router){}

    public upload(formData) {
        return this.http.post<any>(`${this.DJANGO_SERVER}/documents/create`, formData);
      }

    public Extract(formData) {

        return this.http.post<any>(`${this.DJANGO_SERVER}/documents/extractDoc`, formData);
      }

    createDoc(account: createDoc){
        return this.http.post<any>('http://localhost:8000/documents/', account)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    public verifyData(formData,id:string) {
        return this.http.patch<any>(`${this.DJANGO_SERVER}/documents/verifyData/${id}`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
      }

    public verifyDataVitale(formData,id:string) {
        return this.http.patch<any>(`${this.DJANGO_SERVER}/documents/verifyDataVitale/${id}`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
      }


    public verifyDataById(formData,id:string) {
        return this.http.patch<any>(`${this.DJANGO_SERVER}/documents/verifyDataById/${id}`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
      }

    public verifyDataVitaleById(formData,id:string) {
        return this.http.patch<any>(`${this.DJANGO_SERVER}/documents/verifyDataVitaleById/${id}`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
      }

    public EditDoc(formData,id:string) {
        return this.http.patch<any>(`${this.DJANGO_SERVER}/documents/edit/${id}`, formData)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
      }
    

    deleteDoc(id: string): Observable<any> {
        return this.http.delete(`${this.DJANGO_SERVER}/documents/delete/${id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    detailDoc(doc_id:string): Observable<any> {
        return this.http.get<listDocs>('http://localhost:8000/documents/detail/'+`${doc_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    detailDocByTitle(doc_title:string): Observable<any> {
        return this.http.get<listDocs>('http://localhost:8000/documents/detailExtractT/'+`${doc_title}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    detailExt(ext_id:string): Observable<any> {
        return this.http.get<passport>('http://localhost:8000/documents/detailExtract/'+`${ext_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    detailExtVitale(ext_id:string): Observable<any> {
        return this.http.get<passport>('http://localhost:8000/documents/detailExtractVitale/'+`${ext_id}`)
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }

    listDocs(user_id:any): Observable<any> {

        return this.http.get<listDocs>('http://localhost:8000/documents/'+`${user_id}`+'/')
        .pipe(catchError(this.handleError),tap((res)=>{
            console.log(res)
        }))
    }
    

    private handleError(error: HttpErrorResponse){
        console.log(error)
        let errormessage = 'An unknown errror occured'
        if (error.error instanceof ErrorEvent) {

            // client-side error
 
            errormessage = error.error.message;
 
          }
        if(!error.error){
            return throwError(errormessage)
        }
        if(error.error.non_field_errors){
            errormessage = error.error.non_field_errors[0]
        }
        if(error.error.email){
            errormessage = error.error.email[0]
        }
        if(error.error.username){
            errormessage = error.error.username[0]
        }

        return throwError(errormessage);
    }

}