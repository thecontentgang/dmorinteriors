import AboutSection from "./AboutSection"
import DesignPhilosophy from "./DesignPhilosophy"
import HeroSection from "./HeroSection"
import FeaturedProjects from "./ProjectsSection"
import ServicesSection from "./ServicesSection"
import SignatureProject from "./SignatureProject"
// import StudioProcessAndStats from "./StudioProcessandSteps"
import TestimonialsSection from "./TestimonialSection"
import WhyDmor from "./WhyDmor"
import { useDocumentTitle } from "../../hooks/useDocumentTitle"

import CTASection from "./CTASection"


const HomePage = () => {
  useDocumentTitle({
    title: "DMOR Interiors | Interior Architecture & Design",
    description: "DMOR Interiors creates enduring, bespoke spaces in Hyderabad. Explore our signature residential interiors, tailored design systems, and unparalleled craftsmanship.",
    canonical: "https://dmor.com/"
  });

  return (
    <>
    <HeroSection />
    <AboutSection />
    <FeaturedProjects />
    <DesignPhilosophy />
    <ServicesSection />
    <SignatureProject />
    <WhyDmor />
    {/* <StudioProcessAndStats /> */}
    <TestimonialsSection />
    <CTASection />
    </>
  )
}

export default HomePage