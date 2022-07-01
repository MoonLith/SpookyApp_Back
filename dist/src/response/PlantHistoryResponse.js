"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPlantHistory = exports.plantHistoryToResponse = void 0;
var PlantDataResponse_1 = require("./PlantDataResponse");
function plantHistoryToResponse(plant) {
    var result = [];
    plant.forEach(function (elem) {
        result.push(convertPlantHistory(elem));
    });
    return result;
}
exports.plantHistoryToResponse = plantHistoryToResponse;
function convertPlantHistory(elem) {
    return {
        device_data: (0, PlantDataResponse_1.plantDataToResponse)(elem.device_data.M),
        device_id: elem.device_id.N,
        sample_time: elem.sample_time.N,
    };
}
exports.convertPlantHistory = convertPlantHistory;
