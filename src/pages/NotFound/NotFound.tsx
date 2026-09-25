import React from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const NotFound: React.FC = () => {
  useDocumentTitle('404 Not Found | DMOR Interiors');

  return (
      <main className="min-h-screen bg-navy text-cream flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-primary text-8xl md:text-[10rem] text-brand mb-4">404</h1>
        <h2 className="font-primary text-3xl md:text-5xl mb-8">
          Looks like this <span className="font-accent text-brand italic">space</span> doesn't exist.
        </h2>
        <p className="font-body text-cream/70 max-w-md mb-12">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="inline-block bg-brand text-navy font-body uppercase text-sm tracking-widest px-8 py-4 rounded-full hover:bg-cream transition-colors duration-300">
          Back to Home
        </Link>
      </main>
  );
};

export default NotFound;
