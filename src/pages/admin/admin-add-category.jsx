import React, { useState } from 'react';
import styles from './admin.module.scss';
import AdminLayout from '../../components/layouts/admin-layout';
import PrimaryBtn from '../../components/buttons/primary-btn';
import { ContactInput } from '../../components/inputs/contact-input';
import axios from 'axios';
import baseURL from '../../services/constant';

const AdminAddCategoryPage = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [err, setErr] = useState()

  const createCategory = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      
      const token = localStorage.getItem("token"); // if token is required
      
      const response = await axios.post(
        `${baseURL}/category/api/create-category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // optional
          },
        }
      );
      
      console.log("Category Created Successfully", response.data);
      alert("Category added!");
      // Reset inputs
      setLoader(false)
      setName('');
      setImage(null);
    } catch (error) {
      console.log("Error:", error.message);
      setErr(error?.response?.data?.message)
      setLoader(false)
    }
  };

  return (
    <AdminLayout>
      <div className={styles.create_category}>
        <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px' }}>
          Add New Category
        </h1>
        <div className={styles.input_section}>
          <div className={styles.input_section_one}>
            <label className={styles.label}>Upload Image</label>
            <input
              type="file"
              className={styles.file_input}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={styles.input_section_one}>
            <label className={styles.label}>Category Name</label>
            <input
              type="text"
              className={styles.text_input}
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <PrimaryBtn loading={loader ? true : false} disabled={loader ? true : false} onClick={createCategory}>
              Add Category
            </PrimaryBtn>
             {err && <div className="text-danger" style={{textAlign: 'start', marginTop: '10px'}}><small>{err}</small></div>}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAddCategoryPage;
