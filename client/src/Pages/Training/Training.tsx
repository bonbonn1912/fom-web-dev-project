import { verifiyBrowser} from "../../helper/verifyBrowser.ts";
import {useState} from "react";
import './pulsate.css'
import Connect from "./Connect.tsx";
import Record from "./Record.tsx";



const Trainig = () =>{
    const [device, setDevice] = useState<BluetoothDevice | null>(null);
    const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);

    const browser = verifiyBrowser();
    if(!browser) return <div>Your Browser is Not supported</div>

    const deviceHandler = (device: BluetoothDevice | null, characteristic: BluetoothRemoteGATTCharacteristic | null) => {
        if(!device || !characteristic) return;
        setDevice(device);
        setCharacteristic(characteristic);
        setScene(1)
    }




    const [scene, setScene] = useState(0);

    if(scene == 0){
        return <Connect deviceHandler={deviceHandler}/>
    }
    if(scene == 1){
        return <div className="flex flex-col">
            {/* @ts-ignore */}
            <Record device={device} characteristic={characteristic}/>
            <button onClick={() => { setScene(0)}}> Back </button>
        </div>
    }


}

export default Trainig
