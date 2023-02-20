import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { countinterface } from './dash.model';
import { catchError,tap} from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class DashService {

  document = new BehaviorSubject<Document>(null);

  DJANGO_SERVER: string = "http://127.0.0.1:8000";

  constructor(private http: HttpClient ,private router: Router){


  }

  CountExtract(user_id:string): Observable<any> {
    return this.http.get<countinterface>('http://localhost:8000/documents/'+`${user_id}`)
    .pipe(catchError(this.handleError),tap((res)=>{
        console.log("number of extraction by user"+res)
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
