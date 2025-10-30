import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../services/products.js";
import ItemList from "./ItemList.jsx";

export default function ItemListContainer({ greeting = "Catálogo" }) {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts(categoryId)
      .then(setItems)
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p>Cargando productos…</p>;
  if (!items.length) return <p>No hay productos en esta categoría.</p>;

  return (
    <section>
      <h1>{greeting}</h1>
      <ItemList items={items} />
    </section>
  );
}
