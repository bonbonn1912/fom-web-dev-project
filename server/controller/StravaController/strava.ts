import CONFIG from "../../config";
import { Request, Response} from "express";
import axios from "axios";

let currentWebHookId = 0;
const verifyStravaToken = async (req: Request, res: Response) => {
    let params = req.query as any;
    let mode = params["hub.mode"];
    let token = params["hub.verify_token"];
    let challenge = params["hub.challenge"];
    console.log("Mode: " + mode)
    console.log("Token: " + token)
    console.log("Challenge: " + challenge)
    if (mode && token) {

        if (mode === 'subscribe' && token === CONFIG.STRAVA_WEBHOOK_VERIFY_TOKEN) {
           res.json({"hub.challenge": challenge});
        } else {

            res.status(403).send()
        }
    }

}

const viewSubscriptions = async () =>{
    const url: string = `${CONFIG.STRAVA_API_BASE_URL}/push_subscriptions?client_id=${CONFIG.STRAVA_CLIENT_ID}&client_secret=${CONFIG.STRAVA_CLIENT_SECRET}`
    const res = await fetch(url, {
        method: "GET",
    })
    const data = await res.json();
    if(data.length !== 0){
        console.log("Subscriptions found")
        currentWebHookId = data[0].id
        console.log("Current webhook id: " + currentWebHookId)
    }
    return data.length !== 0

}


const deleteSubscriptions = async (subscription: number) =>{
    const url: string = `${CONFIG.STRAVA_API_BASE_URL}/push_subscriptions/${subscription}?client_id=${CONFIG.STRAVA_CLIENT_ID}&client_secret=${CONFIG.STRAVA_CLIENT_SECRET}`
    try{
        const res = await fetch(url, {
            method: "DELETE",
        })
        if(res.status !== 204){
            console.log("Error deleting subscription")
        }else{
            console.log("Subscription deleted : " + subscription)
        }
    }catch (err: any){
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
            console.log("Created new webhook with following id: " + data.id);
            currentWebHookId = data.id;
        })
        .catch(error => console.error(error));
}

const initStravaWebhook = async () => {
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