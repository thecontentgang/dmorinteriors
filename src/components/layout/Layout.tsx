import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from '../footer/Footer';
import ScrollToTop from './ScrollToTop';

const Layout: React.FC = () => {
  return (
    <div className="font-body font-smooth bg-white text-black min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar theme="light" />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;