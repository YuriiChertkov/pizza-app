import React from "react";
import { Categories } from "../components/Categories";
import { PizzaBlock } from "../components/PizzaBlock";
import { PizzaLoader } from "../components/PizzaBlock/Loader";
import { Sort } from "../components/Sort";

export const Home = ({ searchValue }) => {
  const [pizzasItems, setPizzasItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [category, setCategory] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);
  React.useEffect(() => {
    setIsLoading(true);
    fetch("https://628e0b22368687f3e70f5438.mockapi.io/items?category="+ category)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPizzasItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortType]);

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
        <Categories value={category} onClickCategory={(key) => setCategory(key)}/>
        <Sort value={sortType} onClickSort={(key) => setSortType(key)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
    </div>
  );
};
