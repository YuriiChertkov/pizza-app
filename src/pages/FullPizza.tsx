import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://628e0b22368687f3e70f5438.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Такой пиццы не существует");
        navigate("/");
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
      <Link to='/'>
        <button className='button button--outline button--add'>
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};
