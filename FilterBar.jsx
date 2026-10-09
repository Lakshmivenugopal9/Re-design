import React from 'react';

const FilterBar = ({
  categories = [],
  selectedCategory = 'All',
  onSelectCategory,
  sortBy = 'default',
  onSortChange
}) => {
  return (
    <div className="filter-bar" data-testid="filter-bar">
      <div className="filter-group category-filter-group">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          className="category-select"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          data-testid="category-filter"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group sort-filter-group">
        <label htmlFor="sort-select">Sort By</label>
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          data-testid="sort-select"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
          <option value="name-desc">Name: Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
