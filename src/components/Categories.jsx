import React from "react";

export function Categories({ value, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, key) => (
          <li
            key={key}
            onClick={() => onClickCategory(key)}
            className={value === key ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
