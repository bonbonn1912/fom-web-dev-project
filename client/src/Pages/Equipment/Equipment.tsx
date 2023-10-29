import PartsInput from "./PartsInput.tsx";
import {useEffect, useState} from "react";
import { IParts} from "../../Types/Parts.tsx";
import {BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import ListItem from "./ListItem.tsx";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import {authenticate} from "../Auth/authContext.tsx";



const Equipment = () => {
    const [ parts, setParts] = useState<IParts[]>([]);

    const [ displayParts, setDisplayParts] = useState<IParts[]>(parts);
    const [ isLoading, setIsLoading] = useState<boolean>(true);

    const [showPartsInput, setShowPartsInput] = useState(false);
    const togglePartsInput = () => {
        setShowPartsInput(!showPartsInput);
    }

    const getParts = async () => {
        const res = await fetch('/api/equipment');
        const data = await res.json();
        setParts(data);
        setDisplayParts(data);
        setIsLoading(false);
    }

    const filterParts = (parts: IParts[], query: string) => {
        if(query === '') return setDisplayParts(parts);
        const searchResult = parts.filter(part => JSON.stringify(part).toLowerCase().includes(query.toLowerCase()));
        setDisplayParts(searchResult)
    }

    useEffect(() => {
        authenticate().then(() => {
            getParts();
        });
    }, []);

    const addPart = async (newParts: IParts | null) => {
        if(newParts) {

           const res = await fetch('/api/equipment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify(newParts),
           })
            if(!res.ok) return console.log('error');
            const newPartsArray = [...parts, newParts];
            setDisplayParts(newPartsArray);
            setParts(newPartsArray)
        }else{
            console.log('cancel');
        }
        togglePartsInput();
    }

    const deletePart = async (equipmentId: number,listIndex: number) => {

        const res = await fetch(`/api/equipment?equipmentId=${equipmentId}`, {
            method: 'DELETE',
        })
        if(!res.ok) return console.log('error');
        const newPartsArray = [...parts];
        newPartsArray.splice(listIndex, 1);
        setDisplayParts(newPartsArray);
        setParts(newPartsArray);
    }
    const updatePart = async (equipmentId: number,listIndex: number) => {

        const res = await fetch(`/api/equipment/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({equipmentId: equipmentId, isActive: !parts[listIndex].isActive}),
        })
        if(!res.ok) return console.log('error');
        const newPartsArray = [...parts];
        newPartsArray[listIndex].isActive = !newPartsArray[listIndex].isActive;
        setDisplayParts(newPartsArray);
        setParts(newPartsArray);
    }


    return (
        <div>
        <div className="border-b border-gray-200 bg-white py-5">
            <div className="flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="w-full md:w-fit">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Equipment</h3>
                </div>
                <div className="flex items-center mt-2 md:mt-0 w-full md:w-fit justify-between">
                <div className="">
                    <label htmlFor="mobile-search-candidate" className="sr-only">
                        Search
                    </label>
                    <label htmlFor="desktop-search-candidate" className="sr-only">
                        Search
                    </label>
                    <div className="flex rounded-md shadow-sm">
                        <div className="relative flex-grow focus-within:z-10">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                name="mobile-search-parts"
                                onChange={(e) => filterParts(parts, e.target.value)}
                                id="mobile-search-parts"
                                className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                                placeholder="Search"
                            />
                            <input
                                type="text"
                                name="desktop-search-parts"
                                onChange={(e) => filterParts(parts, e.target.value)}
                                id="desktop-search-parts"
                                className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                                placeholder="Search Parts"
                            />
                        </div>
                        <button
                            type="button"
                            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Sort
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                    <button onClick={togglePartsInput}
                        type="button"
                        className="flex sm:w-grow relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add
                    </button>
                </div>
                </div>
            </div>
        </div>
            <PartsInput display={showPartsInput} onSubmitOrCancel={addPart}/>
            {
                isLoading ? <LoadingSpinner callFrom="Equipment" width={50} height={50}/> :
                displayParts.map((part, index) => (
                <ListItem part={part} key={index} listIndex={index} deleteHandler={deletePart} changeStatusHandler={updatePart}/>
         ))
            }
        </div>
    )
}

export default Equipment;
