import { Router} from "express";
import multer from "multer";

import { initialUserSetup} from "../controller/AccountController/setup";
import {updateAccountInformation, updatePassword} from "../controller/AccountController/update";
import { deleteAccount} from "../controller/AccountController/delete";

const setupRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

setupRouter.use(upload.single('profilePicture'));
setupRouter.get("/status", (req, res) => {
    res.status(200).json({message: "ok"});

});

setupRouter.post("/api/account/setup",initialUserSetup );
setupRouter.post("/api/account/update", updateAccountInformation)
setupRouter.post("/api/account/update-password", updatePassword)
setupRouter.delete("/api/account/delete", deleteAccount)


export default setupRouter;