import { Router} from "express";
import multer from "multer";

import { initialUserSetup} from "../controller/SetupController/setup";

const setupRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

setupRouter.use(upload.single('profilePicture'));
setupRouter.get("/status", (req, res) => {
    res.status(200).json({message: "ok"});

});

setupRouter.post("/api/account/setup",initialUserSetup );


export default setupRouter;