"use client";
import React, { useReducer } from "react";

// Reducer function to manage quantity state
function quantityReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { quantity: state.quantity + 1 };
    case "DECREMENT":
      return {
        quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity,
      };
    case "SET":
      return { quantity: action.payload >= 1 ? action.payload : 1 };
    default:
      return state;
  }
}

function HandleQuantity() {
  // Initialize state with a specific quantity
  const initialQuantity = 2900;
  const [state1, dispatch1] = useReducer(quantityReducer, {
    quantity: initialQuantity,
  });

  const increment1 = () => {
    dispatch1({ type: "INCREMENT" });
  };

  const decrement1 = () => {
    dispatch1({ type: "DECREMENT" });
  };

  const handleInputChange1 = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      dispatch1({ type: "SET", payload: newValue });
    }
  };

  return (
    <div className="quantity-counter">
      <a
        className="quantity__minus"
        style={{ cursor: "pointer" }}
        onClick={decrement1}
      >
        <i className="bx bx-minus" />
      </a>
      <input
        name="quantity"
        type="text"
        value={state1.quantity}
        onChange={handleInputChange1}
        className="quantity__input"
        placeholder={initialQuantity}
      />
      <a
        className="quantity__plus"
        style={{ cursor: "pointer" }}
        onClick={increment1}
      >
        <i className="bx bx-plus" />
      </a>
    </div>
  );
}

export default HandleQuantity;
