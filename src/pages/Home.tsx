import Hero from "../components/Hero";
import About from "../components/About";
import Service from "../components/Service";
import Learningp from "../components/Learningp";
import Project from "../components/Project";
import Workingp from "../components/Workingp";
import Blog from "../components/Blog";
import Testimonial from "../components/Testmonial";
import Faq from "../components/Faq";
import Brand from "../components/Brand";
import Contact from "../components/Contact";
import Pricing from "../components/Pricing";



const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Service />
      <Learningp/>
      <Project />
      <Workingp />
      <Pricing />
      <Blog />
      <Testimonial />
      <Faq />
      <Brand />
      <Contact />
    </>
  );
};

export default Home;
