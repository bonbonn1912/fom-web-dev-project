import { useState} from 'react';

const Training = () => {
    const [heartRate, setHeartRate] = useState(0);
    const [device, setDevice] = useState<BluetoothDevice | null>(null);
    const [characteristic, setCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);

    const connectToBluetoothDevice = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }]
            });
            device.addEventListener('gattserverdisconnected', () => {
                console.log('Device disconnected');
                setDevice(null);
                setCharacteristic(null);
            });
            // @ts-ignore
            const server = await device.gatt.connect();
            const service = await server.getPrimaryService('heart_rate');
            const characteristic = await service.getCharacteristic('heart_rate_measurement');
            await characteristic.startNotifications();

            characteristic.addEventListener('characteristicvaluechanged', (event) => {
                // @ts-ignore
                setHeartRate(event.target.value.getUint8(1));
            });

            // Save device and characteristic in state
            setDevice(device);
            setCharacteristic(characteristic);
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    };

    const disconnectBluetoothDevice = () => {
        if (characteristic) {
            characteristic.stopNotifications();
            characteristic.removeEventListener('characteristicvaluechanged', () => { /* Handler */ });
        }
    };

    return (
        <div>
            <h1>Heart Rate: {heartRate}</h1>
            <button onClick={connectToBluetoothDevice}>Connect</button>
            <button onClick={disconnectBluetoothDevice}>Disconnect</button>
        </div>
    );
};

export default Training;
