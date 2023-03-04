import { useSelector } from "react-redux";
import Navbar from "./common/components/Navbar";
import Cart from "./features/shop/views/Cart";
import Home from "./features/shop/views/Home";
import Todo from "./features/todo/views/Todo";
import Anime from "./features/anime/views/Anime";
function App() {
  const view = useSelector((state) => state.view);
  return (
    <div>
      <Navbar />
      {view === "cart" ? (
        <Cart />
      ) : view === "todo" ? (
        <Todo />
      ) : view === "anime" ? (
        <Anime />
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
