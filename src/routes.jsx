import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CheckoutForm from "./components/Checkout/CheckoutForm.jsx";
import Seed from "./components/Admin/Seed.jsx";

export default function RoutesView() {
  return (
    <Routes>
      <Route path="/" element={<ItemListContainer greeting="Catálogo" />} />
      <Route path="/category/:categoryId" element={<ItemListContainer />} />
      <Route path="/item/:itemId" element={<ItemDetailContainer />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/admin/seed" element={<Seed />} />
      <Route path="*" element={<ItemListContainer />} />
    </Routes>
  );
}
