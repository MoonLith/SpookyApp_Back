import {Router} from "express";
import userRouter from "./userRoutes";
import plantRouter from "./plantRoutes";



const router = Router();
router.use('/user', userRouter);
router.use('/plant', plantRouter);

export default router;
