"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var express_1 = __importDefault(require("express"));
var config_1 = require("./util/config");
var routes_1 = __importDefault(require("./routes/routes"));
var path = require('path');
var init = function () {
    var app = (0, express_1.default)();
    // let finalPath = path.basename(__dirname);
    // finalPath = path.join("/usr/src/app/", 'uploads');
    //Client Side
    // app.get('/file', (req : any, res: any) => {
    //     console.log("DIR : ",__dirname)
    //
    //     console.log("DIR  2: ",finalPath)
    //
    //     res.sendFile(__dirname + '/index.html');
    // });
    // //
    app.get('/', function (req, res) {
        console.log('Happy Tree');
        res.status(200).send('Happy Tree Server working..');
    });
    app.use(express_1.default.json());
    app.use(routes_1.default);
    // app.use('/pugs', express.static(path.join(__dirname.replace("src",""), 'uploads')))
    // app.use('/pugs', express.static(path.join("", 'uploads')))
    var httpServer = require("http").createServer(app);
    httpServer.listen(config_1.env.PORT, function () {
        console.log("Listening on port ".concat(config_1.env.PORT));
    });
};
exports.init = init;
