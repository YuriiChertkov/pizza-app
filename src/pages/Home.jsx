import React from "react";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import { PizzaLoader } from "../components/PizzaBlock/Loader";
import { Sort } from "../components/Sort";

export const Home = ({ searchValue }) => {
  const [pizzasItems, setPizzasItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://628e0b22368687f3e70f5438.mockapi.io/items")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPizzasItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  const pizzas = pizzasItems
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(8)].map((_, i) => <PizzaLoader key={i} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
    </div>
  );
};
