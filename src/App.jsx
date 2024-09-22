import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // corrected import
import Header from './components/home/Header';
import Hero from './components/home/Hero';
import Section1 from './components/home/Section1';
import Section2 from './components/home/Section2';
import Footer from './components/home/Footer';
import About from './components/about/About';
import ContactForm from './components/contact/contact';
import Solutions from './components/solutions/SolutionCards';
import JobSearch from './components/jobs/JobSearch';
import JobPage from './components/jobs/JobPage';
import Login from './components/login/login';
import Notification from './components/notification/Notification ';
import { useUserStore } from './lib/userStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

import './index.css';
import { AddProducts } from './components/shop/AddProducts';
import { ShopHome } from './components/shop/ShopHome';
import { CartContextProvider } from './components/shop/CartContext';
import Cart from './components/shop/Cart';
import CartProducts from './components/shop/CartProduct';
import { Cashout } from './components/shop/Cashout';
import ShopSection from './components/home/ShopSection';
import CustomizationPage from './components/customProducts/CustomizationPage';
import { AddRawProduct } from './components/customProducts/AddRawProduct';
import UploadForm from './components/customProducts/UploadForm';
import UserManagement from './admin/dashboard/UserManagement';
import OrderManagement from './admin/dashboard/ReadyMade';
import ProductManagement from './admin/dashboard/ProductManagement';
import JobManagement from './admin/dashboard/JobManagement';
import AdminDashboard from './admin/dashboard/AdminDashboard';
import JobApplications from './admin/dashboard/JobApplications';
import ReadyMadeProductOrders from './admin/dashboard/ReadyMade';
import CustomizeProductOrders from './admin/dashboard/CustomizeOrders';
import AdminRoute from './admin/dashboard/AdminRoute';


const Home = () => (
  <>
    <Header />
    <Hero />
    <Section1 />
    <Section2 />
    <ShopSection/>
    <Footer />
  </>
);

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }
  return (
    <div className="app">
      <CartContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/jobsearch" element={<JobSearch />} />
            <Route path="/job" element={<JobPage />} />
            <Route path="/login" element={<Login />} />
            {/* Uncomment and choose one route for shop */}
            <Route path="/shop" element={<ShopHome />} /> 
            {/*<Route path="/shop" element={<AddProducts />} /> */}
            <Route path="/cart" element={<Cart user={currentUser} />} />
            <Route path="/shop/cartproducts" element={<CartProducts />} />
            <Route path="/customize/cartproducts" element={<CartProducts />} />
            <Route path='/shop/cartproducts/cashout' element={<Cashout user={currentUser} />} />
            <Route path='/customize/cartproducts/cashout' element={<Cashout user={currentUser} />} />
            <Route path="/customize" element={<CustomizationPage/>} />
            {/*<Route path="/upload" element={<UploadForm/>} />*/}

            {/*--------------Admin Part------------------*/}
            <Route path='/admin' element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
            <Route path='/admin/users' element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path='/admin/readymade' element={<AdminRoute><ReadyMadeProductOrders/></AdminRoute>} />
            <Route path='/admin/customize' element={<AdminRoute><CustomizeProductOrders/></AdminRoute>} />
            <Route path='/admin/products' element={<AdminRoute><ProductManagement /></AdminRoute>} />
            <Route path='/admin/jobs' element={<AdminRoute><JobManagement /></AdminRoute>} />
            <Route path='/admin/applications' element={<AdminRoute><JobApplications /></AdminRoute>} />
          </Routes>
        </Router>
        <Notification />
      </CartContextProvider>
    </div>
  );
};

export default App;
