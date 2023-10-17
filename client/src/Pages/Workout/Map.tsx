import {useEffect, useState} from "react";
import { decodePolyline} from "../../helper/polyline.ts";
import {LatLng} from "leaflet";
import {MapContainer, Polyline, TileLayer, useMap,} from "react-leaflet";
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    polyString: string;
    width: string;
    height: string;
}
const Map = ({polyString, width, height} : MapProps) => {
    const decodedPolyLine = decodePolyline( polyString)
    return (
        <div className="" >
            <MapContainer style={{height: "100px", width: "200px"}}>
                <SetBoundsRectangles decoded={decodedPolyLine}/>
            </MapContainer>
        </div>
    )
}

interface SetBoundsProps {
    decoded: LatLng[];
}
const  SetBoundsRectangles = ({decoded} : SetBoundsProps) => {
    const [bounds] = useState([[0,0]])
    const map = useMap();
    useEffect(() => {
        map.zoomControl.remove();
        map.dragging.disable();
        map.scrollWheelZoom.disable();
        map.setZoom(16);
        let polyLine = L.polyline(decoded as unknown as [number,number][], {color: 'red'}).addTo(map);
        map.fitBounds(polyLine.getBounds());
        map.attributionControl.setPrefix(false);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            noWrap: true,
        }).addTo(map);
    }, [bounds, map])
    return null
}
export default Map