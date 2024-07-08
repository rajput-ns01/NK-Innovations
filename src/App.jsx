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

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    
    <div className="app">
      <CartContextProvider>
      <Router>
        {currentUser ? (
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
           <Route path="/shop/cartproducts" element={<CartProducts/>} /> {/* Add this line */}
          <Route path='/shop/cartproducts/cashout' element={<Cashout user={currentUser}/>}/>
           </Routes>
        ) : (
          <Login />
        )}
      </Router>
      <Notification />
      </CartContextProvider>
    </div>

  );
};

export default App;
