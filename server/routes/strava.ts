import { Router, Request, Response, NextFunction } from 'express';
import { verifyStravaToken } from '../controller/StravaController/strava';
import { addWorkout} from "../controller/WorkoutController/workout";

const stravaRouter = Router();

const delayMiddleware = (req: Request, res: Response, next: NextFunction) => {
    setTimeout(next, 10000);
    res.status(200).send();
}

stravaRouter.get('/strava', verifyStravaToken);

stravaRouter.post("/strava", delayMiddleware,addWorkout)






export default stravaRouter;
