import React, { useState } from "react";
import styles from "./admin.module.scss";
import AdminLayout from "../../components/layouts/admin-layout";
import { ContactInput } from "../../components/inputs/contact-input";
import PrimaryBtn from "../../components/buttons/primary-btn";
import axios from "axios";
import baseURL from "../../services/constant";

const AdminAddProductPage = () => {
    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState('');
    const [details, setDetails] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('')
    const [err, setErr] = useState()
    const [loader, setLoader] = useState(false);
    
    const createProduct = async (e) => {
       e.preventDefault();
    setLoader(true)
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('details', details);
      images.forEach((image) => {
        formData.append('images', image);
      });
      formData.append('price', price.toString());
      formData.append('stock', stock.toString());
      formData.append('categoryId', categoryId.toString());
      
      const token = localStorage.getItem("token"); // if token is required
      
      const response = await axios.post(
        `${baseURL}/product/api/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // optional
          },
        }
      );
      
      console.log("Product Created Successfully", response.data);
      alert("Product added!");
      // Reset inputs
      setLoader(false)
     setName('');
setPrice('');
setCategoryId('');
setStock('');
setDetails('');
setImages([]);

    } catch (error) {
      console.log("Error:", error.message);
      setErr(error?.response?.data?.message)
      setLoader(false)
    }
    setErr("")
  };


    

  return (
    <AdminLayout>
      <div className={`${styles.create_product}`}>
        <h1>Add New Product</h1>
        <div className={styles.input_section_product}>
          <div className={styles.input_section_row}>
<input
  type="file"
  className={styles.file_input}
  multiple
  onChange={(e) => setImages([...e.target.files])}
/>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Product Name"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                // width: "100%",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></ContactInput>
            <ContactInput
              placeholder={"Product Price"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                // width: "100%",
              }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></ContactInput>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Product Details"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                // width: "100%",
              }}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></ContactInput>
          </div>
          <div className={styles.input_section_row}>
            <ContactInput
              placeholder={"Category"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                // width: "100%",
              }}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            ></ContactInput>
            <ContactInput
              placeholder={"Stock"}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                // width: "100%",
              }}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            ></ContactInput>
          </div>
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <PrimaryBtn loading={loader ? true : false} disabled={loader ? true : false} onClick={createProduct}>
            Add Product
          </PrimaryBtn>
          {err && <div className="text-danger" style={{textAlign: 'start', marginTop: '10px'}}><small>{err}</small></div>}
        </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddProductPage;
