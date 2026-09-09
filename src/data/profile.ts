/* ------------------------------------------------------------------ */
/*  Shared profile data — single source of truth for contact info,    */
/*  stats, and other data that was previously duplicated across       */
/*  5+ components (Contact, Header, Footer, Service, Faq, index.html) */
/*                                                                    */
/*  Update values here and they propagate everywhere. No more         */
/*  "phone number changed but I forgot to update the footer."        */
/* ------------------------------------------------------------------ */

export const PROFILE = {
  name: "Nayan Ray",
  role: "Full Stack Web Developer",
  email: "wpnayanray@gmail.com",
  phone: "+8801981308611",
  location: "Khulna, Bangladesh",
  whatsapp: "https://wa.me/8801981308611",
  telegram: "https://t.me/nayanray",
  github: "https://github.com/dev-nayanray",
  linkedin: "https://www.linkedin.com/in/dev-nayanray",
  website: "https://nayanray.com",
} as const;

/* ------------------------------------------------------------------ */
/*  Stats — previously these were inconsistent across components:     */
/*  "50+ Projects" appeared in Hero, Brand, Testmonial, About, but   */
/*  "Years Experience" was 3 in one place, 4 in another, "48        */
/*  months" in a third. Now all components import from here so the    */
/*  numbers always match.                                             */
/* ------------------------------------------------------------------ */
export const STATS = {
  projects: "50+",
  yearsExperience: "6+",
  technologies: "25+",
  satisfaction: "100%",
  communication: "100%",
} as const;

/* ------------------------------------------------------------------ */
/*  Contact info array — used by the Contact component.               */
/*  Previously duplicated as a local const inside Contact.tsx.       */
/* ------------------------------------------------------------------ */
export const CONTACT_INFO = [
  {
    label: "Email Address",
    value: PROFILE.email,
    link: `mailto:${PROFILE.email}`,
    color: "from-blue-500 to-cyan-500",
    iconKey: "email" as const,
  },
  {
    label: "Phone Number",
    value: PROFILE.phone,
    link: `tel:${PROFILE.phone}`,
    color: "from-green-500 to-emerald-500",
    iconKey: "phone" as const,
  },
  {
    label: "Location",
    value: PROFILE.location,
    link: "https://maps.google.com/?q=Khulna,Bangladesh",
    color: "from-purple-500 to-pink-500",
    iconKey: "location" as const,
  },
  {
    label: "WhatsApp",
    value: PROFILE.phone,
    link: PROFILE.whatsapp,
    color: "from-green-500 to-teal-500",
    iconKey: "whatsapp" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Social links — used by Contact and Footer components.            */
/* ------------------------------------------------------------------ */
export const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    url: PROFILE.linkedin,
    color: "hover:bg-blue-600 hover:text-white",
    iconKey: "linkedin" as const,
  },
  {
    label: "GitHub",
    url: PROFILE.github,
    color: "hover:bg-gray-800 hover:text-white",
    iconKey: "github" as const,
  },
  {
    label: "Telegram",
    url: PROFILE.telegram,
    color: "hover:bg-blue-500 hover:text-white",
    iconKey: "telegram" as const,
  },
  {
    label: "Email",
    url: `mailto:${PROFILE.email}`,
    color: "hover:bg-red-500 hover:text-white",
    iconKey: "email" as const,
  },
];
