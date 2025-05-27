import React, { useEffect, useState } from "react";
import styles from "./category.module.scss";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import baseURL from "../../services/constant";

const CategoryCard = () => {
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
   
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

    const deleteCategory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.delete(
      `${baseURL}/category/api/del-category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Category Deleted Successfully");
      setCategory((prevCategory) =>
        prevCategory.filter((item) => item._id !== id)
      );
    } else {
      console.log("Category Deletion Failed");
    }
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    alert("An error occurred while deleting the category");
  }
};


   useEffect(() => {
    getCategories()
    getProducts()
   }, [])

  return (
   <>
  {
    category.map((item, index) => {
      const count = product.filter(prod => prod.categoryId === item._id).length;

      return (
        <tr key={index} className={styles.table_row}>
          <td>
            <div className={styles.img_container}>
              <img src={item.image} className={styles.product_img} alt="Product" />
            </div>
          </td>
          <td className={`${styles.text_cell} ${styles.title}`}>{item.name}</td>
          <td className={styles.text_cell}>{count}</td> {/* ✅ yahan category.length nahi, count dikhana hai */}
          <td className={styles.text_cell}>
            <MdDeleteForever onClick={() => deleteCategory(item._id)} className={styles.del_btn} />
          </td>
        </tr>
      );
    })
  }
</>

    );
  };
  
  export default CategoryCard;