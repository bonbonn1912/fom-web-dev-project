import {useEffect, useState} from "react";
import  HeartRateChart from "./HeartRateChart.tsx"
import {AiFillHeart} from "react-icons/ai";

interface IRecordProps {
    device: BluetoothDevice;
    characteristic: BluetoothRemoteGATTCharacteristic;
}

const Record = ({device,characteristic}: IRecordProps) =>{
    const [heartRates, setHeartRates] = useState<number[]>(new Array(60).fill(0));
    const [seconds, setSeconds] = useState<number[]>(new Array(60).fill(0));
    const [counter, setCounter] = useState(0);
    const [heartRate, setHeartRate] = useState(0);
    const [coordinates] = useState<number[][]>([]);
    let letUpdate = true;
    const initDevice = async () => {
        await characteristic.stopNotifications();
        characteristic.removeEventListener('characteristicvaluechanged', () => { /* Handler */ });
        characteristic.startNotifications().then((charDevice) =>{
            console.log("add eventlistener")
            charDevice.addEventListener('characteristicvaluechanged', handleNotifications);
    }   )};
    useEffect(() => {
        initDevice();
    }, []);
    const handleNotifications = async (event: any) => {
        if(letUpdate){
            letUpdate = false;
         //   const coordinates  = await getCoordinatesAsync();
            let heartRate = event.target.value.getUint8(1);
            updateHeartRate(heartRate);
            setHeartRate(heartRate);

            setTimeout(() => {
                letUpdate = true;
            }, 4000)
        }
    }
    /*
    const record = async () => {
        setInterval(async () => {
            const coordinates  = await getCoordinatesAsync();
           console.log(coordinates)
            console.log(heartRate)
        }, 2000);
    } */




    const updateHeartRate =(newRate: number) => {
        let newArray = [newRate, ...heartRates];
        console.log(newArray)
        let newSeconds = [counter, ...seconds];
        setCounter(counter + 1);
        if (newArray.length > 60) {
            const nt = newArray.shift();
            console.log(nt)
        }
        setSeconds(newSeconds)
        setHeartRates(newArray);

    };
    const disconnectBluetoothDevice = () => {
        if (characteristic) {
            characteristic.stopNotifications();
            characteristic.removeEventListener('characteristicvaluechanged', () => { /* Handler */ });
        }
    };

    useEffect(() => {
        return () => {
           disconnectBluetoothDevice();
        }
    }, []);
    return (
        <div className="grid grid-cols-3">
            <div className="sm:col-span-1 col-span-full">
                <div className="flex flex-col w-full justify-center items-center h-full">
                    <h1 className="font-light">Device: { device.name}</h1>
                    <div>
                        <AiFillHeart className="heart" size={90}/>
                    </div>

                    <div>
                        {heartRate} bpm
                    </div>
                    <div>
                        {coordinates.length > 0 && coordinates[coordinates.length-1][0]}
                    </div>
                </div>

            </div>
            <div className="sm:col-span-2 col-span-full">
            <div className="w-full h-[350px]">
                <HeartRateChart heartRate={heartRates} seconds={seconds}/>
            </div>
            </div>
        </div>
    )
}

export default Record;