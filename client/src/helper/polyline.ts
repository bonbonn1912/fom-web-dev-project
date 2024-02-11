import {latLng} from "leaflet";

export const decodePolyline = (encoded: any) => {
    var poly = [];
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;
    while (index < len) {
        var b,
            shift = 0,
            result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += dlat;
        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        var dlng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += dlng;
        var point = latLng(lat / 1e5, lng / 1e5);
        poly.push(point);
    }
    return poly;
}