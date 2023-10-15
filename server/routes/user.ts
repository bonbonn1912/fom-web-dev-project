import { Router} from "express";
import {getInfo, getPb} from "../controller/UserInfoController/user";

const userInfoRouter = Router();


userInfoRouter.get("/api/user/dp", getPb );
userInfoRouter.get("/api/user/info", getInfo );

export default userInfoRouter;