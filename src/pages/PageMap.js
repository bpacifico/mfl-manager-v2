import React, { useState, useEffect } from 'react';
import "./PageMap.css";
import "statics/leaflet.css";
import { NotificationManager as nm } from "react-notifications";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface PageMapProps {}

const PageMap: React.FC<PageMapProps> = () => {
  const [clubs, setClubs] = useState(null);

  var markerIcon = L.icon({
    iconUrl: "/media/images/buildings-blue.svg",
    iconSize: [20, 20]
  });

  useEffect(() => {
    fetch('/data/mfl_clubs.json')
      .then(response => response.json())
      .then(data => {
        setClubs(data);
        nm.warning("The input data is a snapshot prior to the issuance of the stone clubs");
      });
  }, []);

  return (
    <div id="PageMap" className="position-relative w-100 h-100">
      <MapContainer className="bg-dark h-100 w-100" center={[49.61, 6.13]} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        />
        {clubs &&
          clubs
            .filter((c) => c.division === 1)
            .map((c) => (
              <Marker
                key={c.id}
                icon={markerIcon}
                position={[c.lat, c.lng]}>
                <Popup>
                  {c.city}
                </Popup>
              </Marker>
            ))
        }
      </MapContainer>
    </div>
  );
};

export default PageMap;