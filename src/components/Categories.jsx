import React, { useState } from "react";

export function Categories() {
  const [active, setActive] = useState(0);
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onClickActive = (i) => {
    return setActive(i);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, key) => (
          <li
            key={key}
            onClick={() => onClickActive(key)}
            className={active === key ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
