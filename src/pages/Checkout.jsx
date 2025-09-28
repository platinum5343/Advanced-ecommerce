import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let temp = {};
    if (!formData.name.trim()) temp.name = "Name is required";
    if (!formData.email.includes("@")) temp.email = "Valid email required";
    if (!formData.address.trim()) temp.address = "Address is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Clear cart & go to success page
    dispatch({ type: "CLEAR_CART" });
    navigate("/success", { state: { ...formData, total } });
  };

  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Your cart is empty.</h2>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>

        <label>
          Address
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
          {errors.address && <span className="error">{errors.address}</span>}
        </label>

        <h3>Total: ${total.toFixed(2)}</h3>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
