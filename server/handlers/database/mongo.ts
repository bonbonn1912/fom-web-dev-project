import { Schema } from 'mongoose';
import * as mongoose from "mongoose";
import CONFIG from "../../config";

const ActivityValueSchema = new Schema({
    elapsed_time: String,
    start_date: String,
    calories: String,
    distance: String
});
export const UserSchema = new Schema({
    userId: Number,
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    weight: Number,
    weightProgress: [Number],
    weightProgressDate: [Date],
    ftp: Number,
    ftpProgress: [Number],
    ftpProgressDate: [Date],
    restingHeartRate: Number,
    restingHeartRateProgress: [Number],
    restingHeartRateProgressDate: [Date],
    maxHeartRate: Number,
    maxHeartRateProgress: [Number],
    maxHeartRateProgressDate: [Date],
    profilePicture: String,
    activityDictionary: {
        type: Map,
        of: ActivityValueSchema,
        required: false,
    }
});



export const UserHealthData = mongoose.model('UserHealthData', UserSchema);

// connecto to mongoDB
mongoose.connect(CONFIG.MONGO_DB_URL+"/Accounts?authSource=admin");