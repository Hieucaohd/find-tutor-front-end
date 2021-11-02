import "leaflet/dist/leaflet.css";
import { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = ({address}) => {
    const {provinceName, districtName, wardName} = address;
    const [position, setPosition] = useState(null);
    const mapBoxToken = "pk.eyJ1IjoiaGllcGRlcHRyYWkiLCJhIjoiY2t2MG56eDIxN25weDJ3bnoxMHh4aXdxMCJ9.x6FrG6gMFxo4hCqVgsKNQw";
    useEffect(() => {
        if(provinceName) {
          const getMap = async () => {   
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${wardName},${districtName},${provinceName},.json?access_token=${mapBoxToken}`)

            const responseJSON = await response.json();
            const newPosition = [responseJSON?.features[0]?.center[1], responseJSON?.features[0]?.center[0]];
            setPosition(newPosition);
          }
          getMap();
        }
    }, [provinceName, districtName, wardName])
    return (
      <Fragment>
      {position && <MapContainer style={{height: 400, width: '100%', zIndex: 1}} center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`}
        attribution= '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      </MapContainer>}
      </Fragment>
    );
};

export default Map;
