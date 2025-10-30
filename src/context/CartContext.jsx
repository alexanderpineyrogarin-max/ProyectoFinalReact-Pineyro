import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext();

const initialState = { items: [] }; // {id, title, price, qty, stock, thumbnail}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { item, qty } = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      const next = exists
        ? state.items.map((i) =>
            i.id === item.id
              ? { ...i, qty: Math.min(i.qty + qty, i.stock) }
              : i
          )
        : [...state.items, { ...item, qty: Math.min(qty, item.stock) }];
      return { items: next };
    }
    case "REMOVE": {
      return { items: state.items.filter((i) => i.id !== action.payload) };
    }
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalQty = useMemo(
    () => state.items.reduce((acc, i) => acc + i.qty, 0),
    [state.items]
  );
  const totalAmount = useMemo(
    () => state.items.reduce((acc, i) => acc + i.qty * i.price, 0),
    [state.items]
  );

  const addToCart = (item, qty) => dispatch({ type: "ADD", payload: { item, qty } });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const value = { ...state, addToCart, removeFromCart, clearCart, totalQty, totalAmount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
