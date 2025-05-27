import React from 'react';
import styles from './MyOrderCard.module.scss';
import img from '../../assets/imgs/p1.png'

const MyOrderCard = (props) => {
  return (
    <div className={styles.orderCard}>
      <div className={styles.orderImage}>
        <img src={props.image} alt="Order Item" />
      </div>
      <div className={styles.orderDetails}>
        <div className={styles.orderId}>
          <span>Order ID:</span> <strong style={{fontSize: '6px'}}>{props.orderId}</strong>
          <br />
          <span>Status:</span> <strong style={{fontSize: '6px'}}>{props.status}</strong>
        </div>
        <div className={styles.orderItems}>
          {props.name} 
        </div>
        <div>
            {props.details}
        </div>
        <div className={styles.orderPrice}>Rs {props.price || 0}</div>
      </div>
      <div className={styles.arrow}>
        &#8250;
      </div>
    </div>
  );
};

export default MyOrderCard;
