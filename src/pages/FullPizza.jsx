import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://628e0b22368687f3e70f5438.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("error");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className='container'>
        <h2>Загрузка ... </h2>
      </div>
    );
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='Pizza' />
      <h2> {pizza.title}</h2>
      <p>Попробуй эту вкусную пиццу </p>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};
