"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateAccessToken = void 0;
var config_1 = require("../config");
var checkdata_1 = require("../validator/checkdata");
var jwt = require('jsonwebtoken');
function generateAccessToken(user) {
    return jwt.sign({ userId: user.id, username: user.username }, config_1.env.JWTSECRET, { expiresIn: '3600s' });
}
exports.generateAccessToken = generateAccessToken;
function decodeToken(token) {
    (0, checkdata_1.checkThatUserIsConnected)(token);
    return jwt.decode(token);
}
exports.decodeToken = decodeToken;
