import CONFIG from "../../config";

const getStravaActivity = async (id: string, accessToken: number) => {
    console.log("Fetching activity with id: " + id);
    const url = `${CONFIG.STRAVA_API_BASE_URL}/activities/${id}?include_all_efforts=true`;
    try{
        let response = await fetch(url, {
            method: "GET",
            headers: {
                // add bearer
                Authorization: `Bearer ${accessToken.toString()}`
            }
        })
        return await response.json();
    }catch(e){
        return null;
    }

}

const getNewTokenSet = async (refreshToken: string) => {
    try{
        let response = await fetch(`${CONFIG.STRAVA_API_BASE_URL}/oauth/token?client_id=${CONFIG.STRAVA_CLIENT_ID}&client_secret=${CONFIG.STRAVA_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refreshToken}`, {
            method: "POST",
        })
        return await response.json();
    }catch (e){
        console.log(e)
        return null;
    }

}

export {
    getNewTokenSet, getStravaActivity
}