import {Request, Response} from "express";
import {CustomError} from "../../../util/error/CustomError";
import {User} from "../../../models/User";
import {ObjectId} from "bson";
import UserRepository from "../../../repository/UserRepository";
import {encodePassword} from "../../../util/security/passwordManagement";
import {checkThatUserDoesntExistOrThrow} from "../../../util/validator/checkdata";





export const signUp = async  (req : Request, res : Response) =>{
    const { email, username, phoneNumber, password} = req.body
    console.log("DATA :", req.body)
    try{
        const  user = await signUpUser(email,username,password, phoneNumber);
        console.log(user)
        res.status(201).json({code : 0, message : "inscription réalisée avec succès"});
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

const signUpUser = async (email :string, username :string , password :string, phoneNumber :string,): Promise<any> => {


    // const existingUser = await UserRepository.findByEmail(email);
    const existingUserWithUserName = await UserRepository.findByUsername(username);
    console.log("USER", existingUserWithUserName)
    checkThatUserDoesntExistOrThrow(existingUserWithUserName['Items']['0']);

    const hashedPassword = await encodePassword(password)
    const newUser : User = {
        email,username,id : new ObjectId(),password: hashedPassword
    }

    return await UserRepository.insert(newUser);



}

