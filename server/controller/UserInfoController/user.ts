import { Request, Response} from "express";
import {UserHealthData} from "../../handlers/database/mongo";
import fs from "fs";
import {findUser, getStravaProps, removeStravaConnection, setStravaConnection} from "../../handlers/database/postgres";
import { IAccount} from "../../types/user";

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

const getDashboardInfo = async (req: Request, res: Response) =>{
    const { id, username } = req.user as any;
    console.log(req.user)
    try{

        let user = await UserHealthData.findOne({userId: id})
        const { firstName, lastName, profilePicture } = user as any;
        let imageAsBase64 = fs.readFileSync(profilePicture, 'base64');
        let dbUser = await findUser(username, "NOT_VALID_EMAIL");

        res.status(200).json({ displayName: firstName + " " + lastName, profilePicture: imageAsBase64});
    }
    catch (error) {
        console.error(error)
        res.status(500).send('Could not find user.');
    }
}

const getStravaInfo = async (req: Request, res: Response) =>{
    const { id, username } = req.user as any;
    try{
        let dbUser = await findUser(username, "NOT_VALID_EMAIL");
        const { isConnectedWithStrava } = dbUser as unknown as IAccount
        if(!isConnectedWithStrava){
            res.status(204).send();
        }else{
            let stravaProps = await getStravaProps(id);
            const { connectedSince } = stravaProps as any;
            res.status(200).json({ connectedSince: connectedSince});
        }

    }
    catch (error) {
        res.status(500).send('Could not find user.');
    }
}

const deleteStravaConnection = async (req: Request, res: Response) =>{
    const { id } = req.user as any;
    try{

        await setStravaConnection(id, false);
        await removeStravaConnection(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send('Could not find user.');
    }
}




export {
    getPb,
    getInfo,
    getDashboardInfo,
    getStravaInfo,
    deleteStravaConnection
}