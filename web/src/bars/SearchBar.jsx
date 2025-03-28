import React, { useState } from 'react';

// Composant SearchBar pour la recherche
const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-container mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="form-control search-bar"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
