import CONFIG from "../../config";
import { Request, Response} from "express";
import {logger} from '../../index'

let currentWebHookId = 0;
const verifyStravaToken = async (req: Request, res: Response) => {
    logger.log('info', 'strava', `Verifying Strava token`)
    let params = req.query as any;
    let mode = params["hub.mode"];
    let token = params["hub.verify_token"];
    let challenge = params["hub.challenge"];
    console.log("Mode: " + mode)
    console.log("Token: " + token)
    console.log("Challenge: " + challenge)
    if (mode && token) {

        if (mode === 'subscribe' && token === CONFIG.STRAVA_WEBHOOK_VERIFY_TOKEN) {
            logger.log('info', 'strava', `Strava token verified`)
           res.json({"hub.challenge": challenge});
        } else {
            logger.log('error', 'strava', `Strava token not verified`)
            res.status(403).send()
        }
    }

}

const viewSubscriptions = async () =>{
    logger.log('info', 'strava', `Viewing Strava subscriptions`)
    const url: string = `${CONFIG.STRAVA_API_BASE_URL}/push_subscriptions?client_id=${CONFIG.STRAVA_CLIENT_ID}&client_secret=${CONFIG.STRAVA_CLIENT_SECRET}`
    const res = await fetch(url, {
        method: "GET",
    })
    const data = await res.json();
    if(data.length !== 0){
        logger.log('info', 'strava', `Found Strava subscription ${data[0].id}`)
        currentWebHookId = data[0].id
    }
    return data.length !== 0

}


const deleteSubscriptions = async (subscription: number) =>{
    logger.log('info', 'strava', `Deleting Strava subscription ${subscription}`)
    const url: string = `${CONFIG.STRAVA_API_BASE_URL}/push_subscriptions/${subscription}?client_id=${CONFIG.STRAVA_CLIENT_ID}&client_secret=${CONFIG.STRAVA_CLIENT_SECRET}`
    try{
        const res = await fetch(url, {
            method: "DELETE",
        })
        if(res.status !== 204){
            logger.log('error', 'strava', `Could not delete Strava subscription ${subscription}`)
            console.log("Error deleting subscription")
        }else{
            logger.log('info', 'strava', `Deleting Strava subscription ${subscription}`)
            console.log("Subscription deleted : " + subscription)
        }
    }catch (err: any){
        logger.log('error', 'strava', `Could not delete Strava subscription ${subscription}`)
        console.log(err)
    }
}
/*
const deleteSubscriptions = async (subscription: number) => {
    const url: string = `${CONFIG.STRAVA_API_BASE_URL}/push_subscriptions/${subscription}`;

    console.log(url);

    const params = {
        client_id: CONFIG.STRAVA_CLIENT_ID,
        client_secret: CONFIG.STRAVA_CLIENT_SECRET
    };

    console.log(params);

    try {
        const res = await axios.delete(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: params
        });
    } catch (err: any) {
        console.log(err);
    }
}; */

const subscribeToStrava = async () => {
    logger.log('info', 'strava', `Subscribing to Strava`)
    const url = 'https://www.strava.com/api/v3/push_subscriptions';
    const formData = new FormData();
    formData.append('client_id', CONFIG.STRAVA_CLIENT_ID);
    formData.append('client_secret', CONFIG.STRAVA_CLIENT_SECRET);
    formData.append('callback_url', CONFIG.NGROK_URL + '/strava');
    formData.append('verify_token', CONFIG.STRAVA_WEBHOOK_VERIFY_TOKEN);
    console.log(formData)
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            logger.log('info', 'strava', `Subscribed to Strava. Webhook id: ` + data.id)
            currentWebHookId = data.id;
        })
        .catch(error => console.error(error));
}

const initStravaWebhook = async () => {
    logger.log('info', 'strava', `Initialize Strava Webhook`);
    const isAlreadySubscribed = await viewSubscriptions();
    if(!isAlreadySubscribed){
       subscribeToStrava();
    }
}

export {
    verifyStravaToken,
    initStravaWebhook,
    deleteSubscriptions
}