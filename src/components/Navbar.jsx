import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <h2>E-Shop</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/checkout">Checkout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
