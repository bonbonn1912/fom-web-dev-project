import { Router} from "express";
import {getWorkoutForUser, getWorkoutMetaData} from "../controller/WorkoutController/workout";
import {getDetailedWorkoutForUser} from "../controller/WorkoutController/activityStream";
import {deleteWorkout} from "../controller/WorkoutController/delete";

const workoutRouter = Router();

workoutRouter.get("/api/workout/base-summary", getWorkoutForUser);

workoutRouter.get("/api/workout/detailed-summary", getDetailedWorkoutForUser);

workoutRouter.get("/api/workout/metadata", getWorkoutMetaData);

workoutRouter.delete("/api/workout/delete", deleteWorkout)


export default workoutRouter;