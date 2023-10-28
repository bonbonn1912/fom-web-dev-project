import { NextFunction, Request, Response } from "express";
import {changeEquipmentStatus, deleteEquipment, getEquipment, insertEquipment} from "../../handlers/database/postgres";

const addEquipment = async (req: Request, res: Response) => {
    const { name, notice, distance, maxDistance, isActive, type } = req.body;
    const { id } = req.user as any;
    try {
        await insertEquipment(id, name, notice, distance, maxDistance, type, isActive);
        return res.status(200).send("ok");
    }catch(error){
        console.log(error)
        return res.status(500).send("error");
    }
}

const getEquipmentForUser = async (req: Request, res: Response) => {
    const { id } = req.user as any;
    try {
        const equipment = await getEquipment(id);
        return res.status(200).send(equipment);
    }catch(error){
        console.log(error)
        return res.status(500).send("error");
    }
}

const deleteEquipmentForUser = async (req: Request, res: Response) => {
    const { equipmentId } = req.query as any;
    try {
        const equipment = await deleteEquipment(parseInt(equipmentId));
        return res.status(200).send(equipment);
    }catch(error){
        console.log(error)
        return res.status(500).send("error");
    }
}

const changeEquipmentStatusForUser = async (req: Request, res: Response) => {
    const { equipmentId, isActive } = req.body;
    try {
        const equipment = await changeEquipmentStatus(parseInt(equipmentId), isActive);
        return res.status(200).send(equipment);
    }catch(error){
        console.log(error)
        return res.status(500).send("error");
    }
}

export {
    addEquipment,
    getEquipmentForUser,
    deleteEquipmentForUser,
    changeEquipmentStatusForUser
}