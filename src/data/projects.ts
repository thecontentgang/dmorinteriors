export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  year?: string;
  description: string;
  images: string[];
}

export const projects: Project[] = [
  {
    slug: "dental-360",
    title: "Dental 360",
    category: "Commercial",
    location: "Hyderabad",
    year: "2025",
    description: "A state-of-the-art commercial healthcare space balancing clinical precision with warm, welcoming interior luxury.",
    images: Array.from({ length: 18 }, (_, i) => `/images/projects/dental360/dental-360-${i + 1}.jpg`)
  },
  {
    slug: "risinia-edge",
    title: "Risinia Edge",
    category: "Residential",
    location: "Hyderabad",
    year: "2025",
    description: "A contemporary residential interior featuring bespoke millwork, sophisticated spatial planning, and ambient lighting.",
    images: Array.from({ length: 28 }, (_, i) => `/images/projects/risiniaedge/risinia-edge-${i + 1}.jpg`)
  },
  {
    slug: "nyla-project",
    title: "Nyla Project",
    category: "Interior Design",
    location: "Hyderabad",
    year: "2024",
    description: "An elegant, minimalist sanctuary emphasizing organic textures, natural stone, and tailored comfort.",
    images: Array.from({ length: 24 }, (_, i) => `/images/projects/nyla/nyla-${i + 1}.jpg`)
  },
  {
    slug: "akruthi-arcadia",
    title: "Akruthi Arcadia",
    category: "Architecture & Design",
    location: "Hyderabad",
    year: "2024",
    description: "A refined living space blending classic architectural balance with modern functional luxury.",
    images: Array.from({ length: 23 }, (_, i) => `/images/projects/akruthi/akruthi-${i + 1}.jpg`)
  }
];