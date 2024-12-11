import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { getPointByName } from "../../services/pointApi";  // Certifique-se de que getPointByName está funcionando corretamente

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Função que define o valor do input ao clicar na opção
  const handleOptionClick = (option) => {
    setSearchTerm('');  // Limpa o termo de busca ao selecionar
    setFilteredOptions([]);      // Limpa a lista de opções
    onSearch(option);            // Chama a função onSearch com a opção selecionada
  };

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13 && searchTerm) {
      //onSearch(searchTerm);  // Chama a função de busca com o termo
    }
  };

  const handleSearchClick = () => {
    if (searchTerm) {
      //onSearch(searchTerm);  // Chama a função de busca com o termo
    }
  };

  // Função assíncrona para buscar pontos por nome
  const fetchPoints = async (name) => {
    try {
      const data = await getPointByName(name);  // Supondo que getPointByName retorne uma lista de pontos
      setFilteredOptions(data.points || []);  // Ajuste conforme a estrutura da resposta
      setError('');  // Limpar erros
      setMessage('');  // Limpar mensagem
    } catch (err) {
      setError(err.error || 'Something went wrong');
      setMessage('');
      setFilteredOptions([]);
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOptions([]);  // Se o termo estiver vazio, limpa as opções
    } else {
      fetchPoints(searchTerm); // Se houver um termo, busca pontos relacionados
    }
  }, [searchTerm]);  // Dependência de searchTerm

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for points of interest..."
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
            <li
              key={option.id}
              className="search-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
