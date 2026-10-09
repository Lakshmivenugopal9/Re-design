import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null && urlQuery !== searchTerm) {
      setSearchTerm(urlQuery);
    }
  }, [searchParams]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [searchTerm, selectedCategory, sortBy]);

  const isFiltered = searchTerm || selectedCategory !== 'All' || sortBy !== 'default';

  return (
    <div className="page products-page" data-testid="products-page">
      <div className="page-header">
        <h1>All Products</h1>
        <p>Browse our full catalog — {products.length} curated items.</p>
      </div>

      <div className="products-controls">
        <div className="search-control-wrapper">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="products-status-bar">
        <span>
          Showing <strong style={{ color: 'var(--clr-text)' }}>{filteredAndSortedProducts.length}</strong> of {products.length} products
        </span>
        {isFiltered && (
          <button
            type="button"
            className="btn btn-reset-filters"
            data-testid="reset-filters"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSortBy('default');
              setSearchParams({});
            }}
          >
            ✕ Reset Filters
          </button>
        )}
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="no-products-wrapper" data-testid="no-products-message">
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="product-grid" data-testid="product-grid">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
