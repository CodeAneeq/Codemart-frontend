// import React from 'react'
// import PageLayout from '../../components/layouts/page-layout'
// import { useSearchParams } from 'react-router-dom';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
// import baseURL from '../../services/constant';
// import ProductCard from '../../components/cards/product-card';
// import SectionHeading from '../../components/section-headings/section-heading';

// const SearchResult = () => {
//     const [searchParams] = useSearchParams();
//     const [result, setResult] = useState([]);
//     const [loading, setLoading] = useState(false)
//     let query = searchParams.get('query');
    
//     if (!query) {
//         return
//     }
    
//     // setLoading(true);
    
//     const getResult = async () => {
//         setLoading(true)
//         try {
//             let response = await axios.get(`${baseURL}/product/api/search?search=${query}`);
//             console.log(response.data.data);  
//             setResult(response?.data?.data);
//         } catch (error) {
//             setLoading(false)
//             console.log(error);
//         }
//     }
//     useEffect(() => {
//         getResult()
//     }, [query])
    
//   return (
//     <PageLayout>
//         <div>
//         <div className={` container my-4 pt-5`}>
//                   <SectionHeading title={query}>
//                     Based on Your Search
//                   </SectionHeading>
//         </div>
//         <div className='container d-flex flex-wrap justify-content-around justify-content-md-between mt-4 m-5 p-3'>
//         {
//             result.map((item) => {
//                 return <ProductCard data={item}></ProductCard>
//             })
//         }
//         </div>
//         </div>
//     </PageLayout>
//   )
// }

// export default SearchResult

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PageLayout from '../../components/layouts/page-layout';
import baseURL from '../../services/constant';
import ProductCard from '../../components/cards/product-card';
import SectionHeading from '../../components/section-headings/section-heading';
import styles from './search-result.module.scss'

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('query');

  useEffect(() => {
    const getResult = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/product/api/search?search=${query}`);
        setResult(response?.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      getResult();
    }
  }, [query]);

  if (!query) {
    return (
      <PageLayout>
        <div className="container my-5">
          <h3>No search query provided.</h3>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className={`container my-5 pt-5 ${styles.cate_container}`}>
        <SectionHeading title={query}>Based on Your Search</SectionHeading>

        {loading ? (
          <p>Loading...</p>
        ) : result.length === 0 ? (
          <p>No products found for "{query}".</p>
        ) : (
         <div className={`d-flex flex-wrap justify-content-center gap-3 ${styles.custsomRow}`}>
  {result.map((item) => (
    <div key={item._id} className={styles.cardWrapper}>
      <ProductCard data={item} />
    </div>
  ))}
</div>
        )}
      </div>
    </PageLayout>
  );
};

export default SearchResult;
