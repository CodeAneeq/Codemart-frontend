import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import  Loader  from "../components/loader/loader";
import AddressPage from "../pages/address/address";
import OrderSuccessPage from "../pages/address/order-success.jsx";
import CategoryFilter from "../pages/byCategory/category-filter.jsx";
import SearchResult from "../pages/search-result/search-result.jsx";


const HomePage = lazy(()=> import("../pages/home/home"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const SignUpPage = lazy(() => import("../pages/auth/signup"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/forget-password"));
const OtpVerifyPage = lazy(() => import("../pages/auth/otp-verify"));
const ResetPasswordPage = lazy(() => import("../pages/auth/reset-password"));
const AboutPage = lazy(() => import("../pages/about/about"));
const NotFoundPage = lazy(() => import("../pages/error/not-found"));
const ProductsPage = lazy(() => import("../pages/products/products"));
const ContactPage = lazy(() => import("../pages/contact/contact"));
const ProductInfoPage = lazy(() => import("../pages/product-info/product-info"));
const CheckoutPage = lazy(() => import("../pages/checkout/checkout"));
const MyOrders = lazy(() => import("../pages/my-orders/my-orders.jsx"));
const AdminDashboard = lazy(() => import("../pages/admin/dashboard.jsx"));
const AdminRating = lazy(() => import("../pages/admin/admin-rating.jsx"));
const AdminProducts = lazy(() => import("../pages/admin/admin-product.jsx"));
const AdminOrders = lazy(() => import("../pages/admin/admin-orders.jsx"));
const AdminCategories = lazy(() => import("../pages/admin/admin-category.jsx"));
const AdminAddProduct = lazy(() => import("../pages/admin/admin-add-product.jsx"));
const AdminAddCategory= lazy(() => import("../pages/admin/admin-add-category.jsx"));
const WishListProducts = lazy(() => import('../pages/wishlist/wishlist.jsx'))

export const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense>,
    },
    {
        path: '/search',
        element: <Suspense fallback={<Loader></Loader>}><SearchResult></SearchResult></Suspense>,
    },
    {
        path: '/auth/login',
        element: <Suspense fallback={<Loader></Loader>}><LoginPage></LoginPage></Suspense>,
    },
    {
        path: '/auth/signup',
        element: <Suspense fallback={<Loader></Loader>}><SignUpPage></SignUpPage></Suspense>,
    },
    {
        path: '/auth/forgot-password',
        element: <Suspense fallback={<Loader></Loader>}><ForgetPasswordPage></ForgetPasswordPage></Suspense>,
    },
    {
        path: '/auth/otp-verify',
        element: <Suspense fallback={<Loader></Loader>}><OtpVerifyPage></OtpVerifyPage></Suspense>,
    },
    {
        path: '/auth/reset-password',
        element: <Suspense fallback={<Loader></Loader>}><ResetPasswordPage></ResetPasswordPage></Suspense>,
    },
    {
        path: '/about',
        element: <Suspense fallback={<Loader></Loader>}><AboutPage></AboutPage></Suspense>,
    },
    {
        path: '*',
        element: <Suspense fallback={<Loader></Loader>}><NotFoundPage></NotFoundPage></Suspense>,
    },
    {
        path: '/products',
        element: <Suspense fallback={<Loader></Loader>}><ProductsPage></ProductsPage></Suspense>,
    },
    {
        path: '/products-info/:id',
        element: <Suspense fallback={<Loader></Loader>}><ProductInfoPage></ProductInfoPage></Suspense>,
    },
    {
        path: '/contact',
        element: <Suspense fallback={<Loader></Loader>}><ContactPage></ContactPage></Suspense>,
    },
])

export const privateRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense>,
    },
    {
        path: '/about',
        element: <Suspense fallback={<Loader></Loader>}><AboutPage></AboutPage></Suspense>,
    },
    {
        path: '/category-filter/:id',
        element: <Suspense fallback={<Loader></Loader>}><CategoryFilter></CategoryFilter></Suspense>,
    },
    {
        path: '*',
        element: <Suspense fallback={<Loader></Loader>}><NotFoundPage></NotFoundPage></Suspense>,
    },
    {
        path: '/products',
        element: <Suspense fallback={<Loader></Loader>}><ProductsPage></ProductsPage></Suspense>,
    },
    {
        path: '/products-info/:id',
        element: <Suspense fallback={<Loader></Loader>}><ProductInfoPage></ProductInfoPage></Suspense>,
    },
    {
        path: '/checkout',
        element: <Suspense fallback={<Loader></Loader>}><CheckoutPage></CheckoutPage></Suspense>,
    },
    {
        path: "/wishlist",
        element: <Suspense fallback={<Loader></Loader>}><WishListProducts></WishListProducts></Suspense>
    },
    {
        path: '/order-success',
        element: <Suspense fallback={<Loader></Loader>}><OrderSuccessPage></OrderSuccessPage></Suspense>,
    },
    {
        path: '/contact',
        element: <Suspense fallback={<Loader></Loader>}><ContactPage></ContactPage></Suspense>,
    },
    {
        path: '/address',
        element: <Suspense fallback={<Loader></Loader>}><AddressPage></AddressPage></Suspense>,
    },
    {
        path: '/my-orders',
        element: <Suspense fallback={<Loader></Loader>}><MyOrders></MyOrders></Suspense>,
    },
     {
        path: '/search',
        element: <Suspense fallback={<Loader></Loader>}><SearchResult></SearchResult></Suspense>,
    }
])

