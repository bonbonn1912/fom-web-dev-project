
import {IParts} from "../../Types/Parts";

interface ListItemProps {
    part: IParts;
}

const ListItem =({part} : ListItemProps) => {

    return <>
        <div className="flex justify-around">
            <div>{part.name}</div>
            <div>{part.notice}</div>
            <div>{part.distance}</div>
            <div>{part.maxDistance}</div>
            <div>{part.isActive ? "true" : "false"}</div>
        </div>
    </>

}

export default ListItem;