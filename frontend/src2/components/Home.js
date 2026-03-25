// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZoomControl } from 'react-leaflet';


const primeAreas = {
  Navrangpura: { lat: 23.0419, lon: 72.5601 },
  Maninagar: { lat: 23.0155, lon: 72.6296 },
  Satellite: { lat: 23.0263, lon: 72.5084 },
  CGRoad: { lat: 23.031, lon: 72.5682 },
  Ghatlodia: { lat: 23.0664, lon: 72.5453 },
  PrahladNagar: { lat: 23.0108, lon: 72.5087 },
  Ambli: { lat: 23.0303, lon: 72.4917 },
  Thaltej: { lat: 23.0582, lon: 72.5067 },
  SindhuBhavanMarg: { lat: 23.0481, lon: 72.4957 },
  SGHighway: { lat: 23.0466, lon: 72.5244 },
  Bodakdev: { lat: 23.0530, lon: 72.5167 },
  Vastrapur: { lat: 23.0380, lon: 72.5263 },
  Bopal: { lat: 22.9933, lon: 72.5006 },
  SouthBopal: { lat: 22.9757, lon: 72.4875 },
  Chandkheda: { lat: 23.1103, lon: 72.6033 },
  ScienceCityRoad: { lat: 23.0701, lon: 72.5011 },
  Jagatpur: { lat: 23.1122, lon: 72.5342 },
  Gota: { lat: 23.1060, lon: 72.5251 },
  GIFTCity: { lat: 23.1645, lon: 72.6830 },
};


const userIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapUpdater = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 15);
    }
  }, [lat, lon, map]);
  return null;
};

const Home = () => {
  const [selectionMode, setSelectionMode] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [coords, setCoords] = useState({ lat: 23.0225, lon: 72.5714 });
  const [selectedType, setSelectedType] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [range, setRange] = useState(5000);

  const handleAreaSelect = (e) => {
    const area = e.target.value;
    setSelectedArea(area);
    if (primeAreas[area]) {
      setCoords(primeAreas[area]);
      setNearbyPlaces([]);
    }
  };

  const handlePincodeSearch = async () => {
  if (!pincode) return;
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&addressdetails=1`);
    const data = await res.json();
    if (data.length > 0) {
      const location = data[0];
      setCoords({ lat: parseFloat(location.lat), lon: parseFloat(location.lon) });
      setNearbyPlaces([]);
    } else {
      alert('Invalid or unsupported pincode.');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to fetch location.');
  }
};


  const categories = [
    { key: 'atm', label: 'ATM 🏧' },
    { key: 'pharmacy', label: 'Pharmacy 💊' },
    { key: 'restaurant', label: 'Restaurant 🍴' },
  ];

  const iconUrlMap = {
    atm: 'https://cdn-icons-png.flaticon.com/512/483/483947.png',
    pharmacy: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png',
    restaurant: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
  };

  useEffect(() => {
    if (!selectedType || !coords.lat || !coords.lon) return;

    const query = `
      [out:json];
      (
        node["amenity"="${selectedType}"](around:${range},${coords.lat},${coords.lon});
        way["amenity"="${selectedType}"](around:${range},${coords.lat},${coords.lon});
        relation["amenity"="${selectedType}"](around:${range},${coords.lat},${coords.lon});
      );
      out center;
    `;

    const fetchData = async () => {
      try {
        const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        const data = await res.json();
        const points = data.elements
          .map((el) => ({
            id: el.id,
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
            name: el.tags?.name || 'Unnamed',
          }))
          .filter((el) => el.lat && el.lon);

        setNearbyPlaces(points);
      } catch (err) {
        console.error('Error fetching Overpass data:', err);
        setNearbyPlaces([]);
      }
    };

    fetchData();
  }, [selectedType, coords, range]);

  return (
    <div className="home-grid">
      <div className="left-panel">
        <h3 className="panel-title">Select Nearby Location</h3>

        <div className="radio-buttons">
          <label>
            <input
              type="radio"
              name="locationOption"
              value="area"
              checked={selectionMode === 'area'}
              onChange={(e) => setSelectionMode(e.target.value)}
            />
            Use Prime Location
          </label>
          <label>
            <input
              type="radio"
              name="locationOption"
              value="pincode"
              checked={selectionMode === 'pincode'}
              onChange={(e) => setSelectionMode(e.target.value)}
            />
            Enter Pincode
          </label>
        </div>

        {selectionMode === 'area' && (
          <select onChange={handleAreaSelect} value={selectedArea}>
            <option value="">Select Prime Area</option>
              {Object.keys(primeAreas).map((area) => (
                <option key={area} value={area}>
                  {area.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
          </select>
        )}

        {selectionMode === 'pincode' && (
          <div className="location-inputs">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button className="search-btn" onClick={handlePincodeSearch}>
              Search
            </button>
          </div>
        )}

        {coords.lat && (
          <p className="location-output">
            📍 Lat: {coords.lat.toFixed(4)} | Lon: {coords.lon.toFixed(4)}
          </p>
        )}

        <div className="range-slider">
          <label>
            Search Range: {range / 1000} km
            <input
              type="range"
              min="1000"
              max="10000"
              step="1000"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="category-filters">
          <h4 className="panel-title">Show Nearby:</h4>
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`category-btn ${selectedType === cat.key ? 'active' : ''}`}
              onClick={() => setSelectedType(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

            <div className="right-panel">
              <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={false} // disable default position
        style={{ height: '100%', width: '100%' }}>
        <ZoomControl position="bottomright" />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          <MapUpdater lat={coords.lat} lon={coords.lon} />

          <Marker position={[coords.lat, coords.lon]} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>

          {nearbyPlaces.map((place) => {
            const categoryIcon = new L.Icon({
              iconUrl: iconUrlMap[selectedType] || userIcon.options.iconUrl,
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            });

            return (
              <Marker
                key={place.id}
                position={[place.lat, place.lon]}
                icon={categoryIcon}
              >
                <Popup><strong>{place.name}</strong></Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
