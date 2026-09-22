
import { estimationServices } from './estimationConfig';
import type { EstimationLead } from '../../utils/calculateEstimate';

export interface StepProps {
  formData: Partial<EstimationLead>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<EstimationLead>>>;
  errors: Record<string, string>;
}

// --- STEP 1: CONTACT ---
export const StepContact = ({ formData, setFormData, errors }: StepProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-body text-navy font-semibold text-sm">
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand font-body transition-colors ${
            errors.name ? 'border-red-400' : 'border-navy/20'
          }`}
          placeholder="Your full name"
        />
        {errors.name && <span className="text-red-500 text-xs font-body">{errors.name}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-body text-navy font-semibold text-sm">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
          className={`px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand font-body transition-colors ${
            errors.phone ? 'border-red-400' : 'border-navy/20'
          }`}
          placeholder="10-digit mobile number"
        />
        {errors.phone && <span className="text-red-500 text-xs font-body">{errors.phone}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-body text-navy font-semibold text-sm">
          Email (Optional)
        </label>
        <input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="px-4 py-3 rounded-xl border border-navy/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand font-body transition-colors"
          placeholder="your@email.com"
        />
      </div>
    </div>
  );
};

// --- STEP 2: SERVICE ---
export const StepService = ({ formData, setFormData, errors }: StepProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label className="font-body text-navy font-semibold text-sm">
        What would you like an estimate for? *
      </label>
      <div className="grid grid-cols-2 gap-4">
        {estimationServices.map((service) => {
          const Icon = service.icon;
          const isSelected = formData.service === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => setFormData({ ...formData, service: service.id, projectDetails: {} })}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 focus:outline-none ${
                isSelected
                  ? 'border-brand bg-brand/10 shadow-[0_4px_20px_rgba(201,194,101,0.2)]'
                  : 'border-navy/10 bg-white hover:border-brand/50 hover:bg-cream'
              }`}
            >
              <Icon className={`w-8 h-8 mb-3 transition-colors ${isSelected ? 'text-brand-dark' : 'text-navy'}`} />
              <span className={`font-body text-sm font-medium ${isSelected ? 'text-brand-dark' : 'text-navy'}`}>
                {service.title}
              </span>
            </button>
          );
        })}
      </div>
      {errors.service && <span className="text-red-500 text-xs font-body">{errors.service}</span>}
    </div>
  );
};

