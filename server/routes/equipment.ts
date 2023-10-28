import { Router} from "express";
import {
    addEquipment,
    changeEquipmentStatusForUser,
    deleteEquipmentForUser,
    getEquipmentForUser
} from "../controller/EquipmentController/equipment";


const equipmentRouter = Router();

equipmentRouter.post("/api/equipment", addEquipment);

equipmentRouter.get("/api/equipment", getEquipmentForUser);

equipmentRouter.delete("/api/equipment", deleteEquipmentForUser)

equipmentRouter.post("/api/equipment/status", changeEquipmentStatusForUser)



export default equipmentRouter