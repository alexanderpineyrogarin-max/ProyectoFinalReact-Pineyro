import Item from "../Item/Item.jsx";

export default function ItemList({ items }) {
  return (
    <div className="grid">
      {items.map((it) => (
        <Item key={it.id} item={it} />
      ))}
    </div>
  );
}
