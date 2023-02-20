export class Article{
    id :any;
    title :any;
    headerimage :any;
    author :any;
    content :any ;
    created_at :any;
    likes :any;
    comments:Comment[]=[];

}
export class ResponseArticle{
    status:any;
    payload:Article[];


}
export class Comment{
    id:any;
    date_added :any;
    body :any;
    article:any;
    
}
export class ResponseComment{
    status:any;
    payload:Comment[];


}