import {BasicActivityModel} from "./activitySchema";
import { ActivityStreamModel } from "./activityStreamSchema";
import { UserHealthData} from "./mongo";

const removeActivityFromBothCollections = async (activityId: number, userId: number) => {
    try{

        const [ res1, res2, res3 ] = await Promise.all([BasicActivityModel.deleteOne({activity: activityId}),
        ActivityStreamModel.deleteOne({activity: activityId}),
        UserHealthData.findOneAndUpdate({
            userId: userId,
        },
        {
          $unset: {
            [`activityDictionary.${activityId}`]: 1,
          }
        }
        )]);
        return true;
    }
    catch (e){
        console.log(e);
        return false;
    }
}

export {
    removeActivityFromBothCollections
};