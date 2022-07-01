"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var ts_dotenv_1 = require("ts-dotenv");
exports.env = (0, ts_dotenv_1.load)({
    PORT: Number,
    JWTSECRET: String,
    ACCESSKEYID: String,
    SECRETACCESSKEY: String,
});
