import React from "react";
import { Link, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const { name, email } = location.state || { name: "Customer", email: "" };

  return (
    <div className="checkout-container">
      <h2>✅ Thank you, {name}!</h2>
      <p>Your order has been placed successfully.</p>
      {email && <p>We’ve sent a confirmation email to <strong>{email}</strong>.</p>}
      
      <Link to="/" style={{ marginTop: "1rem", display: "inline-block" }}>
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Success;
