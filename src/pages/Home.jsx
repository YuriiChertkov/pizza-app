import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../App";
import { Categories } from "../components/Categories";
import Pagination from "../components/Pagination";
import { PizzaBlock } from "../components/PizzaBlock";
import { PizzaLoader } from "../components/PizzaBlock/Loader";
import { popupCategory, Sort } from "../components/Sort";
import {
  setCategoryId,
  setCurentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const items = useSelector((state) => state.pizza.items);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortValue);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { searchValue } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = React.useCallback(
    (i) => {
      dispatch(setCategoryId(i));
    },
    [dispatch]
  );

  const onChangePage = (page) => {
    dispatch(setCurentPage(page));
  };
  const getPizzas = async () => {
    const sortProperty = sortType.replace("-", "");
    const orderProperty = sortType.includes("-") ? "desc" : "asc";
    const categoryAllProperty = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    setIsLoading(true);

    /* await axios
      .get(
        `https://628e0b22368687f3e70f5438.mockapi.io/items?page=${currentPage}&limit=4&${categoryAllProperty}&sortBy=${sortProperty}&order=${orderProperty}${search}`
      )
      .then((response) => {
        setPizzasItems(response.data);
        setIsLoading(false);
      }); */

    try {
      dispatch(
        fetchPizzas({
          sortProperty,
          orderProperty,
          categoryAllProperty,
          search,
        })
      );
    } catch (error) {
      alert("Error with fetching pizzasItems");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const urlParams = qs.parse(window.location.search.substring(1));
      const sort = popupCategory.find(
        (obj) => obj.sortValue === urlParams.sortType
      );

      dispatch(
        setFilters({
          ...urlParams,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items
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
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </div>
  );
};
