import mongoose, {Schema} from 'mongoose';
import {UserHealthData} from "./mongo";

 const AcitivtyStreamSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    data: {
        type: [Number],
        required: true,
    },
});

export const ActivityStreamModel = mongoose.model('AcitivtyStreams', new Schema({
    activity: Number,
    ownerId: Number,
    accountId: Number,
    timeAboveFtp: Number,
    series: [AcitivtyStreamSchema],
}));

const insertActivityStreamData = async (activityStream: any, ownerId: number, activity: string, accountId: number) => {
    console.log("Inserting activity stream with id: " + activity + " into database");
    const user = await UserHealthData.findOne({userId: accountId});
    const { ftp } = user as any;
    const wattsArray = activityStream.filter((element: any) => element.type === "watts")[0].data;
    const wattsAboveFtp = wattsArray.filter((element: any) => element > ftp);
    const timeAboveFtp = wattsAboveFtp.length;
    try{
        let newActivitySteam = await ActivityStreamModel.create({
            activity: parseInt(activity),
            ownerId: ownerId,
            accountId: accountId,
            timeAboveFtp: timeAboveFtp,
            series: activityStream
        })
        return { stream_id: activity, stream_success: true }
    }catch(e){
        return { stream_id: activity, stream_success: false }
    }
}
const getBasicActivityStreamDataForActivityId = async (accountId: number, activityId: string) => {
    console.log("Account id " + accountId + " activity id: " + activityId);
    console.log(parseInt(activityId));
    try{
        return await ActivityStreamModel.findOne({accountId: accountId, activity: parseInt(activityId)});
    }catch(e){
        return null;
    }
}

export {
    insertActivityStreamData,
    getBasicActivityStreamDataForActivityId
}