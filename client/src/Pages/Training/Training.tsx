import { verifiyBrowser} from "../../helper/verifyBrowser.ts";
import {useState} from "react";
import './pulsate.css'
import Connect from "./Connect.tsx";
import Record from "./Record.tsx";



const Trainig = () =>{
    const [deviceMap, setDeviceMap] = useState<Map<string, BluetoothDevice> | null>(null);
    const [characteristicMap, setCharacteristicMap] = useState<Map<string, BluetoothRemoteGATTCharacteristic> | null>(null);
    const [heartRate, setHeartRate] = useState<number[]>([]);
    const [seconds, setSeconds] = useState<number[]>([]);
    const browser = verifiyBrowser();
    if(!browser) return <div>Your Browser is Not supported</div>

    const deviceHandler = (deviceMap: Map<string, BluetoothDevice> | null, characteristicMap: Map<string, BluetoothRemoteGATTCharacteristic> | null) => {
        // get permission for coordinates
        console.log("deviceHandler")

        if(!deviceMap || !characteristicMap) return;
        // @ts-ignore
        setDeviceMap(deviceMap);
        // @ts-ignore
        setCharacteristicMap(characteristicMap);
        navigator.geolocation.getCurrentPosition(
            () => {
               setScene(1)
            },
            (error) => {
                // Fehlerbehandlung
                console.error("Fehler beim Abruf der Geoposition: ", error);
            },
            {
                timeout: 10000,
                maximumAge: 0,
                enableHighAccuracy: true,
            }
        );

    }

    const emitData = (hr: any, sec: any) => {
        console.log("received data from child prop")
       setHeartRate(hr);
       setSeconds(sec);
    }

    const changeScene = (scene: number) => {
        setScene(scene);
    }

    const [scene, setScene] = useState(0);

    if(scene == 0){
        return <Connect deviceHandler={deviceHandler}/>
    }
    if(scene == 1){
        console.log("hier")
        return <div className="flex flex-col">
            {
                deviceMap?.get('heart-rate-monitor') && characteristicMap?.get('heart-rate-monitor') &&
                // @ts-ignore
                <Record sceneHandler={changeScene} emitData={emitData} device={deviceMap.get('heart-rate-monitor')} characteristic={characteristicMap.get('heart-rate-monitor')}/>
            }
            {/* @ts-ignore */}
            <button onClick={() => { setScene(2)}}> Stop Recording </button>
        </div>
    }
    if(scene == 2){
        return(
            <div>
                <div className="flex flex-row">{
                    heartRate.map((num, index) => {
                        return <div className="ml-1" key={index}>{num}</div>
                    })
                }</div>
                <div className="flex flex-row">
                        {
                            seconds.filter(el => el != 0).map((num, index) => {
                                return <div className="ml-1" key={index}>{num}</div>
                            })
                        }
                   </div>
            </div>
        )

    }


}

export default Trainig
