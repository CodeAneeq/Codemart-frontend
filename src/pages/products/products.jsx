import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/layouts/page-layout'
import styles from './products.module.scss'
import SectionHeading from '../../components/section-headings/section-heading'
import dummyData from '../../services/dummy-data.json'
import ProductCard from '../../components/cards/product-card'
import baseURL from '../../services/constant'
import axios from 'axios'

const ProductsPage = () => {

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

      useEffect(() => {
              getProducts()
            }, [])

  return (
    <PageLayout>
        <div className={`${styles.best_product_section} container my-5 py-5`}>
          <SectionHeading title={"This Month"}>
            Best Selling Products
          </SectionHeading>
        <div className='d-flex flex-wrap justify-content-center justify-content-md-between mt-4  p-3 gap-4'>
        {
          product.map((item)=>(
            <div  key={item.id} className='mt-5'>
            <ProductCard data={item} />
            </div>
          ))
        }
        </div>
        </div>
    </PageLayout>
  )
}

export default ProductsPage;