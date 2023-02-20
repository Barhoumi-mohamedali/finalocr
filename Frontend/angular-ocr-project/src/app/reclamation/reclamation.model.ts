/**export interface Reclamation {
}*/
import { User } from "../auth/auth.model";

export interface listRecs{
    id?:string,
    title: string,
    description: string,
    creationDate: Date, 
    owner: string,  
}


export interface listRecs{
    owner : string
}

export class Reclamation{
    
         id !: string;
         title !: string;
         description !: string;
         creationDate !: Date;
         owner !: any;
       
         constructor(){};
    

    }
    