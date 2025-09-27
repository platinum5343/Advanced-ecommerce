import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const savedCart = JSON.parse(localStorage.getItem("cart"));
const initialState = Array.isArray(savedCart) ? savedCart : [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const exist = state.find(item => item.id === action.payload.id);
      if (exist) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.payload);

    case "INCREASE_QTY":
      return state.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );

  case "DECREASE_QTY":
  return state
    .map(item =>
      item.id === action.payload
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
