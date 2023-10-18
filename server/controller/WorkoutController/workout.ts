import { Request, Response} from "express";
import { getStravaTokenForOwnerId} from "../../handlers/shared/strava.postgres";
import {IWorkoutPost} from "../../types/workout";
import { getNewTokenSet, getStravaActivity} from "../../handlers/shared/strava.api";
import {getBasicActivityData, insertBasicActivityData} from "../../handlers/database/activitySchema";
import { updateStravaTokenForOwnerId} from "../../handlers/shared/strava.postgres";
import { logger} from "../../index";

const addWorkout = async (req: Request, res: Response) => {
    logger.log('info', 'workout', `Adding workout for user ${req.body.owner_id}`)
    const { owner_id, object_type, object_id, aspect_type, event_time, updates } = req.body as IWorkoutPost;

    let { accountId,access_token, expires_at, refresh_token } = await getStravaTokenForOwnerId(owner_id) as any;
    const rt = refresh_token;
    if(expires_at < Date.now()){
       logger.log('info', 'workout', `Refreshing token for user ${req.body.owner_id}`)
       let { access_token, expires_at, refresh_token } = await getNewTokenSet(rt) as any;
       await updateStravaTokenForOwnerId(owner_id, access_token, expires_at, refresh_token);
    }
    let activity = await getStravaActivity(object_id.toString(), access_token) as any;
    const { id, success } = await insertBasicActivityData(activity, accountId);
    if(!success){
        logger.log('info', 'workout', `Could not insert activity with id ${id} for user ${owner_id}`)
    }else{
        logger.log('info', 'workout', `Inserted activity with id ${id} for user ${owner_id}`)
    }
    res.status(200).send()
}

const getWorkoutForUser = async (req: Request, res: Response) => {
    logger.log('info', 'workout', `Fetching workouts for user ${JSON.stringify(req.user)}`)
    const { id } = req.user as any;
    try{
        const activities = await getBasicActivityData(id);
        res.status(200).json(activities)

    }catch (e){
        res.status(500).send(e);
    }

}

export { addWorkout, getWorkoutForUser }