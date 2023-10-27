import {getOneActivityData} from "../../handlers/database/activitySchema";
import { Request, Response} from "express";
import {removeActivityFromBothCollections} from "../../handlers/database/deleteActivity";

const deleteWorkout = async (req: Request, res : Response) => {

    const { id } = req.user as any;
    const { workoutId } = req.query as any;
    console.log("Deleting workout with id: " + workoutId + " from database for user with id: " + id);
    try {
        const activity = await getOneActivityData(workoutId);
        if (activity) {
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