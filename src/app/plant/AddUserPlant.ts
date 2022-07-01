import {Request, Response} from "express";
import {ObjectId} from "bson";
import {checkThatDataisInserted, checkThatUserExistsOrThrow} from "../../util/validator/checkdata";
import {PlantUser} from "../../models/PlantUser";
import PlantUserRepository from "../../repository/PlantUserRepository";
import {decodeToken} from "../../util/security/tokenManagement";
import {CustomError} from "../../util/error/CustomError";
import UserRepository from "../../repository/UserRepository";





export const addPlant = async  (req : Request, res : Response) =>{
    console.log("DATA :", req.body)
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        console.log("Token :",token)
        const {userId,username} = decodeToken(token);
        const {deviceId, plantName, plantId} = req.body;
        const  user = await execute(username, plantName, plantId, deviceId, userId);
        console.log(user)
        res.status(201).json({code : 0, message : "Création de plante réalisée avec succès"});
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

const execute = async (username : string, plantName : string, plantId : string, deviceId :string, userId : string): Promise<any> => {


    // const existingUser = await UserRepository.findByEmail(email);
    const currentUser = await UserRepository.findByUsername(username);
    console.log("User :",currentUser);
    checkThatUserExistsOrThrow(currentUser);

    const newPlant : PlantUser = {
        id : new ObjectId().toString(),
        id_plant : plantId,
        plant_death : false,
        plant_name : plantName,
        username: username,
        id_user : userId,
        device_id : parseInt(deviceId),

    }
    // console.log("New plant :",newPlant)
    const result = await PlantUserRepository.insert(newPlant);
    checkThatDataisInserted(result);



}

