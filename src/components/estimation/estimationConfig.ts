import { ChefHat, BedDouble, DoorOpen, Sofa, House, type LucideIcon } from 'lucide-react';

export interface ServiceConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  baseRateSqFt?: number;
  basePrice?: number;
}

export const estimationServices: ServiceConfig[] = [
  {
    id: 'kitchen',
    title: 'Kitchen',
    icon: ChefHat,
    basePrice: 150000, // Placeholder configurable value
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    icon: BedDouble,
    basePrice: 120000, // Placeholder configurable value
  },
  {
    id: 'wardrobe',
    title: 'Wardrobe',
    icon: DoorOpen,
    baseRateSqFt: 1200, // Placeholder configurable value per sq ft
  },
  {
    id: 'living-room',
    title: 'Living Room',
    icon: Sofa,
    basePrice: 200000, // Placeholder configurable value
  },
  {
    id: 'full-home',
    title: 'Full Home',
    icon: House,
    baseRateSqFt: 1500, // Placeholder configurable value per sq ft
  }
];
