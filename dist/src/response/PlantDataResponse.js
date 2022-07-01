"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantDataToResponse = void 0;
function plantDataToResponse(data) {
    var _a, _b, _c, _d;
    return {
        temperature: (_a = data.temperature) === null || _a === void 0 ? void 0 : _a.N,
        humidity: (_b = data.humidity) === null || _b === void 0 ? void 0 : _b.N,
        luminosity: (_c = data.luminosity) === null || _c === void 0 ? void 0 : _c.N,
        humidity_soil: (_d = data.humidity_soil) === null || _d === void 0 ? void 0 : _d.N,
    };
}
exports.plantDataToResponse = plantDataToResponse;
