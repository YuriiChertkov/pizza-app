import { CartItem } from "../redux/slices/cart/types";
import { calcTotalPriceCart } from "./calcTotalPriceCart";

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPriceCart(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
