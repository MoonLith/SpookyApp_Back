"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantsToResponse = exports.plantToResponse = void 0;
function plantToResponse(plant) {
    return {
        id: plant.id.N,
        name_flower: plant.name_flower.S,
        origin: plant.origin.S,
        category: plant.category.S,
        blooming: plant.blooming.S,
        sunlight: plant.sunlight.S,
        max_light_mmol: plant.max_light_mmol.N,
        min_light_mmol: plant.min_light_mmol.N,
        max_light_lux: plant.max_light_lux.N,
        min_light_lux: plant.min_light_lux.N,
        max_temp: plant.max_temp.N,
        min_temp: plant.min_temp.N,
        max_env_humid: plant.max_env_humid.N,
        min_env_humid: plant.min_env_humid.N,
        max_soil_moist: plant.max_soil_moist.N,
        min_soil_moist: plant.min_soil_moist.N,
        max_soil_ec: plant.max_soil_ec.N,
        min_soil_ec: plant.min_soil_ec.N,
        periode: plant.periode.S,
        luminosite: plant.luminosite.S,
    };
}
exports.plantToResponse = plantToResponse;
function plantsToResponse(plants) {
    var result = [];
    // console.log("Plants : ", plants)
    plants.forEach(function (elem, index) {
        try {
            result.push(plantToResponse(elem));
        }
        catch (e) {
        }
    });
    return result;
}
exports.plantsToResponse = plantsToResponse;
