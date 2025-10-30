import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { createOrder } from "../../services/orders.js";

export default function CheckoutForm() {
  const { items, totalAmount, clearCart } = useCart();
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    setLoading(true);
    try {
      const id = await createOrder({ buyer, items, total: totalAmount });
      setOrderId(id);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <section>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>
      {!items.length ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <form onSubmit={submit} className="form">
          <label>Nombre<input required value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} /></label>
          <label>Email<input required type="email" value={buyer.email} onChange={(e) => setBuyer({ ...buyer, email: e.target.value })} /></label>
          <label>Teléfono<input required value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} /></label>
          <button disabled={loading} className="btn">{loading ? "Procesando…" : "Confirmar compra"}</button>
        </form>
      )}
    </section>
  );
}
