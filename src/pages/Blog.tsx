import { useSeo } from "../hooks/useSeo";

const BlogPage = () => {
  useSeo({
    title: "Blog — Web Development, WordPress & React Tutorials | Nayan Ray",
    description: "Articles on React, WordPress, TypeScript, performance optimization, and modern web development. Practical guides and tutorials from a full stack developer.",
    canonical: "/blog",
    keywords: ["web development blog", "WordPress tutorials", "React tutorials", "TypeScript guides", "web development articles"],
  });

  return (
    <div className="pt-20">
      <Blog />
    </div>
  );
};

import Blog from "../components/Blog";

export default BlogPage;
