import { Request, Response} from "express";
import {UserHealthData} from "../../handlers/database/mongo";
import fs from "fs";
import {findUser, getStravaProps, removeStravaConnection, setStravaConnection} from "../../handlers/database/postgres";
import { IAccount} from "../../types/user";
import {logger} from "../../index";

const getPb = async (req: Request, res: Response) =>{
    logger.log('info', 'user', `Getting PB for user ${JSON.stringify(req.user)}`)
    const { id } = req.user as any;
    try{
        let user = await UserHealthData.findOne({userId: id})
        const { profilePicture } = user as any;

        res.sendFile(profilePicture);
    }
    catch (error) {
        logger.log('info', 'error', `Could not find pb for user ${JSON.stringify(req.user)}`)
        res.status(500).send('Could not find user.');
    }
}

const getInfo = async (req: Request, res: Response) =>{
    const { id } = req.user as any;
    try{
        logger.log('info', 'user', `Serving info for user ${JSON.stringify(req.user)}`)
        let user = await UserHealthData.findOne({userId: id})
        const { firstName, lastName, weight, ftp, restingHeartRate, maxHeartRate } = user as any;
        res.status(200).json({ displayName: firstName + " " + lastName,firstName: firstName,lastName: lastName, weight: weight, ftp: ftp, restingHeartRate: restingHeartRate, maxHeartRate: maxHeartRate});
    }
    catch (error) {
        logger.log('info', 'error', `Could not find info for user ${JSON.stringify(req.user)}`)
        res.status(500).send('Could not find user.');
    }
}

const getDashboardInfo = async (req: Request, res: Response) =>{
    const { id, username } = req.user as any;
    try{

        let user = await UserHealthData.findOne({userId: id})
        const { firstName, lastName, profilePicture, weight, ftp, maxHeartRate, restingHeartRate } = user as any;
        let imageAsBase64 = fs.readFileSync(profilePicture, 'base64');
        let dbUser = await findUser(username, "NOT_VALID_EMAIL");
        logger.log('info', 'user', `Serving dashboard info for user ${JSON.stringify(req.user)}`)
        res.status(200).json({ displayName: firstName + " " + lastName, profilePicture: imageAsBase64, weight: weight, ftp: ftp, maxHeartRate: maxHeartRate, restingHeartRate: restingHeartRate});
    }
    catch (error) {
        logger.log('info', 'error', `Could not find dashboard info for user ${JSON.stringify(req.user)}`)
        res.status(500).send('Could not find user.');
    }
}

const getStravaInfo = async (req: Request, res: Response) =>{
    logger.log('info', 'strava', `Getting Strava info for user ${JSON.stringify(req.user)}`)
    const { id, username } = req.user as any;
    try{
        let dbUser = await findUser(username, "NOT_VALID_EMAIL");
        const { isConnectedWithStrava } = dbUser as unknown as IAccount
        if(!isConnectedWithStrava){
            logger.log('info', 'strava', `User ${JSON.stringify(req.user)} is not connected with Strava`)
            res.status(204).send();
        }else{
            let stravaProps = await getStravaProps(id);
            const { connectedSince } = stravaProps as any;
            logger.log('info', 'strava', `User ${JSON.stringify(req.user)} is connected with Strava since ${connectedSince}`)
            res.status(200).json({ connectedSince: connectedSince});
        }

    }
    catch (error) {
        logger.log('info', 'error', `Could not find Strava info for user ${JSON.stringify(req.user)}`)
        res.status(500).send('Could not find user.');
    }
}

const deleteStravaConnection = async (req: Request, res: Response) =>{
    logger.log('info', 'strava', `Deleting Strava connection for user ${JSON.stringify(req.user)}`)
    const { id } = req.user as any;
    try{

        await setStravaConnection(id, false);
        await removeStravaConnection(id);
        logger.log('info', 'strava', `Strava connection deleted for user ${JSON.stringify(req.user)}`)
        res.status(204).send();
    }
    catch (error) {
        logger.log('info', 'error', `Could not delete Strava connection for user ${JSON.stringify(req.user)}`)
        res.status(500).send('Could not find user.');
    }
}

const getDashboardInfoExtended = async (req: Request, res: Response) =>{
   const { id } = req.user as any;
    try{
        const user = await UserHealthData.findOne({userId: id})
        return res.status(200).json(user);
    }catch (error) {
        res.status(500).send('Could not find user.');
    }
}






export {
    getPb,
    getInfo,
    getDashboardInfo,
    getStravaInfo,
    deleteStravaConnection,
    getDashboardInfoExtended
}