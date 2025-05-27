import React from 'react'
import styles from './admin.module.scss'
import AdminLayout from '../../components/layouts/admin-layout'
import ProductCard from '../../components/adminComponents/product-card'
import CategoryCard from '../../components/adminComponents/category-card'

const AdminCategoryPage = () => {
  
  return (
    <AdminLayout>
        <table className={`${styles.adminTableContainer}`}>
      <thead className={`${styles.adminTable}`}>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Products</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className={`${styles.table_category_body}`}>
        <CategoryCard/>
      </tbody>
    </table>
    </AdminLayout>
  )
}

export default AdminCategoryPage