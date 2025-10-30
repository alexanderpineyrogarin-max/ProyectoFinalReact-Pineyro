import { Link } from "react-router-dom";
import { money } from "../../utils/formatters.js";

export default function Item({ item }) {
  return (
    <article className="card">
      <img src={item.thumbnail} alt={item.title} />
      <div className="card-body">
        <h3>{item.title}</h3>
        <p>{money(item.price)}</p>
        <Link to={`/item/${item.id}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
