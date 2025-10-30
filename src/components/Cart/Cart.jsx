import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import CartItem from "./CartItem.jsx";
import { money } from "../../utils/formatters.js";

export default function Cart() {
  const { items, totalAmount, clearCart } = useCart();

  if (!items.length) {
    return (
      <section>
        <h1>Carrito vacío</h1>
        <Link to="/">Ir a comprar</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Tu carrito</h1>
      {items.map((it) => (
        <CartItem key={it.id} item={it} />
      ))}
      <h2>Total: {money(totalAmount)}</h2>
      <div className="actions">
        <button onClick={clearCart} className="btn btn-outline">Vaciar</button>
        <Link to="/checkout" className="btn">Ir al pago</Link>
      </div>
    </section>
  );
}
