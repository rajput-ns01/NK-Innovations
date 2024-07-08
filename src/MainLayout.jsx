// components/layouts/MainLayout.jsx
import React from 'react';
import Header from './components/home/Header';
import Footer from './components/home/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
