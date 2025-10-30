import { useCart } from "../../context/CartContext.jsx";
import { money } from "../../utils/formatters.js";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();
  return (
    <article className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>Cantidad: {item.qty}</p>
        <p>Subtotal: {money(item.qty * item.price)}</p>
        <button onClick={() => removeFromCart(item.id)} className="btn btn-outline">Eliminar</button>
      </div>
    </article>
  );
}
