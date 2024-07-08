import React from "react";
import styles from "./section.heading.module.scss";
import Rectangle from "../../assets/imgs/Rectangle.png";

const SectionHeading = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={Rectangle} alt="" />
        <p>{props.children}</p>
      </div>
        <h2 className={styles.title}>{props.title}</h2>
    </div>
  );
};

export default SectionHeading;
