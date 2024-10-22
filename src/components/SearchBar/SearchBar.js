import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        placeholder="Buscar por pontos de interesse..." 
        className="search-bar-input" 
      />
      <button className="search-bar-button">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/120px-Magnifying_glass_icon.svg.png" 
          alt="Search" 
          className="search-icon" 
        />
      </button>
    </div>
  );
};

export default SearchBar;