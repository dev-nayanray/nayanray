import { useEffect } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  keywords?: string[];
  jsonLd?: object | object[];
  noindex?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helper to upsert a meta tag                                        */
/* ------------------------------------------------------------------ */

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: object | object[]) {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/*  Updates document head whenever the SEO props change.               */
/*  Restores the original home-page tags on unmount so other routes    */
/*  (which rely on the static index.html tags) keep working.           */
/* ------------------------------------------------------------------ */

const HOME = {
  title: "Nayan Ray — Full Stack Web Developer | React & WordPress Expert",
  description:
    "Explore the portfolio of Nayan Ray, a Full Stack Web Developer specializing in React, WordPress, Node.js, and modern web technologies. View live projects, plugins, and creative web solutions.",
  canonical: "https://nayanray.vercel.app/",
  ogImage: "https://nayanray.vercel.app/og-image.jpg",
  ogType: "website" as const,
  keywords:
    "Nayan Ray, Web Developer, React Developer, WordPress Developer, Full Stack Developer, Frontend, Backend, Node.js, PHP, Bangladesh, Portfolio, Freelance Developer",
};

const SITE = "https://nayanray.vercel.app";

export function useSeo(meta: SeoMeta) {
  useEffect(() => {
    const url = meta.canonical ? `${SITE}${meta.canonical}` : `${SITE}/`;
    const image = meta.ogImage || HOME.ogImage;

    document.title = meta.title;
    upsertMeta("name", "description", meta.description);
    upsertLink("canonical", url);
    upsertMeta("property", "og:title", meta.title);
    upsertMeta("property", "og:description", meta.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", meta.ogType || "website");
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:title", meta.title);
    upsertMeta("name", "twitter:description", meta.description);
    upsertMeta("name", "twitter:image", image);

    if (meta.keywords && meta.keywords.length) {
      upsertMeta("name", "keywords", meta.keywords.join(", "));
    }

    if (meta.noindex) {
      upsertMeta("name", "robots", "noindex, nofollow");
    } else {
      upsertMeta("name", "robots", "index, follow");
    }

    if (meta.jsonLd) {
      upsertJsonLd("route-jsonld", meta.jsonLd);
    } else {
      const existing = document.getElementById("route-jsonld");
      if (existing) existing.remove();
    }

    return () => {
      // Restore home-page defaults so other routes don't inherit plugin SEO.
      document.title = HOME.title;
      upsertMeta("name", "description", HOME.description);
      upsertLink("canonical", HOME.canonical);
      upsertMeta("property", "og:title", "Nayan Ray — Full Stack Web Developer");
      upsertMeta("property", "og:description", HOME.description);
      upsertMeta("property", "og:url", HOME.canonical);
      upsertMeta("property", "og:type", HOME.ogType);
      upsertMeta("property", "og:image", HOME.ogImage);
      upsertMeta("name", "twitter:title", "Nayan Ray — Full Stack Web Developer");
      upsertMeta("name", "twitter:description", HOME.description);
      upsertMeta("name", "twitter:image", HOME.ogImage);
      upsertMeta("name", "keywords", HOME.keywords);
      upsertMeta("name", "robots", "index, follow");
      const existing = document.getElementById("route-jsonld");
      if (existing) existing.remove();
    };
  }, [
    meta.title,
    meta.description,
    meta.canonical,
    meta.ogImage,
    meta.ogType,
    meta.keywords,
    meta.jsonLd,
    meta.noindex,
  ]);
}
