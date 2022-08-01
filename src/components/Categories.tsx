import React from "react";

type CategotiesProps = {
  value: number;
  onClickCategory: (value: number) => void;
};
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
export const Categories: React.FC<CategotiesProps> = React.memo(
  ({ value, onClickCategory }) => {
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
);
