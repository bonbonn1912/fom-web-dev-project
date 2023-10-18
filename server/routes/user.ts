import { Router} from "express";
import {
    deleteStravaConnection,
    getDashboardInfo,
    getInfo,
    getPb,
    getStravaInfo
} from "../controller/UserInfoController/user";

const userInfoRouter = Router();


userInfoRouter.get("/api/user/dp", getPb );
userInfoRouter.get("/api/user/info", getInfo );
userInfoRouter.get("/api/user/dashboard", getDashboardInfo );
userInfoRouter.get("/api/user/strava-info", getStravaInfo );
userInfoRouter.delete("/api/user/strava-delete", deleteStravaConnection);

export default userInfoRouter;