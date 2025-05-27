import React, { useEffect, useState } from 'react'
import styles from './admin.module.scss'
import AdminLayout from '../../components/layouts/admin-layout'
import CategoryCard from '../../components/adminComponents/category-card'
import axios from "axios";
import baseURL from "../../services/constant";
import OrderCard from '../../components/adminComponents/order-page'

const AdminOrdersPage = () => {
    const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/product/api/get-products`);
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/order/api/get-order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/user/api/get-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${baseURL}/order/api/change-status`,
      {
        orderId,
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,  // ✅ FIXED
        },
      }
    );

    if (response.data.status === "success") {
      getOrders(); // Refresh orders list after successful status update
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};


 

  useEffect(() => {
    getOrders();
    getProducts();
    getUsers();
  }, []);

  return (
<AdminLayout>
        <table className={`${styles.adminTableContainer}`}>
      <thead className={`${styles.adminTable}`}>
        <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>User Name</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Change Status</th>
          <th>Email</th>
          <th>City</th>
          <th>State</th>
          <th>Area</th>
          <th>Postal Code</th>
          <th>Phone Number</th>
          <th>Complete Address</th>
        </tr>
      </thead>
      <tbody className={`${styles.table_category_body}`}>
        {
          order.map((item) => {
          const orderedProduct = product.find(
            product => product._id === item.products[0].id
          );
          const userName = users.find(user => user?._id === item?.userId);
            return <OrderCard _id={item._id} image={orderedProduct?.images[0]} orderName={orderedProduct?.name} userName={userName?.name} totalAmount={item.totalAmount} status={item.status} onStatusChange={handleStatusChange} address={item.address}/>
          })
        }
      </tbody>
    </table>
    </AdminLayout>
  )
}

export default AdminOrdersPage