import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, dispatch } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.address) {
      alert("Please fill in all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Clear cart and redirect
    dispatch({ type: "CLEAR_CART" });
    navigate("/success", { state: { name: form.name, email: form.email } });
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <h3>Order Summary</h3>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} x {item.quantity} = ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
