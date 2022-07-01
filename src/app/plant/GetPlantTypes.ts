import {Request, Response} from "express";
import {decodeToken} from "../../util/security/tokenManagement";
import {CustomError} from "../../util/error/CustomError";
import PlantRepository from "../../repository/PlantRepository";
import UserRepository from "../../repository/UserRepository";
import {checkThatUserExistsOrThrow} from "../../util/validator/checkdata";
import {plantsToResponse} from "../../response/PlantResponse";





export const getPlantTypes = async  (req : Request, res : Response) =>{
    try{
        const token = req.headers.authorization?.split(" ")[1] || "";
        const {userId,username} = decodeToken(token);
        const  result = await execute(userId,username);
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

const execute = async (email :string, username :string): Promise<any> => {

    const currentUser = await UserRepository.findByUsername(username);
    checkThatUserExistsOrThrow(currentUser);


    const result =  await PlantRepository.findFirst100();
    // // return  result;
    // console.log("Result",result['Items'][0])
    return plantsToResponse(result['Items'])



}

