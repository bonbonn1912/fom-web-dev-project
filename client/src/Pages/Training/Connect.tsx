import {useEffect, useState} from "react";
import {GiHeartBeats} from "react-icons/gi";
import {SiSmartthings} from "react-icons/si";

interface IConnectProps {
    deviceHandler: (device: Map<string, BluetoothDevice> | null, characteristic: Map<string, BluetoothRemoteGATTCharacteristic> | null) => void;
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const initSensor = [
    {
        name: 'Heart Rate Monitor',
        id: 'heart-rate-monitor',
        description: 'Supports all heart rate monitors that follow the BLE Spec. for Heart Rate Profile 1.0',
        isConnected: false,
        buttonAction: 0,
        serviceName: 'heart_rate',
        characteristicName: 'heart_rate_measurement',
    },
    {
        name: 'Powermeter/Cadence',
        id: 'tier-powermeter',
        description: 'Currently only supports powemeters that follow the BLE Spec. Cycling Power Service 1.1',
        isConnected: false,
        buttonAction: 1,
        serviceName: 'cycling_power',
        characteristicName: 'cycling_power_measurement',
    },
    {
        name: 'Smart Trainer',
        id: 'tier-smart-trainer',
        description: 'Currently only supports smart trainers that follow the BLE Spec. Fitness Machine Service 1.0',
        isConnected: false,
        buttonAction: 2,
        serviceName: 'cycling_power',
        characteristicName: 'cycling_power'
    },
]

const heartRateFilter: IFilterProps = { services: ['heart_rate'] };
const cyclingPowerFilter: IFilterProps = { services: ['cycling_power'] };
const fitnessMachineFilter: IFilterProps = { services: ['fitness_machine'] };

interface IFilterProps{
    services: [string];
}

const Connect = ({ deviceHandler} : IConnectProps) =>{
    const [sensor, setSensor] = useState(initSensor);
    const [heartRate, setHeartRate] = useState(0);
    const [device, setDevice] = useState<BluetoothDevice | null>(null);
    const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);
    const [deviceMap, setDeviceMap] = useState<Map<string, BluetoothDevice>>(new Map());
    const [characteristicMap, setCharacteristicMap] = useState<Map<string, BluetoothRemoteGATTCharacteristic>>(new Map());
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    useEffect(() => {
        console.log(characteristic);
        console.log('useEffect');
    }, []);

    const returnFilter = (buttonAction: number): IFilterProps => {
        switch (buttonAction) {
            case 0:
                return heartRateFilter;
            case 1:
                return cyclingPowerFilter;
            case 2:
                return fitnessMachineFilter;
        }
        return heartRateFilter;
    }

    const getStatusComponent = (id: string) => {
        switch(id){
            case 'heart-rate-monitor':
                return <HeartRateStatus/>
            case 'tier-powermeter':
                return <div>Powermeter</div>
            case 'tier-smart-trainer':
                return <div><SmartTrainerStatus/></div>
        }
    }

    const HeartRateStatus = () =>{
        return (
            <div className="flex h-full flex-col">
                <p className="w-full font-light">{device?.name}</p>
                <div className="flex flex-row h-full items-center">
                    <GiHeartBeats className="animate-pulse" color="red" size={60}/>
                    <p className="font-semibold ml-2"> {heartRate} bpm</p>
                </div>
            </div>
        )
    }
    const SmartTrainerStatus = () =>{
        return (
            <div className="flex h-full flex-col">
                <p className="w-full font-light">{device?.name}</p>
                <div className="flex flex-row h-full items-center">
                    <SiSmartthings className="animate-pulse" size={60}/>
                </div>
            </div>
        )
    }
    // @ts-ignore
    const connectToBluetoothDevice = async (filter: IFilterProps, id:string, serviceName: string, characteristicName: string) => {
        console.log(filter);
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['cycling_power'] }],
                optionalServices: ['fitness_machine'],
            });
            setIsButtonDisabled(false)
            setSensor(sensor.map((sensor) => sensor.id == id ? {...sensor, isConnected: true} : sensor));
            const server = await device.gatt?.connect();
            const fitnessMachineService = await server?.getPrimaryService('fitness_machine');
            const characteristic = await fitnessMachineService?.getCharacteristic('indoor_bike_data');
         //   const service = await server?.getPrimaryService(serviceName);
          //  const characteristic = await service?.getCharacteristic(characteristicName);
          //  await characteristic?.startNotifications();
            setDevice(device);
            setDeviceMap(deviceMap.set(id, device));

            // @ts-ignore
            setCharacteristicMap(characteristicMap.set(id, characteristic));
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
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-x-2 gap-y-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {sensor.map((device) => (
                <div
                    key={device.id}
                    className={classNames(
                        device.isConnected ? 'ring-2 ring-green-400' : 'ring-1 ring-gray-200',
                        'rounded-3xl p-8 xl:p-10'
                    )}
                >
                    <div className="flex items-center justify-between gap-x-4">
                        <h3
                            id={device.id}
                            className={classNames(
                                'text-lg font-semibold leading-8 text-gray-900'
                            )}
                        >
                            {device.name}
                        </h3>
                    </div>
                    {!device.isConnected && (
                        <>
                            <p className="mt-4 text-sm leading-6 text-gray-600">{device.description}</p>
                            <button
                                onClick={() => connectToBluetoothDevice(returnFilter(device.buttonAction), device.id, device.serviceName, device.characteristicName)}
                                aria-describedby={device.id}
                                className={classNames(
                                    device.isConnected
                                        ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                                        : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                                    'mt-6 w-full block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                )}
                            >
                                Connect
                            </button>
                        </>)
                    }
                    {device.isConnected && (
                        <>
                        {
                            getStatusComponent(device.id)
                        }
                        </>
                    )
                    }
                </div>
            ))}
            <div className="grid md:grid-cols-3 grid-cols-1">
            </div>
            <button
                disabled={isButtonDisabled}
                className="bg-blue-400 disabled:bg-blue-200  w-full block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {

                    deviceHandler(deviceMap, characteristicMap)
                }}
            >
                Next
            </button>
        </div>
    );
}

export default Connect