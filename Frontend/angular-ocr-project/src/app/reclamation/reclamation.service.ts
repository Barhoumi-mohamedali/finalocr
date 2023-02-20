import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {listRecs,Reclamation } from "./reclamation.model";
/**import { createDoc, listDocs, listRecs } from "./reclamation.model";*/

import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../auth/auth.model";
import { HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class ReclamationService {

  document = new BehaviorSubject<Document>(null);

  DJANGO_SERVER: string = "http://127.0.0.1:8000";

  constructor(private http: HttpClient ,private router: Router){}

  listRecs(user_id:any): Observable<any> {

    return this.http.get<listRecs>('http://localhost:8000/reclamation/'+`${user_id}`+'/')
    .pipe(catchError(this.handleError),tap((res)=>{
        console.log(res)
    }))
}

deleteRec(id: string): Observable<any> {
  return this.http.delete(`${this.DJANGO_SERVER}/reclamation/delete/${id}`)
  .pipe(catchError(this.handleError),tap((res)=>{
      console.log(res)
  }))
}
/**
public EditRec(reclamation:Reclamation):Observable<any> {
  return this.http.put<any>(`${this.DJANGO_SERVER}/reclamation/edit/` ,reclamation)
  .pipe(catchError(this.handleError),tap((res)=>{
      console.log(res)
  }))
} */
public EditRec(reclamation:Reclamation):Observable<any>  {
  return this.http.put<any>(`${this.DJANGO_SERVER}/reclamation/edit/${reclamation.id}`,reclamation)
  .pipe(catchError(this.handleError),tap((res)=>{
      console.log(res)
  }))
}

createRec(reclamation:Reclamation):Observable<any>{
  return this.http.post<any>('http://localhost:8000/reclamation/create', reclamation)
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
