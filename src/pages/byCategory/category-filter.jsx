// import React, { useEffect, useState } from 'react'
// import PageLayout from '../../components/layouts/page-layout'
// import axios from 'axios';
// import baseURL from '../../services/constant';
// import { useParams } from 'react-router-dom';
// import styles from './category-filter.module.scss'
// import ProductCard from '../../components/cards/product-card';
// import SectionHeading from '../../components/section-headings/section-heading';

// const CategoryFilter = () => {
//     const { id } = useParams(); // ✅ sahi syntax
    
//   const [product, setProduct] = useState([]);
//   const [category, setCategory] = useState([])
  
//   const getProducts = async () => { 
//       try {
//           let response = await axios.get(`${baseURL}/product/api/get-products`);
//           let data = response.data.data;
          
//           console.log(data);
//           setProduct(data)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//   const getCategory = async () => { 
//       try {
//           let response = await axios.get(`${baseURL}/category/api/get-category`);
//           let data = response.data.data;
          
//           console.log(data);
//           setCategory(data)
//         } catch (error) {
//             console.log(error);
//         }
//     }
    
//     useEffect(() => {
//         getProducts();
//         getCategory()
//     }, [])
//     let categ = category.find((item) => item._id === id);
//     let categoryFilter = product.filter((i) => i.categoryId === id);
//   return (
//     <PageLayout>
//         <div className={`${styles.category_filter_section}`}>
//              <SectionHeading style={{marginLeft: '70px', marginTop: '50px'}} title={categ?.name}>
//             Filter By Category
//           </SectionHeading>
//             <div className='d-flex flex-wrap justify-content-center justify-content-md-between mt-4 m-5 p-3'>
//         {
//             categoryFilter.map((item) => (
//                  <div className='mb-5'>
//             <ProductCard data={item} />
//           </div>
//                 //  <ProductCard data={item}></ProductCard>
//             )    
// )
//         }
//         </div>
//         </div>
//     </PageLayout>
//   )
// }

// export default CategoryFilter

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageLayout from '../../components/layouts/page-layout';
import baseURL from '../../services/constant';
import styles from './category-filter.module.scss';
import ProductCard from '../../components/cards/product-card';
import SectionHeading from '../../components/section-headings/section-heading';
import Loader from '../../components/loader/loader';

const CategoryFilter = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`${baseURL}/product/api/get-products`),
          axios.get(`${baseURL}/category/api/get-category`)
        ]);
        setProduct(productRes.data.data || []);
        setCategory(categoryRes.data.data || []);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const currentCategory = category.find((item) => item._id === id);
  const categoryFilter = product.filter((i) => i.categoryId === id);

  return (
    <PageLayout>
      <div className={`container my-5 pt-5`}>
        <SectionHeading title={currentCategory?.name || 'Category'}>
          Filter By Category
        </SectionHeading>

        <div className={`container mt-5 ${styles.cate_container}`}>
          {loading ? (
            "LOADING...."
          ) : categoryFilter.length === 0 ? (
            <p>No products found in this category.</p>
          ) : (
            <div className={`d-flex flex-wrap justify-content-center gap-3 ${styles.customRow}`}>
              {categoryFilter.map((item) => (
                <div key={item._id} className={styles.cardWrapper}>
                  <ProductCard data={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryFilter;
