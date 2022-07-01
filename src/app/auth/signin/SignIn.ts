import {Request, Response} from "express";
import {CustomError} from "../../../util/error/CustomError";
import {User} from "../../../models/User";
import {ObjectId} from "bson";
import UserRepository from "../../../repository/UserRepository";
import {
    checkThatPasswordsAreEqualsOrThrow,
    checkThatUserExistsOrThrow,
    checkThatUserSignInCredentialsOrThrow
} from "../../../util/validator/checkdata";
import {errorCode, successCode} from "../../../util/util";
import {generateAccessToken} from "../../../util/security/tokenManagement";
import BaseResponse from "../../../response/BaseResponse";
import UserResponse, {userToUserResponse} from "../../../response/UserResponse";





export const signIn = async  (req : Request, res : Response) =>{
    const { username, password} = req.body
    console.log("DATA :", req.body)
    try{
        const  user = await execute(username,password);
        console.log(user)
        res.status(200).json({code : successCode, message : "Connexion avec succès",payload : user, token : generateAccessToken(user)});
    }catch (err : any){

        if(err instanceof CustomError){
            console.log(err);
            res.status(400).json({message : err.message, code : err.code});
        }
        else{
            console.log(err);
        }

    }

}

const execute = async (username :string , password :string): Promise<UserResponse> => {

    checkThatUserSignInCredentialsOrThrow(username,password);
    const existingUser = await UserRepository.findByUsername(username);
    if(existingUser == errorCode) console.log("Error !")
    console.log("Result ",existingUser['Items'][0])
    const passwordCrypt = existingUser['Items'][0].password.S
    await checkThatUserExistsOrThrow(existingUser);
    await  checkThatPasswordsAreEqualsOrThrow(password, passwordCrypt)

    return userToUserResponse(existingUser['Items'][0]);



}

