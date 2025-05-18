import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';

const shopCategories = [
  { name: 'All', icon: '🛍️', color: '#3a0ca3' },
  { name: 'Electronics', icon: '📱', color: '#4361ee', subcategories: ['Phones', 'Laptops', 'Accessories'] },
  { name: 'Fashion', icon: '👗', color: '#f72585', subcategories: ['Men', 'Women', 'Kids'] },
  { name: 'Jewelry', icon: '💍', color: '#7209b7', subcategories: ['Necklaces', 'Rings', 'Earrings'] },
  { name: 'Accessories', icon: '👜', color: '#4cc9f0', subcategories: ['Bags', 'Watches', 'Sunglasses'] },
];

const sortOptions = [
  { value: 'newest', label: 'Newest', icon: '🆕' },
  { value: 'priceLow', label: 'Price: Low to High', icon: '⬆️' },
  { value: 'priceHigh', label: 'Price: High to Low', icon: '⬇️' },
  { value: 'popular', label: 'Most Popular', icon: '⭐' },
];

const PRODUCTS_PER_PAGE = 8;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('Fetching products from API...');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received products:', data);
        
        // Add default category if not present
        const processedData = data.map(product => ({
          ...product,
          category: product.category || 'All',
          subcategory: product.subcategory || null,
          rating: product.rating || 0
        }));
        
        console.log('Processed products:', processedData);
        setProducts(processedData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat && shopCategories.some(c => c.name === cat)) {
      setSelectedCategory(cat);
    }
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    console.log('Filtering products with:', {
      selectedCategory,
      selectedSubcategory,
      search,
      sort,
      totalProducts: products.length
    });

    let filtered = [...products];
    
    // Category filtering
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => {
        const matches = p.category && p.category.toLowerCase() === selectedCategory.toLowerCase();
        console.log(`Product ${p.title} category match:`, matches);
        return matches;
      });
      
      // Subcategory filtering
      if (selectedSubcategory) {
        filtered = filtered.filter(p => {
          const matches = p.subcategory && p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase();
          console.log(`Product ${p.title} subcategory match:`, matches);
          return matches;
        });
      }
    }

    // Search filtering
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(searchLower))
      );
    }

    // Sorting
    if (sort === 'priceLow') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceHigh') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'popular') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'newest') {
      filtered.reverse();
    }

    console.log('Filtered products count:', filtered.length);
    return filtered;
  }, [products, selectedCategory, selectedSubcategory, search, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

  const Breadcrumbs = () => (
    <nav style={{ margin: '1.5rem 0', fontSize: '1rem', color: '#888' }}>
      <span style={{ color: '#3a0ca3', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>Home</span>
      <span> &gt; </span>
      <span style={{ color: '#222', fontWeight: 500 }}>Shop</span>
      {selectedCategory !== 'All' && (
        <>
          <span> &gt; </span>
          <span style={{ color: '#3a0ca3' }}>{selectedCategory}</span>
        </>
      )}
    </nav>
  );

  const isNew = (product) => product.isNew;
  const isOnSale = (product) => product.isOnSale;

  const getSameAuthorProducts = (product) => {
    if (!product || !product.author) return [];
    return products.filter(p => 
      p.author === product.author && 
      p._id !== product._id
    ).slice(0, 4); // Show max 4 products from same author
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const getCategoryColor = (categoryName) => {
    const category = shopCategories.find(cat => cat.name === categoryName);
    return category ? category.color : '#3a0ca3';
  };

  const getCategoryIcon = (categoryName) => {
    const category = shopCategories.find(cat => cat.name === categoryName);
    return category ? category.icon : '🛍️';
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <div className="loading-spinner"></div>
        <p style={{ marginTop: '1rem', color: '#666' }}>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem', 
        background: '#fff', 
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '2rem auto'
      }}>
        <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>Error Loading Products</h3>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>{error}</p>
        <button 
          className="buy-btn" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Shop Banner */}
      <section className="hero" style={{ minHeight: 140, marginBottom: 0 }}>
        <div className="hero-content">
          <h1>Shop All Products</h1>
          <p>Browse our full collection and find your favorites!</p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Search and Filter Bar */}
      <div style={{ 
        background: '#fff', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        margin: '2rem auto',
        maxWidth: '1200px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              style={{ 
                width: '100%', 
                padding: '0.8rem 1rem', 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            />
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ 
              padding: '0.8rem 1rem', 
              borderRadius: '8px', 
              border: '1px solid #ddd',
              fontSize: '1rem',
              minWidth: '200px'
            }}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.icon} {opt.label}</option>
            ))}
          </select>
        </div>

        {/* Categories */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginTop: '1.5rem', 
          flexWrap: 'wrap' 
        }}>
          {shopCategories.map((cat) => (
            <button
              key={cat.name}
              className="buy-btn"
              style={{ 
                background: selectedCategory === cat.name ? cat.color : '#fff', 
                color: selectedCategory === cat.name ? '#fff' : cat.color, 
                border: `1px solid ${cat.color}`,
                minWidth: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                padding: '0.8rem 1.2rem'
              }}
              onClick={() => { 
                console.log('Selected category:', cat.name);
                setSelectedCategory(cat.name); 
                setSelectedSubcategory(null);
                setPage(1); 
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {selectedCategory !== 'All' && shopCategories.find(cat => cat.name === selectedCategory)?.subcategories && (
          <div style={{ 
            display: 'flex', 
            gap: '0.8rem', 
            marginTop: '1rem', 
            flexWrap: 'wrap',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '8px'
          }}>
            {shopCategories.find(cat => cat.name === selectedCategory)?.subcategories.map((subcat) => (
              <button
                key={subcat}
                style={{ 
                  background: selectedSubcategory === subcat ? getCategoryColor(selectedCategory) : '#fff', 
                  color: selectedSubcategory === subcat ? '#fff' : getCategoryColor(selectedCategory),
                  border: `1px solid ${getCategoryColor(selectedCategory)}`,
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => { 
                  console.log('Selected subcategory:', subcat);
                  setSelectedSubcategory(subcat); 
                  setPage(1); 
                }}
              >
                {subcat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 className="section-title">
          {selectedCategory === 'All' ? 'All Products' : (
            <>
              {getCategoryIcon(selectedCategory)} {selectedCategory}
              {selectedSubcategory && ` > ${selectedSubcategory}`}
            </>
          )}
          <span style={{ fontSize: '1rem', color: '#666', marginLeft: '1rem' }}>
            ({filteredProducts.length} products)
          </span>
        </h2>
        <div className="products-grid">
          {paginatedProducts.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              background: '#fff', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>No products found</p>
              <button 
                className="buy-btn" 
                onClick={() => { 
                  setSearch(''); 
                  setSelectedCategory('All');
                  setSelectedSubcategory(null);
                }}
                style={{ marginTop: '1rem' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            paginatedProducts.map((product) => (
              <div key={product._id} style={{ position: 'relative' }}>
                {isNew(product) && (
                  <span style={{ 
                    position: 'absolute', 
                    top: 10, 
                    left: 10, 
                    background: '#2b9348', 
                    color: '#fff', 
                    borderRadius: '6px', 
                    padding: '0.2rem 0.7rem', 
                    fontSize: '12px', 
                    zIndex: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    New
                  </span>
                )}
                {isOnSale(product) && (
                  <span style={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10, 
                    background: '#f72585', 
                    color: '#fff', 
                    borderRadius: '6px', 
                    padding: '0.2rem 0.7rem', 
                    fontSize: '12px', 
                    zIndex: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    On Sale
                  </span>
                )}
                <div onClick={() => handleProductClick(product)}>
                  <ProductCard
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    subcategory={product.subcategory}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Same Author Products Section */}
        {selectedProduct && getSameAuthorProducts(selectedProduct).length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h2 className="section-title">
              More from {selectedProduct.author}
            </h2>
            <div className="products-grid">
              {getSameAuthorProducts(selectedProduct).map((product) => (
                <div key={product._id} style={{ position: 'relative' }}>
                  {isNew(product) && (
                    <span style={{ 
                      position: 'absolute', 
                      top: 10, 
                      left: 10, 
                      background: '#2b9348', 
                      color: '#fff', 
                      borderRadius: '6px', 
                      padding: '0.2rem 0.7rem', 
                      fontSize: '12px', 
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      New
                    </span>
                  )}
                  {isOnSale(product) && (
                    <span style={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      background: '#f72585', 
                      color: '#fff', 
                      borderRadius: '6px', 
                      padding: '0.2rem 0.7rem', 
                      fontSize: '12px', 
                      zIndex: 2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      On Sale
                    </span>
                  )}
                  <ProductCard
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.5rem', 
            margin: '2rem 0',
            flexWrap: 'wrap'
          }}>
            <button
              className="buy-btn"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              style={{ 
                opacity: page === 1 ? 0.5 : 1,
                padding: '0.8rem 1.2rem'
              }}
            >
              ← Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className="buy-btn"
                style={{ 
                  background: page === idx + 1 ? '#3a0ca3' : '#fff', 
                  color: page === idx + 1 ? '#fff' : '#3a0ca3', 
                  border: '1px solid #3a0ca3', 
                  minWidth: '40px',
                  padding: '0.8rem'
                }}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="buy-btn"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              style={{ 
                opacity: page === totalPages ? 0.5 : 1,
                padding: '0.8rem 1.2rem'
              }}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
