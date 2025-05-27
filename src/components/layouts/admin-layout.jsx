import React from 'react'
import TopBar from '../../components/headers/top-bar.jsx'
import Navbar from '../../components/headers/navbar.jsx';
import Footer from '../../components/footer/footer.jsx'
import styles from './layouts.module.scss'
import Sidebar from '../sidebar/sidebar.jsx';
import { NavLink } from 'react-router-dom';
import AdminSidebar from '../sidebar/admin-sidebar.jsx';

const AdminLayout = ({children}) => {
  return (
    <>
    <div className={`${styles.admin_layout_container}`}>
        <div>
          <AdminSidebar></AdminSidebar>
        </div>
        <div className={`${styles.admin_layout_children}`}>{children}</div>
    </div>
    </>
  )
}

export default AdminLayout