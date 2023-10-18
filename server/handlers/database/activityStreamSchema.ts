import mongoose, {Schema} from 'mongoose';

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

const ActivityStreamModel = mongoose.model('AcitivtyStreams', new Schema({
    activity: Number,
    ownerId: Number,
    accountId: Number,
    series: [AcitivtyStreamSchema],
}));

const insertActivityStreamData = async (activityStream: any, ownerId: number, activity: string, accountId: number) => {
    console.log("Inserting activity stream with id: " + activity + " into database");
    try{
        let newActivitySteam = await ActivityStreamModel.create({
            activity: parseInt(activity),
            ownerId: ownerId,
            accountId: accountId,
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
        return await ActivityStreamModel.find({accountId: accountId, activity: parseInt(activityId)});
    }catch(e){
        return null;
    }
}

export {
    insertActivityStreamData,
    getBasicActivityStreamDataForActivityId
}