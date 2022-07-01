import {Request, Response} from "express";
import {ObjectId} from "bson";
import {checkThatDataisInserted, checkThatUserExistsOrThrow} from "../../util/validator/checkdata";
import {PlantUser} from "../../models/PlantUser";
import PlantUserRepository from "../../repository/PlantUserRepository";
import {decodeToken} from "../../util/security/tokenManagement";
import {CustomError} from "../../util/error/CustomError";
import UserRepository from "../../repository/UserRepository";





export const killPlant = async  (req : Request, res : Response) =>{
    console.log("DATA :", req.body)
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        const {userId,username} = decodeToken(token);
        const {plantUserId} = req.body;
        const  user = await execute(username, userId, plantUserId);
        res.status(200).json({code : 0, message : "Suppréssion de plante réalisée avec succès"});
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

const execute = async (username : string, userId : string, plantUserId : string): Promise<any> => {


    // const existingUser = await UserRepository.findByEmail(email);
    const currentUser = await UserRepository.findByUsername(username);
    checkThatUserExistsOrThrow(currentUser);

    const result = await PlantUserRepository.killPlant(plantUserId, true);
    console.log("Result", result);



}

