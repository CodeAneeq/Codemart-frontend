import React, { useEffect, useState } from 'react'
import styles from './admin.module.scss'
import AdminLayout from '../../components/layouts/admin-layout'
import ProductCard from '../../components/adminComponents/product-card'
import baseURL from '../../services/constant'
import axios from 'axios'

const AdminProductPage = () => {
   const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
  
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
  
      const getCategories = async () => { 
       try {
         let response = await axios.get(`${baseURL}/category/api/get-category`);
         let data = response.data.data;
         
         console.log(data);
         setCategory(data);
        } catch (error) {
          console.log(error);
        }
      }
  
      const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      let response = await axios.delete(
        `${baseURL}/product/api/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Product Deleted Successfully");
        setProduct((prevCategory) =>
          prevCategory.filter((item) => item._id !== id)
        );
      } else {
        console.log("Product Deletion Failed");
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("An error occurred while deleting the category");
    }
  };
  
      useEffect(() => {
        getProducts();
        getCategories()
      }, [])
  
  
  return (
    <AdminLayout>
        <table className={`${styles.adminTableContainer}`}>
      <thead className={`${styles.adminTable}`}>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          product.map((item) => {
            const categName = category.find(category => category._id === item.categoryId );
           return <ProductCard img={item.images[0]} name={item.name} categoryName={categName?.name} price={item.price} stock={item.stock} del={() => deleteProduct(item._id)} />

          })
        }
      </tbody>
    </table>
    </AdminLayout>
  )
}

export default AdminProductPage
