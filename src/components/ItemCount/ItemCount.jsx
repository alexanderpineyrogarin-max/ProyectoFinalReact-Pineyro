import { useState } from "react";

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [qty, setQty] = useState(initial);

  const dec = () => setQty((q) => Math.max(1, q - 1));
  const inc = () => setQty((q) => Math.min(stock, q + 1));
  const add = () => {
    if (stock < 1) return;
    onAdd(qty);
  };

  if (stock < 1) return <p>Producto sin stock</p>;

  return (
    <div className="item-count">
      <button onClick={dec} aria-label="Restar">−</button>
      <output>{qty}</output>
      <button onClick={inc} aria-label="Sumar">+</button>
      <button onClick={add} className="btn">Agregar al carrito</button>
    </div>
  );
}
