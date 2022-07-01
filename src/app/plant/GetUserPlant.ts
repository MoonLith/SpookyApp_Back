import {Request, Response} from "express";
import {decodeToken} from "../../util/security/tokenManagement";
import {CustomError} from "../../util/error/CustomError";
import PlantRepository from "../../repository/PlantRepository";
import PlantUserRepository from "../../repository/PlantUserRepository";
import {plantUserToResponse} from "../../response/PlantUserResponse";
import UserRepository from "../../repository/UserRepository";
import {checkThatDataExist, checkThatDataisInserted, checkThatUserExistsOrThrow} from "../../util/validator/checkdata";





export const getUserPlant = async  (req : Request, res : Response) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        const {userId,username} = decodeToken(token);
        const  result = await execute(username);
        console.log(result)
        res.status(200).json({code : 0, message : "Plante utilisateur :", payload : result});
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

const execute = async (username :string): Promise<any> => {


    const currentUser = await UserRepository.findByUsername(username);
    checkThatUserExistsOrThrow(currentUser);

    const result =  await PlantUserRepository.findByUsername(username);
    console.log("Result",result);
    if(!result['Items'][0]){
        return {};
    }
    return plantUserToResponse(result['Items'][0]);



}

