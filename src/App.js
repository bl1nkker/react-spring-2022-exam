import { useSelector } from "react-redux";
import Navbar from "./common/components/Navbar";
import Cart from "./features/shop/views/Cart";
import Home from "./features/shop/views/Home";
function App() {
  const view = useSelector((state) => state.view);
  return (
    <div>
      <Navbar />
      {view === "cart" ? <Cart /> : <Home />}
    </div>
  );
}

export default App;
