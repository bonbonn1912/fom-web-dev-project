import { Router} from "express";
import {getWorkoutForUser} from "../controller/WorkoutController/workout";
import {getDetailedWorkoutForUser} from "../controller/WorkoutController/activityStream";

const workoutRouter = Router();

workoutRouter.get("/api/workout/base-summary", getWorkoutForUser);

workoutRouter.get("/api/workout/detailed-summary", getDetailedWorkoutForUser);


export default workoutRouter;