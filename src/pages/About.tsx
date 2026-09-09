import About from "../components/About";
import Premium from "../components/Premium";
import { useSeo } from "../hooks/useSeo";

const AboutPage = () => {
  useSeo({
    title: "About Nayan Ray — Full Stack Developer & WordPress Expert",
    description: "Full Stack Developer with 6+ years experience in React, WordPress, Node.js, and WooCommerce. Based in Bangladesh, available for freelance and remote projects worldwide.",
    canonical: "/about",
    keywords: ["Nayan Ray", "full stack developer", "WordPress developer", "React developer", "freelance developer Bangladesh"],
  });

  return (
    <>
      <About />
      <Premium />
    </>
  );
};

export default AboutPage;