// --- STEP 3: DETAILS ---
export const StepDetails = ({ formData, setFormData, errors }: StepProps) => {
  const service = formData.service;
  const details = formData.projectDetails || {};

  const updateDetails = (key: string, value: unknown) => {
    setFormData({
      ...formData,
      projectDetails: { ...details, [key]: value },
    });
  };

  const handleRequirementToggle = (req: string) => {
    const reqs = (details.requirements as string[]) || [];
    if (reqs.includes(req)) {
      updateDetails('requirements', reqs.filter((r: string) => r !== req));
    } else {
      updateDetails('requirements', [...reqs, req]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {service === 'kitchen' && (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-body text-navy font-semibold text-sm">Kitchen Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['Straight', 'L-Shape', 'U-Shape', 'Island'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateDetails('type', type)}
                  className={`py-2 px-4 rounded-xl border text-sm font-body transition-all ${
                    details.type === type ? 'bg-brand text-navy border-brand' : 'bg-white border-navy/20 hover:border-brand'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.type && <span className="text-red-500 text-xs font-body">{errors.type}</span>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Length (ft)</label>
              <input type="number" min="0" value={(details.length as string) || ''} onChange={(e) => updateDetails('length', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Width (ft)</label>
              <input type="number" min="0" value={(details.width as string) || ''} onChange={(e) => updateDetails('width', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
          </div>
          {(errors.length || errors.width) && <span className="text-red-500 text-xs font-body">Please provide approximate dimensions.</span>}
        </>
      )}

      {service === 'bedroom' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Length (ft)</label>
              <input type="number" min="0" value={(details.length as string) || ''} onChange={(e) => updateDetails('length', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Width (ft)</label>
              <input type="number" min="0" value={(details.width as string) || ''} onChange={(e) => updateDetails('width', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
          </div>
          {(errors.length || errors.width) && <span className="text-red-500 text-xs font-body">Please provide approximate dimensions.</span>}
          
          <div className="flex flex-col gap-2">
            <label className="font-body text-navy font-semibold text-sm">Do you need:</label>
            <div className="flex flex-col gap-2">
              {['Bed', 'Wardrobe', 'TV Unit', 'Study Table', 'Complete Bedroom'].map((req) => {
                const reqs = (details.requirements as string[]) || [];
                return (
                <label key={req} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${reqs.includes(req) ? 'bg-brand border-brand' : 'border-navy/30 group-hover:border-brand'}`}>
                    {reqs.includes(req) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </div>
                  <input type="checkbox" className="hidden" checked={reqs.includes(req) || false} onChange={() => handleRequirementToggle(req)} />
                  <span className="font-body text-sm text-navy">{req}</span>
                </label>
              )})}
            </div>
          </div>
        </>
      )}

      {service === 'wardrobe' && (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-body text-navy font-semibold text-sm">Wardrobe Type</label>
            <div className="grid grid-cols-3 gap-2">
              {['Sliding', 'Hinged', 'Walk-in'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateDetails('type', type)}
                  className={`py-2 px-2 rounded-xl border text-sm font-body transition-all ${
                    details.type === type ? 'bg-brand text-navy border-brand' : 'bg-white border-navy/20 hover:border-brand'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
             {errors.type && <span className="text-red-500 text-xs font-body">{errors.type}</span>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Width (ft)</label>
              <input type="number" min="0" value={(details.width as string) || ''} onChange={(e) => updateDetails('width', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Height (ft)</label>
              <input type="number" min="0" value={(details.height as string) || ''} onChange={(e) => updateDetails('height', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
          </div>
           {(errors.width || errors.height) && <span className="text-red-500 text-xs font-body">Please provide approximate dimensions.</span>}
        </>
      )}

      {service === 'living-room' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Length (ft)</label>
              <input type="number" min="0" value={(details.length as string) || ''} onChange={(e) => updateDetails('length', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-body text-navy font-semibold text-sm">Width (ft)</label>
              <input type="number" min="0" value={(details.width as string) || ''} onChange={(e) => updateDetails('width', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            </div>
          </div>
           {(errors.length || errors.width) && <span className="text-red-500 text-xs font-body">Please provide approximate dimensions.</span>}
          <div className="flex flex-col gap-2">
            <label className="font-body text-navy font-semibold text-sm">What do you need?</label>
            <div className="flex flex-col gap-2">
              {['TV Unit', 'False Ceiling', 'Storage', 'Complete Living Room'].map((req) => {
                const reqs = (details.requirements as string[]) || [];
                return (
                <label key={req} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${reqs.includes(req) ? 'bg-brand border-brand' : 'border-navy/30 group-hover:border-brand'}`}>
                    {reqs.includes(req) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                  </div>
                  <input type="checkbox" className="hidden" checked={reqs.includes(req) || false} onChange={() => handleRequirementToggle(req)} />
                  <span className="font-body text-sm text-navy">{req}</span>
                </label>
              )})}
            </div>
          </div>
        </>
      )}

      {service === 'full-home' && (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-body text-navy font-semibold text-sm">Number of Bedrooms</label>
            <div className="grid grid-cols-5 gap-2">
              {['1', '2', '3', '4', '5+'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => updateDetails('bedrooms', num)}
                  className={`py-2 rounded-xl border text-sm font-body transition-all ${
                    details.bedrooms === num ? 'bg-brand text-navy border-brand' : 'bg-white border-navy/20 hover:border-brand'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            {errors.bedrooms && <span className="text-red-500 text-xs font-body">{errors.bedrooms}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-body text-navy font-semibold text-sm">Approximate Home Size (sq.ft)</label>
            <input type="number" min="0" value={(details.area as string) || ''} onChange={(e) => updateDetails('area', e.target.value)} className="px-4 py-3 rounded-xl border border-navy/20" />
            {errors.area && <span className="text-red-500 text-xs font-body">{errors.area}</span>}
          </div>
        </>
      )}
    </div>
  );
};

// --- STEP 4: RESULT ---
export const StepResult = ({ estimate, serviceName, onClose }: { estimate: { min: number, max: number } | null, serviceName: string, onClose: () => void }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div className="flex flex-col gap-1">
        <span className="font-body text-navy/60 text-sm tracking-[0.2em] uppercase">Your Estimate</span>
        <h3 className="font-primary text-3xl md:text-4xl text-navy">{serviceName} Interior</h3>
      </div>
      
      <div className="w-full bg-white border border-brand/20 rounded-2xl p-6 shadow-sm">
        <span className="font-body text-navy/70 text-sm mb-2 block">Approximate Project Range</span>
        <div className="font-primary text-4xl md:text-5xl text-brand-dark tracking-tight">
          {estimate ? `${formatCurrency(estimate.min)} – ${formatCurrency(estimate.max)}` : "Calculating..."}
        </div>
      </div>

      <p className="font-body text-xs text-navy/60 leading-relaxed max-w-sm">
        This is an indicative estimate. Final pricing may vary based on materials, finishes, hardware, dimensions, and design requirements.
      </p>

      <div className="flex flex-col w-full gap-3 mt-4">
        <a href="/contact" onClick={onClose} className="w-full py-4 bg-navy text-cream font-body rounded-full hover:bg-black transition-colors font-semibold shadow-md text-center">
          Book Free Consultation
        </a>
        <a href="tel:+918977066990" className="w-full py-4 bg-transparent border border-navy/20 text-navy font-body rounded-full hover:bg-navy/5 transition-colors font-medium text-center">
          Talk to an Expert
        </a>
      </div>
    </div>
  );
};
