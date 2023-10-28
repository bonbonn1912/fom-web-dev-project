import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";

interface partsMenuProps {
    deleteHandler: (equipmentId: number,listIndex: number) => void;
    changeStatusHandler: (equipmentId: number,listIndex: number) => void;
    listIndex: number;
    equiptmentId: number;
    itemStatus: boolean;
}

const partsMenu = ({deleteHandler, changeStatusHandler, listIndex, itemStatus, equiptmentId } : partsMenuProps) =>{
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return(
        <Menu as="div" className="relative flex-none">
            <Menu.Button className=" block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={() => changeStatusHandler(equiptmentId,listIndex)}
                                className={classNames(
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                            >
                                { itemStatus ? "Deaktivieren" : "Aktivieren"}
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={() => deleteHandler(equiptmentId,listIndex)}
                                className={classNames(
                                    active ? 'bg-gray-50' : '',
                                    'block px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                            >
                                Delete<span className="sr-only"></span>
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default partsMenu;