import path from "path";
import fs from "fs";
import sharp from "sharp";
import { Request, Response } from "express";
import {UserHealthData} from "../../handlers/database/mongo";
import { updateSetup} from "../../handlers/database/postgres";
import { logger } from "../../index";

const initialUserSetup = async (req: Request, res: Response) => {
    logger.log('info', 'setup', `Creating user ${req.body.firstName} ${req.body.lastName}`)
    const rootPath = path.resolve(__dirname, '../../../');
    const profileImagesPath = path.join(rootPath, 'profile-images');
    if (!fs.existsSync(profileImagesPath)){
        fs.mkdirSync(profileImagesPath, { recursive: true });
    }
    try{
        const { gender, firstName, lastName, age, weight, ftp, restingHeartRate, maxHeartRate } = req.body;
        const profilePicture = req.file;
        const { displayName, id } = req.user as any;
        const compressedPath = path.join(profileImagesPath, `${displayName}-profile-picture.jpg`);
        await sharp(profilePicture?.buffer)
            .toFile(compressedPath);
        const user = new UserHealthData({
            userId: id,
            firstName: firstName,
            lastName: lastName,
            weight: weight,
            ftp: ftp,
            restingHeartRate: restingHeartRate,
            maxHeartRate: maxHeartRate,
            profilePicture: compressedPath,
        })
        await user.save();
        await updateSetup(id);
        logger.log('info', 'setup', `User ${req.body.firstName} ${req.body.lastName} created`)
        res.status(201).send('User was created.');

    }catch (error) {
        logger.log('error', 'setup', `Could not create user ${req.body.firstName} ${req.body.lastName} : ${error}`)
        res.status(500).send('Could not create user.');
    }
}

export {
    initialUserSetup
}