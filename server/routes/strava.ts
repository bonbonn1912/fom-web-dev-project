import { Router } from 'express';
import { verifyStravaToken } from '../controller/StravaController/strava';

const stravaRouter = Router();

stravaRouter.get('/strava', verifyStravaToken);


export default stravaRouter;
