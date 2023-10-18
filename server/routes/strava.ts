import { Router } from 'express';
import { verifyStravaToken } from '../controller/StravaController/strava';
import { addWorkout} from "../controller/WorkoutController/workout";

const stravaRouter = Router();

stravaRouter.get('/strava', verifyStravaToken);

stravaRouter.post("/strava", addWorkout)


export default stravaRouter;
