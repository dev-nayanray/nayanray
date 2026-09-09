import Hero from "../components/Hero";
import About from "../components/About";
import Service from "../components/Service";
import Learningp from "../components/Learningp";
import Project from "../components/Project";
import Workingp from "../components/Workingp";
import Pricing from "../components/Pricing";
import Blog from "../components/Blog";
import Testimonial from "../components/Testmonial";
import Faq from "../components/Faq";
import Brand from "../components/Brand";
import Contact from "../components/Contact";
import { useSeo } from "../hooks/useSeo";

const Home = () => {
  useSeo({
    title: "Nayan Ray — Full Stack Developer | React & WordPress Expert",
    description: "Full Stack Developer specializing in React, WordPress, Node.js. View live projects, plugins, and services. Available for freelance and remote roles. Based in Bangladesh, working worldwide.",
    canonical: "/",
    keywords: ["Nayan Ray", "web developer", "React developer", "WordPress developer", "full stack developer", "freelance developer"],
  });

  return (
    <>
      <Hero />
      <About />
      <Service />
      <Learningp />
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
