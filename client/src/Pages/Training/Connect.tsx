import {useEffect, useState} from "react";
import {GiHeartBeats} from "react-icons/gi";

interface IConnectProps {
    deviceHandler: (device: BluetoothDevice | null, characteristic: BluetoothRemoteGATTCharacteristic | null) => void;
}

const Connect = ({ deviceHandler} : IConnectProps) =>{
    const [isBlueToothConnected, setIsBlueToothConnected] = useState(false);
    const [heartRate, setHeartRate] = useState(0);
    const [device, setDevice] = useState<BluetoothDevice | null>(null);
    const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    useEffect(() => {
        console.log('useEffect');
    }, []);
    const connectToBluetoothDevice = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }]
            });
            const server = await device.gatt?.connect();
            const service = await server?.getPrimaryService('heart_rate');
            const characteristic = await service?.getCharacteristic('heart_rate_measurement');
            await characteristic?.startNotifications();
            setDevice(device);
            setIsBlueToothConnected(true);
            setIsButtonDisabled(false)
            // @ts-ignore
            setCharacteristic(characteristic);
            characteristic?.addEventListener('characteristicvaluechanged', (event) => {
                // @ts-ignore
                setHeartRate(event.target.value.getUint8(1));
            });
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    };




    return (
        <div className="bg-white h-screen flex flex-col items-center">
            <h1 className="text-2xl mb-1">Verbundene Geräte</h1>
            <p>Bitte verbinden Sie mindestens einen Sensor um ein Training aufzuzeichnen</p>

            <div className="sm:flex sm:space-x-4 sm:mt-16 mt-5">
                <div className={`bg-blue-500 w-48 h-48 flex flex-col items-center justify-center rounded-xl ${isBlueToothConnected? "animate-pulse bg-red-500" : ""}`}>
                    <div className="text-5xl mb-3"><GiHeartBeats/></div>
                    <p className="text-xl">Heart Rate Monitor</p>
                    {
                        isBlueToothConnected ? <div className="mt-3 py-2"> {heartRate} bpm</div> :  <button onClick={connectToBluetoothDevice} className="mt-3 text-black font-semibold hover:bg-blue-400 px-5 py-2 rounded">Suchen</button>
                    }
                </div>

                <div className="sm:mt-0 mt-5 bg-blue-500 w-48 h-48 flex flex-col items-center justify-center rounded-xl">
                    <div className="text-5xl mb-3">🚴</div>
                    <p className="text-xl">Powermeter</p>
                    <button className="bg-white mt-3 text-blue-500 px-5 py-2 rounded disabled">Suchen</button>
                </div>
            </div>

            <button disabled={isButtonDisabled} onClick={() =>{deviceHandler(device, characteristic)}} className="bg-blue-600 disabled:bg-blue-300 text-white mt-5 px-10 py-2 rounded">Workout Starten</button>
        </div>
    );
}

export default Connect