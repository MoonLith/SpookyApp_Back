import {Request, Response} from "express";
import {decodeToken} from "../../util/security/tokenManagement";
import {CustomError} from "../../util/error/CustomError";
import UserRepository from "../../repository/UserRepository";
import {checkThatUserExistsOrThrow} from "../../util/validator/checkdata";
import PlantHistoryRepository from "../../repository/PlantHistoryRepository";
import {convertPlantHistory, plantHistoryToResponse} from "../../response/PlantHistoryResponse";





export const getPlantHistoriesById = async  (req : Request, res : Response) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        const {userId,username} = decodeToken(token);
        const {deviceId} = req.query;
        const  result = await execute(userId,username,<string>deviceId);
        console.log(result)
        res.status(200).json({code : 0, message : "résultat des données de plante par Id", payload : result});
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

const execute = async (userdId :string, username :string, deviceId :string): Promise<any> => {

    const currentUser = await UserRepository.findByUsername(username);

    checkThatUserExistsOrThrow(currentUser);

    const result =  await PlantHistoryRepository.findByIdWeekly(deviceId);

    console.log("Result",result);
    return plantHistoryToResponse(result['Items']).reverse();


}

