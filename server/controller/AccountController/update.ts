import {Request, Response} from "express";
import { UserHealthData } from '../../handlers/database/mongo'

const updateAccountInformation = async (req: Request, res: Response) =>{
    const { id } = req.user as any;
    const { firstName, lastName, weight, ftp, restingHeartRate, maxHeartRate } = req.body as any
    try {
        const updateFields: any = {};
        const pushFields: any = {};

        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (weight) {
            updateFields.weight = weight;
            pushFields.weightProgress = weight;
            pushFields.weightProgressDate = new Date();
        }
        if (ftp) {
            updateFields.ftp = ftp;
            pushFields.ftpProgress = ftp;
            pushFields.ftpProgressDate = new Date();
        }
        if (restingHeartRate) {
            updateFields.restingHeartRate = restingHeartRate;
            pushFields.restingHeartRateProgress = restingHeartRate;
            pushFields.restingHeartRateProgressDate = new Date();
        }
        if (maxHeartRate) {
            updateFields.maxHeartRate = maxHeartRate;
            pushFields.maxHeartRateProgress = maxHeartRate;
            pushFields.maxHeartRateProgressDate = new Date();
        }

        const options = { new: true }; // for sucess message
        const userToUpdate = await UserHealthData.findOneAndUpdate(
            { userId: id },
            {
                $set: updateFields,
                $push: pushFields
            },
            options
        );

        if (userToUpdate) {
            res.status(200).send("Benutzer erfolgreich aktualisiert.");
        } else {
            res.status(404).send("Benutzer nicht gefunden.");
        }
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Benutzers:", error);
        res.status(500).send("Interner Serverfehler");
    }
}

export {
    updateAccountInformation
}