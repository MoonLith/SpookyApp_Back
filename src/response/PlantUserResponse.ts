import UserResponse from "./UserResponse";

export interface PlantUserResponse {
    id : string;
    username : string;
    plant_name : string;
    id_plant : string;
    plant_death : boolean;
    id_user : string;
    device_id : number;
}

export function plantUserToResponse(plant : any): PlantUserResponse{

    return {
        id : plant.id.S,
        username :plant.username.S,
        plant_name :plant.plant_name.S,
        id_plant :plant.id_plant.N,
        plant_death : plant.plant_death.BOOL,
        id_user : plant.id_user.S,
        device_id :  plant.device_id.N,

    }
}
