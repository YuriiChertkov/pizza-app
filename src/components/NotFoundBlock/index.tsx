import React from "react";
import styles from "./NotFound.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>
        <br />
        <img
          src='https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png'
          alt=''
        />
      </span>
    </h1>
  );
};
