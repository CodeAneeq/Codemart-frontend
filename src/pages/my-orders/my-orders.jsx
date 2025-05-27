import React, { useEffect, useState } from 'react';
import styles from './my-orders.module.scss';
import PageLayout from '../../components/layouts/page-layout';
import MyOrderCard from '../../components/adminComponents/MyOrderCard';
import baseURL from '../../services/constant';
import axios from 'axios';


const MyOrders = () => {
  const [order, setOrder] = useState([]);

   const [product, setProduct] = useState([]);
  
    const getProducts = async () => { 
       try {
         let response = await axios.get(`${baseURL}/product/api/get-products`);
         let data = response.data.data;
         
         console.log(data);
         setProduct(data)
        } catch (error) {
          console.log(error);
        }
      }
  const getOrders = async () => {
     try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/order/api/get-order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      
      setOrder(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getOrders();
    getProducts()
  }, [])

  return (
    <PageLayout>
      <div className={styles.container}>
        <h2>My Orders</h2>
        {/* <div className={styles.orderList}>
          {
            order.map((item) => {
              const prod = product.find((pro) => pro._id === item.products[0].id)
              return <MyOrderCard image={prod?.images[0]} orderId={item._id} price={item.totalAmount} status={item?.status} name={prod?.name} details={prod?.details}></MyOrderCard>
            })
          }
        </div> */}
        <div className={styles.orderList}>
  {
    order.map((item) => {
      // item.products is an array of products in this order
      return item.products.map((prodItem, index) => {
        // prodItem.id ko use karke product details dhoondo
        const prod = product.find(p => p._id === prodItem.id);

        return (
          <MyOrderCard
            key={`${item._id}-${prodItem.id}`}  // unique key for each product in order
            image={prod?.images[0]}
            orderId={item._id}
            price={prodItem.price * prodItem.quantity}  // individual product price * qty
            status={item?.status}
            name={prod?.name}
            details={prod?.details}
            quantity={prodItem.quantity}  // agar quantity bhi dikhani ho
          />
        );
      });
    })
  }
</div>


      </div>
    </PageLayout>
  );
};

export default MyOrders;


// export default MyOrders