import {useEffect, useState} from "react";
import { decodePolyline} from "../../helper/polyline.ts";
import {LatLng} from "leaflet";
import {MapContainer, useMap,} from "react-leaflet";
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    polyString: string;
    width: string;
    height: string;
    controllables: boolean;
}
const Map = ({polyString, width, height, controllables} : MapProps) => {
    const decodedPolyLine = decodePolyline( polyString)
    return (
        <div className="" >
            <MapContainer style={{height: height, width: width}}>
                <SetBoundsRectangles decoded={decodedPolyLine} controllables={controllables}/>
            </MapContainer>
        </div>
    )
}

interface SetBoundsProps {
    decoded: LatLng[];
    controllables: boolean;
}
const  SetBoundsRectangles = ({decoded, controllables} : SetBoundsProps) => {
    const [bounds] = useState([[0,0]])
    const map = useMap();
    useEffect(() => {
        if(!controllables){
            map.zoomControl.remove();
            map.dragging.disable();
            map.scrollWheelZoom.disable();
            map.setZoom(16);
        }


        map.attributionControl.setPrefix(false);
        let polyLine = L.polyline(decoded as unknown as [number,number][], {color: 'red'}).addTo(map);
        map.fitBounds(polyLine.getBounds());
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            noWrap: true,
        }).addTo(map);
    }, [bounds, map])
    return null
}
export default Map