import React from "react";
import { Categories } from "../components/Categories";
import Pagination from "../components/Pagination";
import { PizzaBlock } from "../components/PizzaBlock";
import { PizzaLoader } from "../components/PizzaBlock/Loader";
import { Sort } from "../components/Sort";

export const Home = ({ searchValue }) => {
  const [pizzasItems, setPizzasItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [category, setCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortValue: "rating",
  });

  React.useEffect(() => {
    const sortProperty = sortType.sortValue.replace("-", "");
    const orderProperty = sortType.sortValue.includes("-") ? "desc" : "asc";
    const categoryAllProperty = category > 0 ? `category=${category}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    setIsLoading(true);
    fetch(
      `https://628e0b22368687f3e70f5438.mockapi.io/items?page=${currentPage}
      &limit=4&${categoryAllProperty}
      &sortBy=${sortProperty}&order=${orderProperty}${search}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPizzasItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortType, searchValue, currentPage]);

  const pizzas = pizzasItems
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(4)].map((_, i) => <PizzaLoader key={i} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={category}
          onClickCategory={(id) => setCategory(id)}
        />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  );
};
