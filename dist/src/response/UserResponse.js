"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userToUserResponse = void 0;
function userToUserResponse(user) {
    return {
        username: user.username.S,
        id: user.id.S
    };
}
exports.userToUserResponse = userToUserResponse;
