import React from 'react'
import styles from './admin.module.scss'
import AdminLayout from '../../components/layouts/admin-layout'
import RatingCard from '../../components/adminComponents/rating-card'

const AdminRatingPage = () => {
  return (
    <AdminLayout>
        <table className={`${styles.adminTableContainer}`}>
      <thead className={`${styles.adminTable}`}>
        <tr>
          <th>Image</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Review</th>
          <th>Rating</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody className={`${styles.table_category_body}`}>
        <RatingCard/>
      </tbody>
    </table>
    </AdminLayout>
  )
}

export default AdminRatingPage