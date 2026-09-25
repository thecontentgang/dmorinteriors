import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { services } from '../../data/services';

const ServiceDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find(s => s.slug === slug);

  useDocumentTitle(service ? `${service.title} | DMOR Interiors` : 'Service Not Found | DMOR Interiors');

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  return (
      <main className="min-h-screen bg-navy text-cream pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center text-center">
          
          <Link to="/services" className="inline-flex items-center gap-2 text-cream/60 hover:text-brand transition-colors font-body text-xs uppercase tracking-widest mb-12">
             <span>← Back to Services</span>
          </Link>

          <h1 className="font-primary text-5xl md:text-7xl mb-8">{service.title}</h1>
          <p className="font-body text-lg text-cream/80 leading-relaxed mb-16 max-w-2xl">
            {service.description}
          </p>

          <div className="w-full overflow-hidden rounded-xl bg-[#1D2B3A]">
            {service.image && (
               <img src={service.image} alt={service.title} className="w-full h-auto max-h-[60vh] object-cover" />
            )}
          </div>
          
          <div className="mt-16">
            <Link to="/contact" className="inline-block bg-brand text-navy font-body uppercase text-sm tracking-widest px-8 py-4 rounded-full hover:bg-cream transition-colors duration-300">
               Inquire About This Service
            </Link>
          </div>

        </div>
      </main>
  );
};

export default ServiceDetails;
