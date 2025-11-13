import React, { useContext } from 'react';
import styles from '../sidebar/sidebar.module.scss';
import { sidebarContext } from '../../contexts/sidebar.context';
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import GlobalSearch from '../searchBar/search-bar';
import ShoppingCart from '../cart/shopping-cart';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/features/user-slice';
import useShoppingCart from '../../hooks/use-shopping-cart';


export const Sidebar = () => {
  const { is_sidebar, sidebarClose } = useContext(sidebarContext);
   const { clearCart } = useShoppingCart();

  const sidebarClass = is_sidebar ? `${styles.sidebar_container} ${styles.active}` : styles.sidebar_container;
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch()
  console.log(isLogin)
  const signOut = () => {
    dispatch(removeUser());
    clearCart()
  }

  return (
    <aside className={sidebarClass}>
      <span className={styles.close_sidebar_icon} onClick={sidebarClose}><RxCross1 /></span>
      <div className={styles.sidebar_content_container}>
         <div className={styles.global_search_wrapper}>
           <GlobalSearch></GlobalSearch>
         </div>
         <div className={styles.shopping_cart_container}>
            <h5>My Shopping</h5>
           <ShoppingCart></ShoppingCart>
           </div>
      <div className={styles.nav_link_container}>
      <ul>
            <li>
            <NavLink to='/' className={`nav-link active ${styles.nav_link_item}`}>Home</NavLink>
            </li>
            <li>
            <NavLink to='/contact' className={`nav-link active ${styles.nav_link_item}`}>Contact</NavLink>
            </li>
            <li>
            <NavLink to='/about' className={`nav-link active ${styles.nav_link_item}`}>About</NavLink>
            </li>
            <li>
            <NavLink to='/wishlist' className={`nav-link active ${styles.nav_link_item}`}>Wish List</NavLink>
            </li>
            {isLogin ? <li>
            <NavLink onClick={signOut} className={`nav-link active ${styles.nav_link_item}`}>Sign Out</NavLink>
            </li> :  <li>
            <NavLink to='/auth/signup' className={`nav-link active ${styles.nav_link_item}`}>Sign Up</NavLink>
            </li>}
            
           
          </ul>
      </div>
      </div>
    </aside>
  );
}

export default Sidebar;