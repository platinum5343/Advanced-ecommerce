import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import productsData from "../data/product.json";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { dispatch } = useCart();

  useEffect(() => {
    setProducts(productsData); // load from local JSON
  }, []);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All" ? true : product.category?.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search & Filter */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Phones">Phones</option>
          <option value="Laptops">Laptops</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Consoles">Consoles</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </Link>
              <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
