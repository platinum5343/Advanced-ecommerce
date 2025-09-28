import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import productsData from "../data/product.json";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true); // 👈 loading state
  const { dispatch } = useCart();

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "All" ? true : product.category?.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Show spinner while loading
  if (loading) return <Spinner />;

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
          <div className="empty-state">
    <img src="/images/no-results.png" alt="No results" />
    <p>No products match your search.</p>
  </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </Link>
              <button
                onClick={() => {
                  dispatch({ type: "ADD_ITEM", payload: product });
                  toast.success(`${product.title} added to cart!`);
                }}
              >
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
