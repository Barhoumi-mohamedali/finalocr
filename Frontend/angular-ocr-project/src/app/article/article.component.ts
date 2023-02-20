import { Component, OnInit } from '@angular/core';
import { AuthService } from '.././auth/auth.service';
import { Subscription } from 'rxjs';
import { Article ,Comment} from '../article/article.model';
import { ArticleService } from './article.service';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articles:Article[]=[];
  body:any;
  comment=new Comment();
  comments:Comment[]=[];


  isAuthenticated:boolean = false;
  private userSub: Subscription;
  constructor(private authService: AuthService,private articleservice:ArticleService) { }

  
  ngOnInit(): void {
   this.userSub = this.authService.user.subscribe((user)=>{
      this.isAuthenticated =!user? false: true;
    }) 

    this.articleservice.getAll().subscribe(
      (data)=>{this.articles=data.payload;this.articles.forEach(item=>this.articleservice.getComment(item.id).subscribe(data=>{item.comments=data.payload;}));
      ;console.log(this.articles);},
      error=>console.log(error),
      ()=>{
        //this.articles.forEach(item=>this.blogservice.getComment(item.id).subscribe(data=>{this.comments=data.payload;console.log(this.comments)}));
           });

  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }
  addcomment(i:any,idpost:any){
    this.comment.body=this.body;
    this.comment.article=idpost;
    console.log(this.comment);
    this.articleservice.AddComment(this.comment).subscribe(()=>this.articles[i].comments.push(this.comment));

  }
  
  

}