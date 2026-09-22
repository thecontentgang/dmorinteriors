import { estimationServices } from '../components/estimation/estimationConfig';

export interface EstimationLead {
  name: string;
  phone: string;
  email?: string;
  service: string;
  projectDetails: Record<string, unknown>;
  estimate?: {
    min: number;
    max: number;
  };
}

export const calculateEstimate = (
  serviceId: string,
  details: Record<string, unknown>
): { min: number; max: number } | null => {
  const service = estimationServices.find((s) => s.id === serviceId);
  if (!service) return null;

  let base = 0;

  if (service.basePrice) {
    base = service.basePrice;
  } else if (service.baseRateSqFt) {
    // For wardrobe or full home which might rely on area
    const width = parseFloat(String(details.width || '0'));
    const length = parseFloat(String(details.length || '0'));
    const height = parseFloat(String(details.height || '0'));
    const area = parseFloat(String(details.area || '0'));

    if (area > 0) {
      base = area * service.baseRateSqFt;
    } else if (width > 0 && length > 0) {
      base = width * length * service.baseRateSqFt;
    } else if (width > 0 && height > 0) {
      base = width * height * service.baseRateSqFt;
    }
  }

  // Fallback if no details match area logic but basePrice wasn't defined
  if (base === 0) {
      base = 100000; // Generic fallback placeholder
  }

  // Adjust base on specific requirements
  let multiplier = 1;

  const reqs = Array.isArray(details.requirements) ? details.requirements as string[] : [];
  if (details.type === 'Island') multiplier += 0.3;
  if (details.type === 'U-Shape') multiplier += 0.2;
  if (reqs.includes('Complete Bedroom')) multiplier += 0.5;
  if (reqs.includes('Complete Living Room')) multiplier += 0.5;

  const calculatedBase = base * multiplier;

  // Provide a range: min is -10% of base, max is +25% of base to account for material variations
  return {
    min: Math.round(calculatedBase * 0.9),
    max: Math.round(calculatedBase * 1.25),
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const submitEstimationLead = async (_lead: EstimationLead): Promise<void> => {
  // Integration point for CRM / Backend API / Email
  // Currently structured to resolve successfully.
  return new Promise((resolve) => {
    setTimeout(() => {
      // Intentionally avoiding console.log of lead in production per requirement,
      // but simulating a successful network request
      resolve();
    }, 1000);
  });
};
