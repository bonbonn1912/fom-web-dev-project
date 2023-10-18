import CONFIG from "../../config";
import {getBasicActivityData, getBasicActivityDataForActivityId} from "../../handlers/database/activitySchema";
import {getBasicActivityStreamDataForActivityId} from "../../handlers/database/activityStreamSchema";

const getDetailedWorkoutForUser = async (req: any, res: any) => {
    const { id } = req.user as any;
    const activityId = req.query.id as any;
    console.log("Get detailed data for activity with id: " + activityId);
    try{
        const activity = await getBasicActivityDataForActivityId(id, activityId);
        const activityStream = await getBasicActivityStreamDataForActivityId(id, activityId);
        res.status(200).json([activity, activityStream])

    }catch (e){
        res.status(500).send(e);
    }
}

export {
    getDetailedWorkoutForUser
}