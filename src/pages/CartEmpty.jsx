import React from "react";
import { Link } from "react-router-dom";
import pic from "../assets/img/empty-cart.png";
const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        {" "}
        Корзина пуста <icon> :(</icon>{" "}
      </h2>
      <p>Для того, чтобы заказать пиццу, перейдите на главную страницу.</p>
      <img src={pic} alt="empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
