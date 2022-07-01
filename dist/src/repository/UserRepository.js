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
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util/util");
var config_1 = require("../util/config");
var AWS = require('aws-sdk');
var accessKeyId = config_1.env.ACCESSKEYID;
var secretAccessKey = config_1.env.SECRETACCESSKEY;
var region = "us-east-1";
// Set the region
AWS.config.update({ region: 'us-east-1' });
// Create the DynamoDB service object
var dynamoDB = new AWS.DynamoDB({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
});
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.insert = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    TableName: 'users',
                    Item: {
                        'id': { S: user.id.toString() },
                        'username': { S: user.username },
                        'password': { S: user.password },
                        'email': { S: user.email }
                    }
                };
                dynamoDB.putItem(params, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                        return util_1.errorCode;
                    }
                    else {
                        console.log("Success", data);
                        return util_1.successCode;
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UserRepository.findByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var params, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            ProjectionExpression: "username, id,password",
                            KeyConditionExpression: 'username = :username',
                            ExpressionAttributeValues: {
                                ':username': { 'S': username }
                            },
                            TableName: 'users',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dynamoDB.query(params).promise()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, util_1.errorCode];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //TODO Ajouter le checker email
    UserRepository.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var params, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            FilterExpression: 'email = :email',
                            ExpressionAttributeValues: {
                                ':email': { 'S': email }
                            },
                            TableName: 'users',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dynamoDB.scan(params).promise()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [2 /*return*/, util_1.errorCode];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserRepository;
}());
exports.default = UserRepository;