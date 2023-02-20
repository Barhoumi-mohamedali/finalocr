import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, ResponseComment, ResponseArticle  ,Comment} from '../../app/article/article.model';
const link_api="http://127.0.0.1:8000/article/";
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<ResponseArticle>{

    return this.httpClient.get<ResponseArticle>(link_api)

    
  }
  AddComment(comment:Comment): Observable<Comment>{
    return this.httpClient.post<Comment>(link_api+"post_comment",comment) 
  }

  getComment(idpost:any): Observable<ResponseComment>{

    return this.httpClient.get<ResponseComment>(link_api+"post_comments/"+idpost)

    
  }
  
  

}
