import { verifiyBrowser} from "../../helper/verifyBrowser.ts";
import {useRef, useState} from "react";
import './pulsate.css'
import Connect from "./Connect.tsx";
import Record from "./Record.tsx";
import {getCoordinatesAsync} from "../../helper/coordinates.ts";
import {MapForRecord} from "../Workout/Map.tsx";
import {LatLng} from "leaflet";



const Trainig = () =>{
    const [deviceMap, setDeviceMap] = useState<Map<string, BluetoothDevice> | null>(null);
    const [characteristicMap, setCharacteristicMap] = useState<Map<string, BluetoothRemoteGATTCharacteristic> | null>(null);
    const [heartRate, setHeartRate] = useState<number[]>([]);
    const [seconds, setSeconds] = useState<number[]>([]);
    // @ts-ignore
    const [coordinates, setCoordinates] = useState<number[][]>();
    const coordiantesRef= useRef<number[][]>([[50,8]]);
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

    const emitData = async (hr: any, sec: any) => {
       const coordinates = await getCoordinatesAsync();
       // @ts-ignore
       const lat = coordinates.coords.latitude ;
         // @ts-ignore
         const long = coordinates.coords.longitude;
       // @ts-ignore
       // set coordiantes ref
        console.log(coordiantesRef.current)
           coordiantesRef.current = [...coordiantesRef.current, [lat, long]];
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
            {/* @ts-ignore */}
            <MapForRecord decodedPolyLine={coordiantesRef.current} width={200} height={100} controllables={true} zIndex={10}/>
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
                <div className="flex flex-row">
                    {
                        coordiantesRef.current?.slice(1).map((cor, index) => {
                            return <div className="ml-1" key={index}>Lat {cor[0]}; long: {cor[1]}</div>
                        })
                    }
                </div>
                {/* @ts-ignore */}

            </div>
        )

    }


}

export default Trainig
