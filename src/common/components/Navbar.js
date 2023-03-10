import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeView } from "../../features/shop/store/products/actions";

export default function Navbar() {
  const dispatch = useDispatch();
  const changeViewHandler = (name) => {
    dispatch(changeView(name));
  };
  const cartItemNumber = useSelector((state) => state.cart.cartCount);
  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <div className="flex gap-4">
          <p
            onClick={() => changeViewHandler("todo")}
            className="navHome"
            style={{ cursor: "pointer" }}
            id="lws-home"
          >
            {" "}
            TODO App with Timer{" "}
          </p>
          <p
            onClick={() => changeViewHandler("anime")}
            className="navHome"
            style={{ cursor: "pointer" }}
            id="lws-home"
          >
            {" "}
            Anime Api{" "}
          </p>

          <p
            onClick={() => changeViewHandler("home")}
            className="navHome"
            style={{ cursor: "pointer" }}
            id="lws-home"
          >
            {" "}
            Shopshop{" "}
          </p>
          <p
            onClick={() => changeViewHandler("cart")}
            className="navCart"
            style={{ cursor: "pointer" }}
            id="lws-cart"
          >
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
            <span id="lws-totalCart">
              {cartItemNumber > 10 ? "10+" : cartItemNumber}
            </span>
          </p>
        </div>
      </div>
    </nav>
  );
}
