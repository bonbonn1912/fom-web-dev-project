import PartsInput from "./PartsInput.tsx";
import {useState} from "react";
import { IParts} from "../../Types/Parts.tsx";


const Equipment = () => {
    const [showPartsInput, setShowPartsInput] = useState(false);
    const togglePartsInput = () => {
        setShowPartsInput(!showPartsInput);
    }

    const addPart = (newParts: IParts | null) => {
        if(newParts) {
            console.log(newParts);
        }else{
            console.log('cancel');
        }
        togglePartsInput();
    }

    return (
        <div>
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Equipment</h3>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                    <button onClick={togglePartsInput}
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
            <PartsInput display={showPartsInput} onSubmitOrCancel={addPart}/>
        </div>
    )
}

export default Equipment;
