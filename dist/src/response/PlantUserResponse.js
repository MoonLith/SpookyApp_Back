"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantUserToResponse = void 0;
function plantUserToResponse(plant) {
    return {
        id: plant.id.S,
        username: plant.username.S,
        plant_name: plant.plant_name.S,
        id_plant: plant.id_plant.N,
        plant_death: plant.plant_death.BOOL,
        id_user: plant.id_user.S,
        device_id: plant.device_id.N,
    };
}
exports.plantUserToResponse = plantUserToResponse;
