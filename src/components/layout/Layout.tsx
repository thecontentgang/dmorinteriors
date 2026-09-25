import React from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer';
import PageTransition from './PageTransition';

const Layout: React.FC = () => {
  return (
    <div className="font-body font-smooth bg-white text-black min-h-screen flex flex-col">
      <Navbar theme="light" />
      <PageTransition />
      <Footer />
    </div>
  );
};

export default Layout;