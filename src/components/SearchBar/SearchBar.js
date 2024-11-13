import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { point } from 'leaflet';

function SearchBar({ pointsOfInterest, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  // Função que define o valor do input ao clicar na opção
  const handleOptionClick = (option) => {
    setSearchTerm(option.name);
    setFilteredOptions([]);
  };

  const handleSearchEnter = (e) => {
    if(e.keyCode === 13 && searchTerm)
      onSearch(searchTerm);
  };

  const handleSearchClick = () => {
    if(searchTerm)
      onSearch(searchTerm); // Chama a função passada pelo pai com o termo de busca
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOptions([]);
    } else {
      const filtered = pointsOfInterest.filter((poi) =>
        poi.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [searchTerm]);

  return (
    <div className="search-bar-container">
      <input 
        type="text" 
        placeholder="Search for points..." 
        className="search-bar-input" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearchEnter}
      />
      <button className="search-bar-button" onClick={handleSearchClick}>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/120px-Magnifying_glass_icon.svg.png" 
          alt="Search" 
          className="search-icon" 
        />
      </button>

      {filteredOptions.length > 0 && (
        <ul className="search-options">
          {filteredOptions.map((option) => (
            <li key={option.id} className="search-option" onClick={() => handleOptionClick(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;