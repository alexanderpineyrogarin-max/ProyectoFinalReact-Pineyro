import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../services/products.js";
import ItemDetail from "./ItemDetail.jsx";

export default function ItemDetailContainer() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProductById(itemId)
      .then(setItem)
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p>Cargando detalle…</p>;
  if (!item) return <p>Producto sin stock o inexistente.</p>;

  return <ItemDetail item={item} />;
}
