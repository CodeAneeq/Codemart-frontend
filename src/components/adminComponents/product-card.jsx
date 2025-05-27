import React from "react";
import styles from "./ProductCard.module.scss";
import { MdDeleteForever } from "react-icons/md";


const ProductCard = (props) => {
  return (
    <>
      <tr className={styles.table_row}>
        <td>
          <div className={styles.img_container}>
            <img className={styles.product_img} src={props.img} alt="Product" />
          </div>
        </td>
        <td className={`${styles.text_cell} ${styles.title}`}>{props.name}</td>
        <td className={styles.text_cell}>{props?.categoryName}</td>
        <td className={styles.text_cell}>Rs {props.price}</td>
        <td className={styles.text_cell}>{props.stock}</td>
        <td className={styles.text_cell}>
          <MdDeleteForever className={styles.del_btn} onClick={props.del} />
        </td>
      </tr>
    </>
  );
};

export default ProductCard;
