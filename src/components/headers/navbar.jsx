import React, { useContext, useState } from "react";
import styles from "./navbar.module.scss";
import { NavLink } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import {sidebarContext}  from '../../contexts/sidebar.context'
import GlobalSearch from "../searchBar/search-bar";
import ShoppingCart from "../cart/shopping-cart";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/features/user-slice";
import CodeMart from "../../assets/imgs/CodeMart.png";
import useShoppingCart from "../../hooks/use-shopping-cart";

export const Navbar = () => {
 const { clearCart } = useShoppingCart();
  const {is_sidebar, sidebarOpen} = useContext(sidebarContext)
  const isLogin = useSelector(state => state.user.isLogin);
  const isAdmin = useSelector(state => state.user?.data?.role);
  const dispatch = useDispatch()
  console.log(isLogin)
  const signOut = () => {
    dispatch(removeUser());
    clearCart()
  }
  return (
    <>
     <Sidebar></Sidebar>
    <nav className={`navbar navbar-expand-lg  ${styles.app_navbar_container}`}>
      <div className="container">
        <a className="navbar-brand p-0" href="#">
          <img src={CodeMart} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" onClick={()=>sidebarOpen()}></span>
        </button>
        <div className="collapse navbar-collapse d-none" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className={`${styles.li} nav-item mx-3`}>
            <NavLink to='/' className={`nav-link active ${styles.nav_link_item}`}>Home</NavLink>
            </li>
            <li className={`${styles.li} nav-item mx-3`}>
            <NavLink to='/contact' className={`nav-link active ${styles.nav_link_item}`}>Contact</NavLink>
            </li>
            <li className={`${styles.li} nav-item mx-3`}>
            <NavLink to='/about' className={`nav-link active ${styles.nav_link_item}`}>About</NavLink>
            </li>
           { 
             isAdmin !== "admin" ? <li className={`${styles.li} nav-item mx-3`}>
            <NavLink to='/wishlist' className={`nav-link active ${styles.nav_link_item}`}>Wish List</NavLink>
            </li> : <></>}
            {
              isLogin ? isAdmin == 'admin' ? 
            <li className={`${styles.li} nav-item mx-3`}>
            <NavLink to='/admin/dashboard' className={`nav-link active ${styles.nav_link_item}`}>Dashboard</NavLink>
            </li> : 
            <li className={`${styles.li} nav-item mx-3`}>
            <NavLink to='/my-orders' className={`nav-link active ${styles.nav_link_item}`}>My Orders</NavLink>
            </li> : ""
            }
            {
              isLogin ? 
            <li className={`${styles.li} nav-item mx-3`}>
            <NavLink onClick={signOut} className={`nav-link active ${styles.nav_link_item}`}>Sign Out</NavLink>
            </li> : 
            <li className={`${styles.li} nav-item mx-3`}>
            <NavLink to='/auth/signup' className={`nav-link active ${styles.nav_link_item}`}>Sign Up</NavLink>
            </li>
            }
          </ul>
          <form className="d-flex align-items-center gap-4" role="search">
            <GlobalSearch></GlobalSearch>
            <ShoppingCart></ShoppingCart>
          </form>
        </div>
      </div>
    </nav>
          </>
  );
};

export default Navbar;
