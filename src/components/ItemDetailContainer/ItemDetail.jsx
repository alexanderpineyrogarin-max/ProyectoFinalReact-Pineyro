import { useState } from "react";
import ItemCount from "../ItemCount/ItemCount.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { money } from "../../utils/formatters.js";
import { Link } from "react-router-dom";

export default function ItemDetail({ item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false); // ocultar ItemCount tras agregar

  const onAdd = (qty) => {
    addToCart(item, qty);
    setAdded(true);
  };

  return (
    <article className="detail">
      <img src={item.thumbnail} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <p>{money(item.price)}</p>
        <p>Stock: {item.stock}</p>
        {!added ? (
          <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
        ) : (
          <div className="actions">
            <Link to="/cart" className="btn">Ir al carrito</Link>
            <Link to="/" className="btn btn-outline">Seguir comprando</Link>
          </div>
        )}
      </div>
    </article>
  );
}
