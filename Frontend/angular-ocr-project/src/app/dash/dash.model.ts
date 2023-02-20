import { User } from "../auth/auth.model";

export interface Dash {
}
export interface countinterface{   
    id?:string,
    docImage: File,
    title: string,
    description: string,
    modelType: string,
    owner: string,
    creationDate: Date,   
    data?:string,
    vitale_data?:string,
    counter: any,
    
}
export interface countinterface{
    owner : string
}