import React, { useContext } from 'react';
import styles from './admin-sidebar.module.scss';
import { sidebarContext } from '../../contexts/sidebar.context';
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import GlobalSearch from '../searchBar/search-bar';
import ShoppingCart from '../cart/shopping-cart';
import { MdDashboard, MdHome } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";


export const AdminSidebar = () => {

  return (
    <aside className={styles.sidebar_container}>
      <div className={styles.sidebar_content_container}>
      <div className={styles.nav_link_container}>
      <ul>
            <li>
            <NavLink to='/' className={`nav-link active ${styles.nav_link_item}`}><span><MdHome /></span>Home</NavLink>
            </li>
            <li>
            <NavLink to='/admin/dashboard' className={`nav-link active ${styles.nav_link_item}`}><span><MdDashboard /></span>Dashboard</NavLink>
            </li>
            <li>
            <NavLink to='/admin/products' className={`nav-link active ${styles.nav_link_item}`}><span><AiFillProduct /></span>Products</NavLink>
            </li>
            <li>
            <NavLink to='/admin/categories' className={`nav-link active ${styles.nav_link_item}`}><span><BiCategoryAlt /></span>Categories</NavLink>
            </li>
            <li>
            <NavLink to='/admin/orders' className={`nav-link active ${styles.nav_link_item}`}><span><FaShippingFast /></span>Orders</NavLink>
            </li>
            <li>
            <NavLink to='/admin/rating' className={`nav-link active ${styles.nav_link_item}`}><span><MdOutlineRateReview /></span>Rating</NavLink>
            </li>
            <li>
            <NavLink to='/admin/add-product' className={`nav-link active ${styles.nav_link_item}`}><span><AiFillProduct /></span>Add Product</NavLink>
            </li>
            <li>
            <NavLink to='/admin/add-category' className={`nav-link active ${styles.nav_link_item}`}><span><BiCategoryAlt /></span>Add Category</NavLink>
            </li>
          </ul>
      </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;