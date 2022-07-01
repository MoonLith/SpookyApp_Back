import express, {Request, Router} from "express";

import {env} from "./util/config";
import router from "./routes/routes";

const path = require('path')



const init = () => {

    const app = express();

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


    app.get('/', (req : any, res: any) => {
        console.log('Happy Tree');
        res.status(200).send('Happy Tree Server working..');
    });

    app.use(express.json());

    app.use(router);
    // app.use('/pugs', express.static(path.join(__dirname.replace("src",""), 'uploads')))
    // app.use('/pugs', express.static(path.join("", 'uploads')))

    const httpServer =  require("http").createServer(app);

    httpServer.listen(env.PORT, () => {
        console.log(`Listening on port ${env.PORT}`);
    });









}

export {init}
