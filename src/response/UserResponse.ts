import {ObjectId} from "bson";
import {User} from "../models/User";


export default interface UserResponse{
    username : string,
    id : string,
}

export function userToUserResponse(user : any): UserResponse{

    return {
        username : user.username.S,
        id : user.id.S
    }
}



