import CONFIG from "../../config";
import {getBasicActivityData, getBasicActivityDataForActivityId} from "../../handlers/database/activitySchema";
import {getBasicActivityStreamDataForActivityId} from "../../handlers/database/activityStreamSchema";
import zlib from "zlib";

const getDetailedWorkoutForUser = async (req: any, res: any) => {
    const { id } = req.user as any;
    const activityId = req.query.id as any;
    console.log("Get detailed data for activity with id: " + activityId);
    try{
        const activity = await getBasicActivityDataForActivityId(id, activityId);
        const activityStream = await getBasicActivityStreamDataForActivityId(id, activityId);
        const activtiyStreamString = JSON.stringify(activityStream);
        const activityStreamGzip = zlib.gzipSync(activtiyStreamString);
        const compressed_base64_str = activityStreamGzip.toString('base64');
        // gzip activityStream
        // const activityStreamGzip = await gzip(activityStream);

        res.status(200).json([activity, compressed_base64_str])

    }catch (e){
        res.status(500).send(e);
    }
}

export {
    getDetailedWorkoutForUser
}