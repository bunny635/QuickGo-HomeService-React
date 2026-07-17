import React from 'react';
import './SearchBar.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="search-wrapper">
      <FiSearch className="search-icon" />
      <input 
        type="text" 
        placeholder={placeholder || "Search services..."} 
        onChange={(e) => onSearch(e.target.value)}
        className="custom-search-input"
      />
    </div>
  );
};

export default SearchBar;