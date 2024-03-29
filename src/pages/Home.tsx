import qs from "qs";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Categories,
  Pagination,
  PizzaBlock,
  PizzaLoader,
  SortPopup,
} from "../components";
import { popupCategory } from "../components/Sort";
import { selectFilter } from "../redux/slices/filter/selectors";
import {
  setCategoryId,
  setCurentPage,
  setFilters,
} from "../redux/slices/filter/slice";
import { selectPizzas } from "../redux/slices/pizza/selectors";
import { fetchPizzas } from "../redux/slices/pizza/slice";
import { SearchPizzaParams } from "../redux/slices/pizza/types";

import { RootState, useAppDispatch } from "../redux/store";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzas);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const sortType = useSelector(
    (state: RootState) => state.filter.sort.sortValue
  );

  const onClickCategory = React.useCallback(
    (i: number) => {
      dispatch(setCategoryId(i));
    },
    [dispatch]
  );

  const onChangePage = (page: number) => {
    dispatch(setCurentPage(page));
  };
  const getPizzas = async () => {
    const sortProperty = sortType.replace("-", "");
    const orderProperty = sortType.includes("-") ? "desc" : "asc";
    const categoryAllProperty = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `&search=${searchValue}` : ``;

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        sortProperty,
        orderProperty,
        categoryAllProperty,
        search,
      })
    );
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
      const urlParams = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;
      const sort = popupCategory.find(
        (obj) => obj.sortValue === urlParams.sortProperty
      );

      dispatch(
        setFilters({
          //...urlParams,
          searchValue: urlParams.search,
          categoryId: Number(urlParams.categoryAllProperty),
          currentPage: Number(urlParams.currentPage),
          sort: sort || popupCategory[0],
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
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(4)].map((_, i) => <PizzaLoader key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading" ? skeleton : pizzas}
      </div>
      <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </div>
  );
};
