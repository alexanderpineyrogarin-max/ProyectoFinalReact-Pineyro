import { useState } from "react";
import { seedProductsToFirestore } from "../../services/products";

export default function Seed() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSeed = async () => {
    setStatus("loading");
    setMessage("");
    try {
      const count = await seedProductsToFirestore();
      setStatus("done");
      setMessage(`✅ Cargados/actualizados ${count} productos en Firestore.`);
    } catch (e) {
      setStatus("error");
      setMessage(`❌ No se pudo sembrar: ${e.message}`);
    }
  };

  return (
    <section>
      <h1>Sembrar productos</h1>
      <p>Este asistente sube los productos de ejemplo a la colección <code>products</code> de Firestore.</p>
      <button onClick={handleSeed} className="btn" disabled={status==="loading"}>
        {status==="loading" ? "Sembrando…" : "Sembrar ahora"}
      </button>
      {message && <p style={{marginTop: '1rem'}}>{message}</p>}
    </section>
  );
}
