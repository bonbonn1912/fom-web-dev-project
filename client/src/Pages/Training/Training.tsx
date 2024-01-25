import {verifiyBrowser} from "../../helper/verifyBrowser.ts";
import {useEffect, useRef, useState} from "react";
import './pulsate.css'
import Connect from "./Connect.tsx";
import Record from "./Record.tsx";
import {getCoordinatesAsync} from "../../helper/coordinates.ts";


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
            {
                deviceMap?.get('tier-smart-trainer') && characteristicMap?.get('tier-smart-trainer') &&
                // @ts-ignore
               <SmartTrainer device={deviceMap?.get('tier-smart-trainer')} characteristic={characteristicMap.get('tier-smart-trainer')}/>
            }
            {/* @ts-ignore */}
            <button onClick={() => { setScene(2)}}> Stop Recording </button>
            {/* @ts-ignore */}
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
        interface ISmartTrainerProps{
            device: BluetoothDevice;
            characteristic: BluetoothRemoteGATTCharacteristic;
        }

        // @ts-ignore
        const SmartTrainer = ({device,characteristic }: ISmartTrainerProps) =>{
       const [power, setPower] = useState(0);
       const [speed, setSpeed] = useState(0);
         const [cadence, setCadence] = useState(0);
         const [altSpeed, setAltSpeed] = useState(0);
            const [altCadence, setAltCadence] = useState(0);
            const [altPower, setAltPower] = useState(0);


            useEffect(() => {
                characteristic.startNotifications();

                characteristic.addEventListener('characteristicvaluechanged', (event) => {
                    // @ts-ignore
                    const data = event.target.value as DataView;

                    /* NB: speed is only based on the rotation of the smart trainer's resistance unit, meaning that it is easier to get a higher speed
                     *  when using less resistance. If we really want to use speed, we should do a do some trickery using the power, either calculating
                     *  the speed solely on power or some hybrid using the smart trainer speed weighted with the power. I think 100% power based speed
                     *  would be best. */
                    const speed = (data.getUint8(2) + (data.getUint8(3) << 8)) / 100;
                    const cadence = (data.getUint8(4) + (data.getUint8(5) << 8)) / 2;
                    const power = data.getUint8(6) + (data.getUint8(7) << 8);
                    const altSpeed = (data.getUint16(2)) / 100;
                    const altCadence = (data.getUint16(4)) / 2;
                    const altPower = data.getUint16(6);
                    setAltCadence(altCadence)
                    setAltPower(altPower)
                    setAltSpeed(altSpeed)
                    setPower(power);
                    setSpeed(speed);
                    setCadence(cadence);
                })
            },[])
            return (
                <div className="flex flex-col">
                    <p>Power: {power} Watt</p>
                    <p>Alt Power: {altPower} Watt</p>
                    <p>Speed: {speed} Kmh</p>
                    <p>Alt Speed: {altSpeed} Kmh</p>
                    <p>Cadence: {cadence} Rpm</p>
                    <p>Alt Cadence: {altCadence} Rpm</p>
                </div>
            )
        }

export default Trainig
