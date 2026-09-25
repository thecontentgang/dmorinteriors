import React from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

const Process: React.FC = () => {
  useDocumentTitle('Our Process | DMOR Interiors');

  return (
      <main className="min-h-screen bg-[#F9F7F4] text-navy pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-brand" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-navy/70">
              Methodology
            </span>
          </div>
          <h1 className="font-primary text-5xl md:text-7xl mb-16 max-w-4xl">
            How We <span className="font-accent text-brand italic">Work.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {[
               { title: "01. Consultation", desc: "Understanding your vision, lifestyle, and requirements to form a comprehensive brief." },
               { title: "02. Concept Design", desc: "Developing spatial layouts, mood boards, and preliminary material palettes." },
               { title: "03. Detailed Design", desc: "Refining details, technical drawings, lighting plans, and sourcing bespoke furniture." },
               { title: "04. Execution", desc: "Project management, site supervision, and ensuring quality craftsmanship." },
               { title: "05. Handover", desc: "Final styling, cleaning, and handing over your beautifully transformed space." }
             ].map((step, idx) => (
                <div key={idx} className="border-t border-navy/20 pt-8">
                  <h3 className="font-primary text-2xl mb-4">{step.title}</h3>
                  <p className="font-body text-navy/70 leading-relaxed">{step.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </main>
  );
};

export default Process;
