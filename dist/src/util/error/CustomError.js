"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
var util_1 = require("../util");
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(code, msg, payload) {
        var _this = _super.call(this, msg) || this;
        _this.code = util_1.errorCode;
        _this.payload = null;
        _this.code = code;
        _this.payload = payload;
        Object.setPrototypeOf(_this, CustomError.prototype);
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
