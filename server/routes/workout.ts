import { Router} from "express";
import {getWorkoutForUser} from "../controller/WorkoutController/workout";

const workoutRouter = Router();

workoutRouter.get("/api/workout/base-summary", getWorkoutForUser);


export default workoutRouter;