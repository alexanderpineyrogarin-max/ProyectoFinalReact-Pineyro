import NavBar from "./components/NavBar/NavBar.jsx";
import RoutesView from "./routes.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <RoutesView />
      </main>
    </>
  );
}
