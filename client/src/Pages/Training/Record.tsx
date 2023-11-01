import {useEffect, useRef, useState} from "react";
import HeartRateChart from "./HeartRateChart.tsx"
import {AiFillHeart} from "react-icons/ai";

interface IRecordProps {
    device: BluetoothDevice;
    characteristic: BluetoothRemoteGATTCharacteristic;
    emitData: (hr: any, sec: any) => void;
}


const Record = ({device,characteristic, emitData}: IRecordProps) =>{
    const secondRef = useRef<number>(0);
    const secondsRefArray = useRef<number[]>(new Array(60).fill(0));
    const [counter, setCounter] = useState(0);
    const heartRateRef = useRef(0)
    const heartRatesRef = useRef<number[]>([]);
    const intervalRef = useRef<any>(null);

    const [realHeartRate, setRealHeartRate] = useState<number[]>([]);

    const initDevice = async () => {
        await characteristic.stopNotifications();
        characteristic.removeEventListener('characteristicvaluechanged', () => { /* Handler */ });
        characteristic.startNotifications().then((charDevice) =>{
            charDevice.addEventListener('characteristicvaluechanged', handleNotifications);
    }   )};

    const stopDevice = async () => {

        await characteristic.stopNotifications();
        characteristic.removeEventListener('characteristicvaluechanged', () => { /* Handler */ });
    }

    useEffect(() => {
        initDevice();
        initIntervall();
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);  // Stopt den Interval
            }
            stopDevice();
        }
    }, []);
    const initIntervall = () =>{
        intervalRef.current  = setInterval(() => {
            updateHeartRate(heartRateRef.current)
        }, 1000);
    }
    console.log("rerender")

    const handleNotifications = async (event: any) => {
        heartRateRef.current = event.target.value.getUint8(1);
      //  heartRatesRef.current = [...heartRatesRef.current, heartRate];
        // @ts-ignore
     //  setHeartRate;
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
        // @ts-ignore
        heartRatesRef.current = [...heartRatesRef.current, newRate];
        secondRef.current = secondRef.current + 1;
        heartRateRef.current = newRate;
        secondsRefArray.current = [...secondsRefArray.current, secondRef.current];
        emitData(heartRatesRef.current, secondsRefArray.current);
        setRealHeartRate([...realHeartRate, newRate])
        setCounter(counter + 1);
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
                        {heartRateRef.current} bpm
                    </div>
                </div>

            </div>
            <div className="sm:col-span-2 col-span-full">
            <div className="w-full h-[350px]">
              <HeartRateChart heartRate={heartRatesRef.current} seconds={secondsRefArray.current}/>
            </div>
            </div>

        </div>
    )
}

export default Record;