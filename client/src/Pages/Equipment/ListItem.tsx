
import {IParts} from "../../Types/Parts";
import {MdDirectionsBike} from "react-icons/md";
import { RiToolsFill } from "react-icons/ri";
import {BsBagFill} from "react-icons/bs";
import ProgressBar from "./ProgressBar.tsx";
import PartStatus from "./Status.tsx";
import PartsMenu from "./PartsMenu.tsx";
interface ListItemProps {
    part: IParts;
    listIndex: number;
    deleteHandler: (equipmentId: number,listIndex: number) => Promise<void>;
    changeStatusHandler: (equipmentId: number,listIndex: number) => Promise<void>;
}

const renderIcon = (type: string) => {
    switch(type) {
        case 'BIKE':
            return <MdDirectionsBike className="text-2xl text-gray-500"/>
        case 'EQUIPMENT':
            return <RiToolsFill className="text-2xl text-gray-500"/>
        case 'ACCESSORY':
            return <BsBagFill className="text-2xl text-gray-500"/>
    }
}

const ListItem =({part, deleteHandler,listIndex, changeStatusHandler} : ListItemProps) => {

    return <>
        <div className="grid grid-cols-10 sm:flex h-fit w-full items-center border-2 rounded-2xl mt-2 hover:bg-gray-50">
            <div className="flex ml-5 hidden sm:block">{renderIcon(part.type)}</div>
            <div className="flex ml-5 mr-5 flex-col w-64 col-span-2">
                <h3 className="font-semibold">{part.name}</h3>
                <div className="font-light">{part.notice}</div>
            </div>
            <div className="sm:hidden col-span-6 ml-32 flex justify-center items-center">
                <div className="w-full">
                    <ProgressBar maxDistance={part.maxDistance} currentDistance={part.distance} />
                </div>
                <div>
                    <PartStatus active={part.isActive}/>
                </div>
            </div>
                <div className="w-full hidden sm:block">
                    <ProgressBar maxDistance={part.maxDistance} currentDistance={part.distance} />
                </div>
                <div className="hidden sm:block">
                    <PartStatus active={part.isActive}/>
                </div>
            <div className="flex justify-end col-span-2">
                <PartsMenu listIndex={listIndex} equiptmentId={part.equipmentId} changeStatusHandler={changeStatusHandler} deleteHandler={deleteHandler} itemStatus={part.isActive}/>
            </div>

        </div>
    </>

}

export default ListItem;