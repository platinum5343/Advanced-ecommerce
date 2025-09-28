import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";


function Cart() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)   return (
   <div className="empty-state">
  <img src="/images/empty-cart.png" alt="Empty cart" />
  <h2>Your cart is empty</h2>
  <p>Looks like you haven’t added anything yet.</p>
  <Link to="/">
    <button className="primary-btn">Start Shopping</button>
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

<div className="cart-actions">
  <button
    onClick={() => dispatch({ type: "CLEAR_CART" })}
    className="clear-btn"
  >
    Clear Cart
  </button>

  <Link to="/checkout">
    <button className="checkout-btn">Proceed to Checkout</button>
  </Link>
</div>

    </div>
  );
}

export default Cart;
