import AboutSection from "./AboutSection"
import DesignPhilosophy from "./DesignPhilosophy"
import HeroSection from "./HeroSection"
import FeaturedProjects from "./ProjectsSection"
import ServicesSection from "./ServicesSection"
import SignatureProject from "./SignatureProject"
// import StudioProcessAndStats from "./StudioProcessandSteps"
import TestimonialsSection from "./TestimonialSection"
import WhyDmor from "./WhyDmor"
import PageTransition from "../../components/layout/PageTransition"
import { useDocumentTitle } from "../../hooks/useDocumentTitle"

import CTASection from "./CTASection"


const HomePage = () => {
  useDocumentTitle("DMOR Interiors | Interior Architecture & Design");

  return (
    <PageTransition>
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
    </PageTransition>
  )
}

export default HomePage