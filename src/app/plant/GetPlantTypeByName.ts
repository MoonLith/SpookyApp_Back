import {Request, Response} from "express";
import {decodeToken} from "../../util/security/tokenManagement";
import {CustomError} from "../../util/error/CustomError";
import PlantRepository from "../../repository/PlantRepository";
import UserRepository from "../../repository/UserRepository";
import {checkThatUserExistsOrThrow} from "../../util/validator/checkdata";
import {plantToResponse} from "../../response/PlantResponse";





export const getPlantTypeByName = async  (req : Request, res : Response) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        const {userId,username} = decodeToken(token);
        const {plantName} = req.query;
        const  result = await execute(userId,username,<string>plantName);
        console.log(result)
        res.status(200).json({code : 0, message : "résultat des plantes", payload : result});
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

const execute = async (email :string, username :string, plantName :string): Promise<any> => {

    const currentUser = await UserRepository.findByUsername(username);
    checkThatUserExistsOrThrow(currentUser);
    const result =  await PlantRepository.findByName(plantName);
    return plantToResponse(result['Items'][0]);



}

