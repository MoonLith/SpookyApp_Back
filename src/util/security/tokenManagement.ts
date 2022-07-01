import {env} from "../config";
import {checkThatUserIsConnected} from "../validator/checkdata";
import {User} from "../../models/User";
import UserResponse from "../../response/UserResponse";

const jwt = require('jsonwebtoken');

export function  generateAccessToken(user : UserResponse){

    return jwt.sign({userId : user.id, username : user.username}, env.JWTSECRET, { expiresIn: '3600s' });
}


export function decodeToken(token : string){

    checkThatUserIsConnected(token)
    return jwt.decode(token);
}
