import React, { useEffect, useState } from 'react'
import styles from './admin.module.scss'
import AdminLayout from '../../components/layouts/admin-layout'
import baseURL from '../../services/constant'
import axios from 'axios'
import OrderCard from '../../components/adminComponents/order-page'
import ProductCard from '../../components/adminComponents/product-card'
import PrimaryBtn from '../../components/buttons/primary-btn'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [users, setUsers] = useState([])
  const [totalProduct, setTotalProducts] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  
  const pageSize = 5; // Fixed limit of 5 orders/products per page

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

  const getCategories = async () => {
    try {
      let response = await axios.get(`${baseURL}/category/api/get-category`);
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async (page = 1) => {
    try {
      let response = await axios.get(`${baseURL}/product/api/get-products?page=${page}&size=${pageSize}`);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getOrders = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.get(`${baseURL}/order/api/get-order?page=${page}&size=${pageSize}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductCount = async () => {
  try {
    let response = await axios.get(`${baseURL}/product/api/get-products`);
    console.log(response);
    
    setTotalProducts(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
  const getOrdersCount = async () => {
  try {
        const token = localStorage.getItem("token");
    let response = await axios.get(`${baseURL}/order/api/get-order`, {
        headers: {
          Authorization: `Bearer ${token}`,  // ✅ FIXED
        },
      });
    setTotalOrders(response.data.data.length);
  } catch (error) {
    console.log(error);
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
    getProducts(1); 
    getOrders(1); 
    getUsers();
    getCategories();
    getProductCount();
    getOrdersCount();
    // getOrders(currentOrderPage);
  }, []);

  // Slice orders if showAllOrders is false
  // const visibleOrders = showAllOrders ? orders : orders.slice(0, pageSize);

  return (
    <AdminLayout>
      {/* Overview Table */}
      <table className={`${styles.adminTableContainer} ${styles.dashboard_one}`}>
        <thead className={`${styles.adminTable}`}>
          <tr>
            <th>Total Orders</th>
            <th>Total Products</th>
            <th>Total Categories</th>
            <th>Pending Orders</th>
          </tr>
        </thead>
        <tbody className={`${styles.table_category_body}`}>
          <tr>
            <td className={`${styles.dashboard_td}`}>{totalOrders}</td>
            <td className={`${styles.dashboard_td}`}>{totalProduct.length}</td>
            <td className={`${styles.dashboard_td}`}>{category.length}</td>
            <td className={`${styles.dashboard_td}`}>
              {orders.filter((item) => item.status === 'Pending').length}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Recent Product Table */}
      <div className={`${styles.dashboard_product_orders}`}>
        <h3 style={{marginLeft: '10px'}}>Recent Orders</h3>
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
              {orders.map((item) => {
       const orderedProduct = products.find(
            product => product._id === item.products[0].id
          );
          const userName = users.find(user => user?._id === item?.userId);
        return  <OrderCard _id={item?._id} image={orderedProduct?.images[0]} orderName={orderedProduct?.name} userName={userName?.name} totalAmount={item?.totalAmount} status={item?.status} onStatusChange={handleStatusChange} address={item?.address}/>
        
      })}
          </tbody>
        </table>

      <div className={`${styles.btn_dash_div}`} style={{width: '20%'}}>
        <NavLink to={'/admin/orders'}>
        <PrimaryBtn >View All Orders</PrimaryBtn>
        </NavLink>
      </div>
      </div>

      {/* Recent Product Table */}
      <div className={`${styles.dashboard_product_orders}`}>
        <h3 style={{marginLeft: '10px'}}>Recent Products</h3>
        <table className={`${styles.adminTableContainer}`}>
          <thead className={`${styles.adminTable}`}>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className={`${styles.table_category_body}`}>
              {products.map((item) => {
        const categName = category.find(cat => cat._id === item.categoryId);
        return (
          <ProductCard
            key={item._id}
            img={item.images[0]}
            name={item.name}
            categoryName={categName?.name}
            price={item.price}
            stock={item.stock}
          />
        );
      })}
          </tbody>
        </table>

      <div className={`${styles.btn_dash_div}`} style={{width: '20%'}}>
        <NavLink to={'/admin/products'}>
        <PrimaryBtn >View All Products</PrimaryBtn>
        </NavLink>
      </div>


      </div>
    </AdminLayout>
  );
};

export default Dashboard;

