import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../App";
import { Categories } from "../components/Categories";
import Pagination from "../components/Pagination";
import { PizzaBlock } from "../components/PizzaBlock";
import { PizzaLoader } from "../components/PizzaBlock/Loader";
import { Sort } from "../components/Sort";
import { setCategoryId } from "../redux/slices/filterSlice";

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortValue);
  const dispatch = useDispatch();

  const { searchValue } = React.useContext(AppContext);
  const [pizzasItems, setPizzasItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const sortProperty = sortType.replace("-", "");
    const orderProperty = sortType.includes("-") ? "desc" : "asc";
    const categoryAllProperty = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    setIsLoading(true);
    fetch(
      `https://628e0b22368687f3e70f5438.mockapi.io/items?page=${currentPage}&limit=4&${categoryAllProperty}&sortBy=${sortProperty}&order=${orderProperty}${search}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPizzasItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

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
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={(i) => dispatch(setCategoryId(i))}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeleton : pizzas}</div>
      <Pagination onPageChange={(number) => setCurrentPage(number)} />
    </div>
  );
};
