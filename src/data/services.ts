export interface Service {
  slug: string;
  title: string;
  description: string;
  image?: string;
}

export const services: Service[] = [
  {
    slug: "residential-interiors",
    title: "Residential Interiors",
    description: "From concept to completion, we design homes that reflect your personal aesthetic and lifestyle. We handle spatial planning, material selection, and custom furnishings to create spaces that are both beautiful and livable.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000"
  },
  {
    slug: "commercial-interiors",
    title: "Commercial Interiors",
    description: "We create branded environments that inspire employees and impress clients. Our commercial interior design services optimize workflow, promote brand identity, and ensure a memorable physical presence.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    slug: "turnkey-interiors",
    title: "Turnkey Interiors",
    description: "Our comprehensive turnkey interior solutions offer a hassle-free experience. We manage the entire project lifecycle, from design and procurement to execution and handover, ensuring a seamless transformation.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000"
  }
];
