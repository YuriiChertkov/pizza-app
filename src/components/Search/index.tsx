import debounce from "lodash.debounce";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

import styles from "./Search.module.scss";

export const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState("");
  const inputElement = React.useRef<HTMLInputElement>(null);
  const onClearSearch = () => {
    dispatch(setSearchValue(query));
    setQuery("");
    /*  if (inputElement.current) {
      inputElement.current.focus();
    } */
    inputElement.current?.focus();
  };

  const debouncedChangeHandler = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );
  const changeHandler = (event: any) => {
    setQuery(event.target.value);
    debouncedChangeHandler(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground='new 0 0 32 32'
        id='Glyph'
        version='1.1'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
          id='XMLID_223_'
        />
      </svg>
      <input
        ref={inputElement}
        value={query}
        onChange={changeHandler}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {query && (
        <svg
          onClick={onClearSearch}
          className={styles.clearIcon}
          viewBox='0 0 512 512'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title />
          <g data-name='1' id='_1'>
            <path d='M257,461.46c-114,0-206.73-92.74-206.73-206.73S143,48,257,48s206.73,92.74,206.73,206.73S371,461.46,257,461.46ZM257,78C159.55,78,80.27,157.28,80.27,254.73S159.55,431.46,257,431.46s176.73-79.28,176.73-176.73S354.45,78,257,78Z' />
            <path d='M342.92,358a15,15,0,0,1-10.61-4.39L160.47,181.76a15,15,0,1,1,21.21-21.21L353.53,332.4A15,15,0,0,1,342.92,358Z' />
            <path d='M171.07,358a15,15,0,0,1-10.6-25.6L332.31,160.55a15,15,0,0,1,21.22,21.21L181.68,353.61A15,15,0,0,1,171.07,358Z' />
          </g>
        </svg>
      )}
    </div>
  );
};
