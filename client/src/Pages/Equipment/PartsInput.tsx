
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import {useState} from "react";
import {IParts} from "../../Types/Parts.tsx";

interface PartsInputProps {
    display: boolean;
    onSubmitOrCancel?: (p: IParts | null) => void;
}
const PartsInput = ({display, onSubmitOrCancel} : PartsInputProps) => {
    const [partName, setPartName] = useState<string>('');
    const [partNotice, setPartNotice] = useState<string>('');
    const [partDistance, setPartDistance] = useState<number>(0);
    const [ maxDistance, setMaxDistance] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [ type, setType] = useState<'BIKE' | 'EQUIPMENT' | 'ACCESSORY'>('BIKE');

    const submitPart = () => {
        if (onSubmitOrCancel) {
            // @ts-ignore eqipmentId is from the server
            onSubmitOrCancel({name: partName, notice: partNotice, distance: partDistance, maxDistance: maxDistance, isActive: isActive, type: type});
        }
    }

    const cancelPart = () => {
        setPartName('');
        setPartNotice('');
        setPartDistance(0);
        if (onSubmitOrCancel) {
            onSubmitOrCancel(null);
        }
    }

    const displayClass = display ? 'block' : 'hidden';
    return (
        <div className={`${displayClass} mt-5 mb-5`}>
            <div className="grid sm:grid-cols-4 grid-cols-1 gap-x-2.5 gap-y-2.5">
                <div className="relative md:col-span-1 col-span-full">
                    <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={partName}
                        onChange={(e) => setPartName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Bremsscheibe"
                    />
                </div>
                <div className="relative md:col-span-1 col-span-full">
                    <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                        Notiz
                    </label>
                    <input
                        type="text"
                        name="notice"
                        id="notice"
                        value={partNotice}
                        onChange={(e) => setPartNotice(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Ölen bei erreichen der Distanz"
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-2.5 col-span-full md:col-span-1">
                <div className="relative md:col-span-1 col-span-full">
                    <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                        Distanz
                    </label>
                    <input
                        type="number"
                        name="maxDistance"
                        id="maxDistance"
                        min={0}
                        max={50000}
                        value={partDistance.toString() || ''}
                        onChange={(e) => setPartDistance(parseInt(e.target.value) || 0)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Bremsscheibe"
                    />
                </div>
                <div className="relative md:col-span-1 col-span-full">
                    <label
                        htmlFor="name"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                        Max Distanz
                    </label>
                    <div className="grid md:col-span-1 col-span-full">
                        <input
                            type="number"
                            name="distance"
                            id="distance"
                            min={0}
                            max={50000}
                            value={maxDistance.toString() || ''}
                            onChange={(e) => setMaxDistance(parseInt(e.target.value) || 0)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="5000"
                        />
                    </div>
                </div>
                </div>
                <div className="relative md:col-span-1 col-span-full">
                <div className="relative flex gap-x-3 items-center md:ml-3 ml-0">
                    <label
                        htmlFor="optionSelect"
                        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                    >
                        Typ
                    </label>
                    <div className="grid md:col-span-1 col-span-full">
                        <select
                            value={type}
                            name="optionSelect"
                            id="optionSelect"
                            onChange={(e) => setType( e.target.value as 'BIKE' | 'EQUIPMENT' | 'ACCESSORY')}
                            className="md:w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value="" disabled hidden>Wähle eine Option</option>
                            <option value="BIKE">Rad</option>
                            <option value="EQUIPMENT">Ausrüstung</option>
                            <option value="ACCESSORY">Zubehör</option>
                        </select>
                    </div>
                    <div className="flex h-6 items-center">
                        <input
                            id="isActive"
                            name="isActive"
                            type="checkbox"
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="comments" className="font-medium text-gray-900">
                            Active
                        </label>
                    </div>
                </div>
                </div>
            </div>
            <div className="mt-3 md:col-span-1 col-span-full">
                <button
                    onClick={submitPart}
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    Submit
                    <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                </button>
                <button
                    onClick={cancelPart}
                    type="button"
                    className="ml-2 inline-flex items-center gap-x-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    Cancel
                    <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

export default PartsInput;