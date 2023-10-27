import PartsInput from "./PartsInput.tsx";
import {useState} from "react";
import { IParts} from "../../Types/Parts.tsx";
import {BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import ListItem from "./ListItem.tsx";


const Equipment = () => {
    const [parts, setParts] = useState<IParts[]>([
        {
            name: 'Bremsscheibe',
            notice: 'Shimano SM-RT54',
            distance: 0,
            maxDistance: 2000,
            isActive: true,
        },
        {
            name: 'Bremsbeläge',
            notice: 'Shimano B01S',
            distance: 0,
            maxDistance: 2000,
            isActive: true,

        }
    ]);
    const [ displayParts, setDisplayParts] = useState<IParts[]>(parts);


    const [showPartsInput, setShowPartsInput] = useState(false);
    const togglePartsInput = () => {
        setShowPartsInput(!showPartsInput);
    }

    const filterParts = (parts: IParts[], query: string) => {
        if(query === '') return setDisplayParts(parts);
        const searchResult =  parts.filter(part => part.name.includes(query));
        setDisplayParts(searchResult)
    }

    const addPart = (newParts: IParts | null) => {
        if(newParts) {
            const newPartsArray = [...parts, newParts];
            setDisplayParts(newPartsArray);
            setParts(newPartsArray)
        }else{
            console.log('cancel');
        }
        togglePartsInput();
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
                displayParts.map((part, index) => (
                    <ListItem part={part} key={index}/>
                    ))
            }
        </div>
    )
}

export default Equipment;
