import React, { useEffect, useState } from "react";
import styles from "./order.module.scss";



const OrderCard = (props) => {

  return (
    <>
   
          <tr className={styles.table_row}>
            <td>
              <div className={styles.img_container}>
                <img
                  className={styles.product_img}
                  src={props?.image}
                  alt="Product"
                />
              </div>
            </td>
            <td className={`${styles.text_cell} ${styles.title}`}>
              {props?.orderName}
            </td>
            <td className={styles.text_cell}>{props?.userName}</td>
            <td className={styles.text_cell}>{props.totalAmount}</td>
            <td className={styles.text_cell}>{props.status}</td>
            <td className={styles.text_cell}>
              <select
                className={styles.text_input}
                value={props.status}
                onChange={(e) => props.onStatusChange(props._id, e.target.value)}
              >
                <option value="" disabled>Change Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipping">Shipping</option>
                <option value="Delivered">Delivered</option>
              </select>
            </td>
            <td className={styles.text_cell}>{props.address.email}</td>
            <td className={styles.text_cell}>{props.address.city}</td>
            <td className={styles.text_cell}>{props.address.state}</td>
            <td className={styles.text_cell}>{props.address.area}</td>
            <td className={styles.text_cell}>{props.address.postalCode}</td>
            <td className={styles.text_cell}>{props.address.phoneNumber}</td>
            <td className={styles.text_cell}>{props.address.completeAddress}</td>
          </tr>

    </>
  );
};

export default OrderCard;
