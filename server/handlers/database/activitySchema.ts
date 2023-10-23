import { Schema } from 'mongoose';
import * as mongoose from "mongoose";
import { UserHealthData} from "./mongo";

const BaseActivitySchema = new Schema({
    accountId: Number,
    activity: { type: Number, unique: true},
    ownerId: Number,
    name: String,
    distance: String,
    elapsed_time: String,
    type: String,
    start_date: String,
    map_polyline: String,
    map_summary_polyline: String,
    start_latlng: {type: [Number], required: false},
    end_latlng: {type: [Number], required: false},
    average_speed: Number,
    max_speed: Number,
    max_watts: Number,
    average_watts: Number,
    weighted_average_watts: Number,
    average_heartrate: {type: Number, required: false},
    max_heartrate: {type: Number, required: false},
    calories: Number,
});

export const insertBasicActivityData = async (activity: any, accountId: number) => {
    console.log("Inserting activity with id: " + activity.id + " into database");
    try{
        const { elapsed_time, start_date, calories, distance } = activity;
        const healthDataEntry = { elapsed_time: elapsed_time, start_date: start_date, calories: calories, distance: distance };

        let entry = await UserHealthData.findOneAndUpdate(
            {userId: accountId},
            { $set: { [`activityDictionary.${activity.id}`]: healthDataEntry } },
            { new: true, upsert: true }
        );
        console.log(entry)
        let newActivity = await BasicActivityModel.create({
            accountId: accountId,
            ownerId: activity.athlete.id,
            activity: activity.id,
            name: activity.name,
            distance: activity.distance,
            elapsed_time: activity.elapsed_time,
            type: activity.type,
            start_date: activity.start_date,
            map_polyline: activity.map.polyline,
            map_summary_polyline: activity.map.summary_polyline,
            start_latlng: activity.start_latlng,
            end_latlng: activity.end_latlng,
            average_speed: activity.average_speed,
            max_speed: activity.max_speed,
            max_watts: activity.max_watts,
            average_watts: activity.average_watts,
            weighted_average_watts: activity.weighted_average_watts,
            average_heartrate: activity.average_heartrate,
            max_heartrate: activity.max_heartrate,
            calories: activity.calories,
        })
        return { id: activity.id, success: true }
    }catch(e){
        console.log(e)
        return { id: activity.id, success: false }
    }

}

export const getBasicActivityData = async (accountId: number) => {
    try{

        return await BasicActivityModel.find({accountId: accountId});
    }catch(e){
        return null;
    }
}

export  const getBasicActivityDataForActivityId = async (accountId: number, activityId: number) => {
    try{
        return await BasicActivityModel.find({accountId: accountId, activity: activityId});
    }catch (e){
        return null;
    }
}

const BasicActivityModel = mongoose.model('BasicActivityData', BaseActivitySchema);