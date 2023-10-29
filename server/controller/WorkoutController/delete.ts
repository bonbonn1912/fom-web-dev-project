import {getOneActivityData} from "../../handlers/database/activitySchema";
import { Request, Response} from "express";
import {removeActivityFromBothCollections} from "../../handlers/database/deleteActivity";
import {removeActivityFromEquipment} from "../../handlers/database/postgres";

const deleteWorkout = async (req: Request, res : Response) => {

    const { id } = req.user as any;
    const { workoutId } = req.query as any;
    console.log("Deleting workout with id: " + workoutId + " from database for user with id: " + id);
    try {
        const activity = await getOneActivityData(workoutId);
        if (activity) {
            let distance = activity.distance as any;
            distance = parseInt((distance/1000).toFixed(0));
            await removeActivityFromEquipment(workoutId, distance);
            await removeActivityFromBothCollections(workoutId, id);
            res.status(200).send();
        }
        else {
            res.status(400).send();
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
}

export {
    deleteWorkout
}