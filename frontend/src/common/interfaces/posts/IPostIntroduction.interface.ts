export interface IPostIntroduction {
    _id: string;
    title:string;
    content : string ;
    owner : {
        _id:string;
        username:string
    };
    images : [string];
    


}