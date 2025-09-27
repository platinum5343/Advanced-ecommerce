import React from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../data/product.json"; // local product list
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();

  const product = productsData.find(p => p.id === parseInt(id));

  if (!product) return <h2 style={{ textAlign: "center" }}>Product not found</h2>;

  // Related products (pick 3 others randomly)
  const relatedProducts = productsData
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div>
      {/* Product Info */}
      <div className="product-detail">
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="price">${product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}>
            Add to Cart
          </button>
          <Link to="/" style={{ marginLeft: "1rem" }}>
            <button>Back to Products</button>
          </Link>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h3>Related Products</h3>
        <div className="product-grid">
          {relatedProducts.map(rp => (
            <div key={rp.id} className="product-card">
              <Link to={`/product/${rp.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={rp.image} alt={rp.title} />
                <h3>{rp.title}</h3>
                <p>${rp.price}</p>
              </Link>
              <button onClick={() => dispatch({ type: "ADD_ITEM", payload: rp })}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
