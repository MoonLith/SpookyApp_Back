import {Router} from "express";

import {getPlantTypes} from "../app/plant/GetPlantTypes";
import {getUserPlant} from "../app/plant/GetUserPlant";
import {getPlantTypeByName} from "../app/plant/GetPlantTypeByName";
import {getPlantTypeById} from "../app/plant/GetPlantTypeById";
import {getPlantHistoryById} from "../app/plant/GetPlantHistory";
import {addPlant} from "../app/plant/AddUserPlant";
import {killPlant} from "../app/plant/KillUserPlant";
import {getPlantHistoriesById} from "../app/plant/GetPlantHistories";


const plantRouter = Router();

const typeOfPlantPath = "/gettypes";
const typeOfPlantByNamePath = "/gettypebyname";
const typeOfPlantByIdPath = "/gettypebyid";

const plantUserPath = "/get";
const addPlantUserPath="/add";
const killPlantUserPath="/kill";

const planthistoryPath = "/history";
const planthistoriesPath = "/histories"
plantRouter.get(typeOfPlantPath,getPlantTypes)
plantRouter.get(plantUserPath,getUserPlant)
plantRouter.get(typeOfPlantByNamePath,getPlantTypeByName)
plantRouter.get(typeOfPlantByIdPath,getPlantTypeById)
plantRouter.get(planthistoryPath,getPlantHistoryById)
plantRouter.get(planthistoriesPath,getPlantHistoriesById)
plantRouter.post(addPlantUserPath,addPlant)
plantRouter.put(killPlantUserPath,killPlant)

export default plantRouter;
