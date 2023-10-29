import { Request, Response} from "express";
import { getStravaTokenForOwnerId} from "../../handlers/shared/strava.postgres";
import {IWorkoutPost} from "../../types/workout";
import {getNewTokenSet, getStravaActivity, getStravaActivityStream} from "../../handlers/shared/strava.api";
import {
    getBasicActivityData,
    getOneActivityData,
    insertBasicActivityData
} from "../../handlers/database/activitySchema";
import { updateStravaTokenForOwnerId} from "../../handlers/shared/strava.postgres";
import { logger} from "../../index";
import {insertActivityStreamData} from "../../handlers/database/activityStreamSchema";
import logJsonBody from "../../logging/bodyLogger";
import {updateEquipmentDistance} from "../../handlers/database/postgres";

const addWorkout = async (req: Request, res: Response) => {
  //  logJsonBody(req.body, "stravaAddWorkout")
    logger.log('info', 'workout', `Adding workout for user ${req.body.owner_id}`)
    const { owner_id, object_type, object_id, aspect_type, event_time, updates } = req.body as IWorkoutPost;
    try{
        let { accountId,access_token, expires_at, refresh_token } = await getStravaTokenForOwnerId(owner_id) as any;
        const rt = refresh_token;
        if(expires_at < Date.now()){
            logger.log('info', 'workout', `Refreshing token for user ${req.body.owner_id}`)
            let { access_token, expires_at, refresh_token } = await getNewTokenSet(rt) as any;
            await updateStravaTokenForOwnerId(owner_id, access_token, expires_at, refresh_token);
        }
        let activity = await getStravaActivity(object_id.toString(), access_token) as any;
       // logJsonBody(activity, "stravaActivity")
        if(activity.type === "VirtualRide" || activity.type === "Ride"){
            let activityStream = await getStravaActivityStream(object_id.toString(), access_token) as any;
            const { id, success } = await insertBasicActivityData(activity, accountId);
            const { stream_id, stream_success } = await insertActivityStreamData(activityStream, owner_id, id, accountId);
            const equipped = await updateEquipmentDistance(accountId, activity.distance, activity.id);
            if(!success && !stream_success){
                logger.log('info', 'workout', `Could not insert activity with id ${id} for user ${owner_id}`)
            }else{
                logger.log('info', 'workout', `Inserted activity with id ${id} for user ${owner_id}`)
            }
            res.status(200).send()

        }else{
            logger.log('info', 'workout', `Activity with id ${object_id} is not a ride or virtual ride`)
            res.status(200).send()
        }
    }catch (e: any){
        console.log(e.toString());
        logger.log("error", "workout", `Could not add workout for user with error ${e.toString()}`)
    }
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

const getWorkoutMetaData = async (req: Request, res: Response) => {
    logger.log('info', 'workout', `Fetching workout metadata for user ${JSON.stringify(req.user)}`)
   // const { id } = req.user as any;
    const { id} = req.query as any;
    try{
        const activity = await getOneActivityData( id);
        res.status(200).json(activity)

    }catch (e){
        res.status(500).send(e);
    }
}

export { addWorkout, getWorkoutForUser, getWorkoutMetaData }