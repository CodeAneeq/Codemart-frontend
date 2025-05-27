import React, { useEffect, useState } from "react";
import styles from "./rating.module.scss";
import { MdDeleteForever } from "react-icons/md";
import ProductImage from "../../assets/imgs/pc1.png";
import baseURL from "../../services/constant";
import axios from "axios";

const RatingCard = () => {
   const [rating, setRating] = useState([]);
   const [product, setProduct] = useState([]);
   
     const getProducts = async () => {
       try {
         const response = await axios.get(`${baseURL}/product/api/get-products`);         
         setProduct(response.data.data);
       } catch (error) {
         console.error("Error fetching products:", error);
       }
     };

  const getRating = async () => { 
     try {
       const token = localStorage.getItem("token");
       let response = await axios.get(`
        ${baseURL}/rating/api/get-ratings`, 
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
       let data = response.data.data;

       
       console.log(data);
       setRating(data)
      } catch (error) {
        console.log(error);
      }
    }

    const deleteRating = async (ratingId) => {
  try {
    const token = localStorage.getItem("token");
    let response = await axios.delete(
      `${baseURL}/rating/api/del-rating/${ratingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Review Deleted Successfully");
      setRating((prevRating) =>
        prevRating.filter((item) => item._id !== ratingId)
      );
    } else {
      console.log("Review Deletion Failed");
    }
  } catch (error) {
    console.error("Delete error:", error.response?.data || error.message);
    alert("An error occurred while deleting the category");
  }
};

    useEffect(() => {
      getRating();
      getProducts()
    }, [])

  return (
    <>
  {rating.map((item, index) => {
    const products = product.find(
      product => product._id === item.productId
    );
    console.log(products);
    

    return (
      <tr key={index} className={styles.table_row}>
        <td>
          <div className={styles.img_container}>
            <img
              className={styles.product_img}
              src={products?.images[0]} // You can replace this with orderedProduct.image if you want
              alt="Product"
            />
          </div>
        </td>
        <td className={`${styles.text_cell} ${styles.title}`}>
          {products?.name}
        </td>
        <td className={styles.text_cell}>
          {item.category || "Mobiles"}
        </td>
        <td className={styles.text_cell}>
          {item.review.length > 10 ? item.review.slice(0, 10) + "..." : item.review}
        </td>
        <td className={styles.text_cell}>{item.rating}</td>
        <td className={styles.text_cell}>
          <MdDeleteForever className={styles.del_btn} onClick={() => deleteRating(item._id)}/>
        </td>
      </tr>
    );
  })}
</>

    );
  };
  
  export default RatingCard;