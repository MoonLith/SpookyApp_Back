import {PlantDataResponse, plantDataToResponse} from "./PlantDataResponse";

export interface PlantHistoryResponse {
    device_data : PlantDataResponse;
    device_id : string;
    sample_time : number;
}

export function plantHistoryToResponse(plant : any): PlantHistoryResponse[]{

    const result: any[] = [];
    plant.forEach((elem : any)=>{
        result.push(convertPlantHistory(elem))
    });
    return  result;

}
export function convertPlantHistory(elem : any){
    return {
        device_data : plantDataToResponse(elem.device_data.M),
        device_id :  elem.device_id.N,
        sample_time : elem.sample_time.N,
    }
}
