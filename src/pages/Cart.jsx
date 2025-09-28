import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


function Cart() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)   return (
    <div className="empty-state">
      {/* <img src="/images/undraw_empty-cart_574u" alt="Empty cart" /> */}
      <h2>Your cart is empty</h2>
      <p>Looks like you haven’t added anything yet.</p>
      <Link to="/">
        <button>Start Shopping</button>
      </Link>
    </div>
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div style={{ flex: 1, marginLeft: "1rem" }}>
            <h4>{item.title}</h4>
            <p>${item.price} x {item.quantity}</p>
          </div>
          <div>
            <button onClick={() => dispatch({ type: "DECREASE_QTY", payload: item.id })}>-</button>
            <button onClick={() => dispatch({ type: "INCREASE_QTY", payload: item.id })}>+</button>
            <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}>Remove</button>
          </div>
        </div>
      ))}

      <h3 style={{ textAlign: "right" }}>Total: ${total.toFixed(2)}</h3>
      <button
        onClick={() => dispatch({ type: "CLEAR_CART" })}
        style={{ marginTop: "1rem", background: "#d33", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "5px" }}
      >
        Clear Cart
      </button>
    </div>
  );
}

export default Cart;
