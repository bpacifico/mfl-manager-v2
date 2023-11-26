import React, { useState, useEffect } from 'react';
import "statics/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface PageMapProps {}

const PageMap: React.FC<PageMapProps> = () => {
  const [clubs, setClubs] = useState(null);

  useEffect(() => {
    fetch('/data/mfl_clubs.json')
      .then(response => response.json())
      .then(data => setClubs(data));
  }, []);

  return (
    <div id="PageMap" className="position-relative w-100 h-100">
      <MapContainer className="h-100 w-100" center={[49.61, 6.13]} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clubs &&
          clubs.map((c) => (
            <Marker key={c.id} position={[c.lat, c.lng]}>
              <Popup>
                Hey
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </div>
  );
};

export default PageMap;