import { Link, NavLink } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget.jsx";

export default function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">PineyShop</Link>
      <nav>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/category/electronica">Electrónica</NavLink>
        <NavLink to="/category/moda">Moda</NavLink>
        <NavLink to="/category/hogar">Hogar</NavLink>
        <NavLink to="/cart">Carrito</NavLink>
      </nav>
      <CartWidget />
    </header>
  );
}
