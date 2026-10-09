import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchTerm);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search products…"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        data-testid="product-search"
        aria-label="Search products"
      />
      <button type="submit" className="btn btn-primary btn-search" data-testid="search-submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