export const adminRoutes = createBrowserRouter([
    {
        path: '/admin/dashboard',
        element: <Suspense fallback={<Loader></Loader>}><AdminDashboard></AdminDashboard></Suspense>,
    },
     {
        path: '/search',
        element: <Suspense fallback={<Loader></Loader>}><SearchResult></SearchResult></Suspense>,
    },
    {
        path: '/admin/products',
        element: <Suspense fallback={<Loader></Loader>}><AdminProducts></AdminProducts></Suspense>,
    },
    {
        path: '/admin/rating',
        element: <Suspense fallback={<Loader></Loader>}><AdminRating></AdminRating></Suspense>,
    },
    {
        path: '/admin/orders',
        element: <Suspense fallback={<Loader></Loader>}><AdminOrders></AdminOrders></Suspense>,
    },
    {
        path: '/admin/categories',
        element: <Suspense fallback={<Loader></Loader>}><AdminCategories></AdminCategories></Suspense>,
    },
    {
        path: '/admin/add-product',
        element: <Suspense fallback={<Loader></Loader>}><AdminAddProduct></AdminAddProduct></Suspense>,
    },
    {
        path: '/admin/add-category',
        element: <Suspense fallback={<Loader></Loader>}><AdminAddCategory></AdminAddCategory></Suspense>,
    },
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense>,
    },
    {
        path: '/about',
        element: <Suspense fallback={<Loader></Loader>}><AboutPage></AboutPage></Suspense>,
    },
     {
        path: '/category-filter/:id',
        element: <Suspense fallback={<Loader></Loader>}><CategoryFilter></CategoryFilter></Suspense>,
    },
    {
        path: '*',
        element: <Suspense fallback={<Loader></Loader>}><NotFoundPage></NotFoundPage></Suspense>,
    },
    {
        path: '/products',
        element: <Suspense fallback={<Loader></Loader>}><ProductsPage></ProductsPage></Suspense>,
    },
    {
        path: '/products-info/:id',
        element: <Suspense fallback={<Loader></Loader>}><ProductInfoPage></ProductInfoPage></Suspense>,
    },
    {
        path: '/checkout',
        element: <Suspense fallback={<Loader></Loader>}><CheckoutPage></CheckoutPage></Suspense>,
    },
    {
        path: '/contact',
        element: <Suspense fallback={<Loader></Loader>}><ContactPage></ContactPage></Suspense>,
    },
    {
        path: '/address',
        element: <Suspense fallback={<Loader></Loader>}><AddressPage></AddressPage></Suspense>,
    }
])