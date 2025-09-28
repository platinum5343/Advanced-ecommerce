import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Total items in cart (sum of quantities)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <h2>MyStore</h2>

      {/* Hamburger button (mobile) */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {/* Nav links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/cart" onClick={() => setIsOpen(false)}>
          Cart {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
        <Link to="/checkout" onClick={() => setIsOpen(false)}>Checkout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
