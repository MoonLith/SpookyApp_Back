import {ObjectId} from "bson";

export interface User {
    id:ObjectId;
    username:string;
    password:string;
    email :string;
}
