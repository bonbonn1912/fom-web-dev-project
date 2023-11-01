import { verifiyBrowser} from "../../helper/verifyBrowser.ts";
import {useState} from "react";
import './pulsate.css'
import Connect from "./Connect.tsx";
import Record from "./Record.tsx";



const Trainig = () =>{
    const [deviceMap, setDeviceMap] = useState<Map<string, BluetoothDevice> | null>(null);
    const [characteristicMap, setCharacteristicMap] = useState<Map<string, BluetoothRemoteGATTCharacteristic> | null>(null);

    const browser = verifiyBrowser();
    if(!browser) return <div>Your Browser is Not supported</div>

    const deviceHandler = (deviceMap: Map<string, BluetoothDevice> | null, characteristicMap: Map<string, BluetoothRemoteGATTCharacteristic> | null) => {
        if(!deviceMap || !characteristicMap) return;
        // @ts-ignore
        setDeviceMap(deviceMap);
        // @ts-ignore
        setCharacteristicMap(characteristicMap);
        setScene(1)
    }




    const [scene, setScene] = useState(0);

    if(scene == 0){
        return <Connect deviceHandler={deviceHandler}/>
    }
    if(scene == 1){
        return <div className="flex flex-col">
            {
                deviceMap?.get('heart-rate-monitor') && characteristicMap?.get('heart-rate-monitor') &&
                // @ts-ignore
                <Record device={deviceMap.get('heart-rate-monitor')} characteristic={characteristicMap.get('heart-rate-monitor')}/>
            }
            {/* @ts-ignore */}
            <button onClick={() => { setScene(0)}}> Back </button>
        </div>
    }


}

export default Trainig
