import { Request, Response} from "express";
import {UserHealthData} from "../../handlers/database/mongo";

const getPb = async (req: Request, res: Response) =>{
    const { id } = req.user as any;
    try{
        let user = await UserHealthData.findOne({userId: id})
        const { profilePicture } = user as any;
        res.sendFile(profilePicture);
    }
    catch (error) {
        res.status(500).send('Could not find user.');
    }
}

const getInfo = async (req: Request, res: Response) =>{
    const { id } = req.user as any;
    try{
        let user = await UserHealthData.findOne({userId: id})
        const { firstName, lastName, weight, ftp, restingHeartRate, maxHeartRate } = user as any;
        res.status(200).json({ displayName: firstName + " " + lastName});
    }
    catch (error) {
        res.status(500).send('Could not find user.');
    }
}




export {
    getPb,
    getInfo
}