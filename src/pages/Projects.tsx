import { useSeo } from "../hooks/useSeo";

const ProjectsPage = () => {
  useSeo({
    title: "Projects — Web Development Portfolio | Nayan Ray",
    description: "Explore web development projects by Nayan Ray: React applications, WordPress plugins, WooCommerce stores, and full stack solutions. View live demos and source code.",
    canonical: "/projects",
    keywords: ["web development projects", "React portfolio", "WordPress projects", "WooCommerce stores", "developer portfolio"],
  });

  return (
    <div className="pt-20">
      <Project />
    </div>
  );
};

import Project from "../components/Project";

export default ProjectsPage;
