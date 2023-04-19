
import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
  email: {type:String , required:true},
  username: String,
  password: String,
},{
  timestamps:{
    createdAt:"createdAt",
    updatedAt:"updatedAt"
  }
});
