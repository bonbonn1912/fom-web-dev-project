import {useEffect, useState} from "react";
import  HeartRateChart from "./HeartRateChart.tsx"
import {AiFillHeart} from "react-icons/ai";

interface IRecordProps {
    device: BluetoothDevice;
    characteristic: BluetoothRemoteGATTCharacteristic;
}

const Record = ({device,characteristic}: IRecordProps) =>{
    const [heartRates, setHeartRates] = useState<number[]>(new Array(60).fill(0));
    const [seconds, setSeconds] = useState(new Array(60).fill(0));
    const [counter, setCounter] = useState(0);
    const [heartRate, setHeartRate] = useState(0);
    characteristic.addEventListener('characteristicvaluechanged', (event) => {
        // @ts-ignore
        updateHeartRate(event.target.value.getUint8(1));
        // @ts-ignore
        setHeartRate(event.target.value.getUint8(1));
    });
    const updateHeartRate = (newRate: number) => {
            const newArray = [...heartRates, newRate];
            const newSeconds = [...seconds, counter];
            setCounter(counter + 1);
            if (newArray.length > 60) {
                newArray.shift();
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