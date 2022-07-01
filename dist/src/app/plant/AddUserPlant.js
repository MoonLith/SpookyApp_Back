"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlant = void 0;
var bson_1 = require("bson");
var checkdata_1 = require("../../util/validator/checkdata");
var PlantUserRepository_1 = __importDefault(require("../../repository/PlantUserRepository"));
var tokenManagement_1 = require("../../util/security/tokenManagement");
var CustomError_1 = require("../../util/error/CustomError");
var UserRepository_1 = __importDefault(require("../../repository/UserRepository"));
var addPlant = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _a, userId, username, _b, deviceId, plantName, plantId, user, err_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log("DATA :", req.body);
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                token = ((_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1]) || "";
                console.log("Token :", token);
                _a = (0, tokenManagement_1.decodeToken)(token), userId = _a.userId, username = _a.username;
                _b = req.body, deviceId = _b.deviceId, plantName = _b.plantName, plantId = _b.plantId;
                return [4 /*yield*/, execute(username, plantName, plantId, deviceId, userId)];
            case 2:
                user = _d.sent();
                console.log(user);
                res.status(201).json({ code: 0, message: "Création de plante réalisée avec succès" });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _d.sent();
                if (err_1 instanceof CustomError_1.CustomError) {
                    console.log(err_1);
                    res.status(400).json({ message: err_1.message, code: err_1.code });
                }
                else {
                    console.log(err_1);
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addPlant = addPlant;
var execute = function (username, plantName, plantId, deviceId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, newPlant, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserRepository_1.default.findByUsername(username)];
            case 1:
                currentUser = _a.sent();
                console.log("User :", currentUser);
                (0, checkdata_1.checkThatUserExistsOrThrow)(currentUser);
                newPlant = {
                    id: new bson_1.ObjectId().toString(),
                    id_plant: plantId,
                    plant_death: false,
                    plant_name: plantName,
                    username: username,
                    id_user: userId,
                    device_id: parseInt(deviceId),
                };
                return [4 /*yield*/, PlantUserRepository_1.default.insert(newPlant)];
            case 2:
                result = _a.sent();
                (0, checkdata_1.checkThatDataisInserted)(result);
                return [2 /*return*/];
        }
    });
}); };
