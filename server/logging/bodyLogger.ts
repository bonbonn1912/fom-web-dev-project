import fs from 'fs'
import path from 'path'
import {logger} from '../index'
const logJsonBody = (msg: object, tag: string) =>{
    console.log(msg)
    const date = new Date();
    const ts = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getUTCHours()}-${date.getMinutes()}-${date.getUTCSeconds()}`
    const currPath = path.join(__dirname, "../../bodylogs")
    const fullPath = path.join(currPath, `${ts}-${tag}.json`);
    try{
        fs.writeFileSync(fullPath, JSON.stringify(msg), { flag: "w+"})
    }catch(e){
        console.log(e)
        logger.log("info", "postBody","Could not log body " + JSON.stringify(msg))
    }

}

export default logJsonBody;