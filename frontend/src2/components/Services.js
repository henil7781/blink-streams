import React, { useState } from 'react';
import '../styles/Services.css';
import { useLocation } from 'react-router-dom';
import {
  FaList, FaMoneyCheckAlt, FaHamburger,
  FaPills, FaHospital, FaGasPump, FaAmbulance
} from 'react-icons/fa';



const categories = [
  { name: 'All', icon: <FaList /> },
  { name: 'ATMs', icon: <FaMoneyCheckAlt /> },
  { name: 'Food', icon: <FaHamburger /> },
  { name: 'Medical', icon: <FaPills /> },
  { name: 'Hospitals', icon: <FaHospital /> },
  { name: 'Transport', icon: <FaAmbulance /> },
  { name: 'Fuel', icon: <FaGasPump /> },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [range, setRange] = useState(5000); // default 5km
  const location = useLocation();
  const { selectedLocation, isPrime, coords } = location.state || {};

  const displayLocation = selectedLocation
    ? `${selectedLocation} (${isPrime ? "Prime Location" : "Pincode"})`
    : "You Are Not Select Any Location";

  return (
    <div className="services-page">
      <div className="category-navbar">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-btn ${activeCategory === cat.name ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.name)}
          >
            <span className="icon">{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      <div className="service-results">
        <p>Showing results for: <strong>{activeCategory}</strong></p>
      </div>
    </div>
  );
};

export default Services;
