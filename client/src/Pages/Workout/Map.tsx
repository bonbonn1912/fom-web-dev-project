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
    zIndex: number;
}
const Map = ({polyString, width, height, controllables, zIndex} : MapProps) => {
    const decodedPolyLine = decodePolyline( polyString)
    return (
            <MapContainer style={{height: height, width: width, zIndex: zIndex}}>
                <SetBoundsRectangles decoded={decodedPolyLine} controllables={controllables}/>
            </MapContainer>
    )
}
interface MapForRecordProps {
    decodedPolyLine: LatLng[];
    width: string;
    height: string;
    controllables: boolean;
    zIndex: number;
}
export const MapForRecord = ({decodedPolyLine, width, height, controllables, zIndex} : MapForRecordProps) => {

    return (
        <MapContainer style={{height: height, width: width, zIndex: zIndex}}>
            <SetBoundsRectangles decoded={decodedPolyLine} controllables={controllables}/>
        </MapContainer>
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
        map.scrollWheelZoom.disable();
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