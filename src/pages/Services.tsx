import { useSeo } from "../hooks/useSeo";

const ServicesPage = () => {
  useSeo({
    title: "Services — Web Development, WordPress & React | Nayan Ray",
    description: "Web development services: React applications, WordPress plugins, WooCommerce integration, UI/UX design, and performance optimization. Hire a full stack developer.",
    canonical: "/services",
    keywords: ["web development services", "hire React developer", "WordPress development services", "WooCommerce development", "freelance web developer"],
  });

  return (
    <div className="pt-20">
      <Service />
    </div>
  );
};

import Service from "../components/Service";

export default ServicesPage;
