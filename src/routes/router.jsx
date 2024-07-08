import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import  Loader  from "../components/loader/loader";

const HomePage = lazy(()=> import("../pages/home/home"));
const LoginPage = lazy(() => import("../pages/auth/login"));
const SignUpPage = lazy(() => import("../pages/auth/signup"));
const AboutPage = lazy(() => import("../pages/about/about"));
const NotFoundPage = lazy(() => import("../pages/error/not-found"));
const ProductsPage = lazy(() => import("../pages/products/products"));
const ContactPage = lazy(() => import("../pages/contact/contact"));
const ProductInfoPage = lazy(() => import("../pages/product-info/product-info"));
const CheckoutPage = lazy(() => import("../pages/checkout/checkout"));

export const publicRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Loader></Loader>}><HomePage></HomePage></Suspense>,
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
        path: '/products-info',
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
        path: '*',
        element: <Suspense fallback={<Loader></Loader>}><NotFoundPage></NotFoundPage></Suspense>,
    },
    {
        path: '/products',
        element: <Suspense fallback={<Loader></Loader>}><ProductsPage></ProductsPage></Suspense>,
    },
    {
        path: '/products-info',
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
])