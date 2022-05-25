import React, { useState, useEffect } from "react";
import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { PizzaBlock } from "./components/PizzaBlock";
import { Sort } from "./components/Sort";
import "./scss/app.scss";

function App() {
  const [pizzasItems, setPizzasItems] = useState([]);
  useEffect(() => {
    fetch("https://628e0b22368687f3e70f5438.mockapi.io/items")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPizzasItems(json);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzasItems.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
