import { useSeo } from "../hooks/useSeo";

const ContactPage = () => {
  useSeo({
    title: "Contact Nayan Ray — Start Your Web Project",
    description: "Get in touch about your web development project. Available for freelance and remote work. React, WordPress, WooCommerce, and full stack development. Response within 24 hours.",
    canonical: "/contact",
    keywords: ["contact web developer", "hire full stack developer", "freelance WordPress developer", "contact Nayan Ray"],
  });

  return (
    <div className="pt-20">
      <Contact />
    </div>
  );
};

import Contact from "../components/Contact";

export default ContactPage;
