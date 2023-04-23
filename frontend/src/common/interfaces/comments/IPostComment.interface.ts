export interface IPostComment {
    _id:string;
    owner:{
        _id:string;
        username:string
    };
    content:string
}