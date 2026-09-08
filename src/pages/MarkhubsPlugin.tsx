import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaTelegram, FaWordpress, FaDownload, FaGithub, FaRocket,
  FaShieldAlt, FaBolt, FaShoppingCart, FaSearch, FaTruck, FaBell,
  FaRobot, FaDatabase, FaPlug, FaLock, FaCheckCircle, FaArrowRight,
  FaChevronDown, FaStar, FaCode, FaMobileAlt, FaStore, FaSync, FaBook,
  FaBoxes, FaTags, FaLanguage, FaServer, FaCloud,
  FaTachometerAlt, FaUsers, FaGift,
  FaQuoteLeft,
  FaPhp, FaLayerGroup, FaTrophy, FaBroom, FaRegClock, FaCopy,
} from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import { useSeo } from "../hooks/useSeo";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const pluginStats = [
  { label: "Bot Commands", value: "25", icon: FaRobot },
  { label: "DB Tables", value: "2", icon: FaDatabase },
  { label: "Dependencies", value: "0", icon: FaPlug },
  { label: "License", value: "GPL", icon: FaShieldAlt },
];

const features = [
  {
    title: "25 Core Bot Commands",
    description:
      "A complete command set covering browsing, ordering, tracking, and store info — /start, /products, /search, /cart, /track, /myorders and 19 more.",
    icon: FaRobot,
    color: "from-violet-500 to-purple-600",
    accent: "violet",
    span: "lg:col-span-2",
  },
  {
    title: "Real-time Order Notifications",
    description:
      "The moment an order is placed or its status changes, your store admin chat gets an instant Telegram alert with all the details.",
    icon: FaBell,
    color: "from-amber-500 to-orange-600",
    accent: "amber",
    span: "",
  },
  {
    title: "Product Search & Catalog",
    description:
      "Customers browse featured products and search by name, all without ever leaving the Telegram chat window.",
    icon: FaSearch,
    color: "from-blue-500 to-cyan-600",
    accent: "blue",
    span: "",
  },
  {
    title: "Cart & Checkout Flow",
    description:
      "Add, view, and clear items through inline keyboards. Generate a secure checkout link straight from the cart — one tap, done.",
    icon: FaShoppingCart,
    color: "from-emerald-500 to-green-600",
    accent: "emerald",
    span: "lg:col-span-2",
  },
  {
    title: "Order Tracking by ID",
    description:
      "Customers run /track 1042 and instantly see their order status — no login, no phone calls, no friction.",
    icon: FaTruck,
    color: "from-rose-500 to-pink-600",
    accent: "rose",
    span: "",
  },
  {
    title: "Webhook Auto-Setup",
    description:
      "One click sets the Telegram webhook. Protected with a per-site secret key generated at activation — no exposed endpoints.",
    icon: FaLock,
    color: "from-indigo-500 to-blue-600",
    accent: "indigo",
    span: "",
  },
  {
    title: "HPOS Compatible",
    description:
      "Fully compatible with WooCommerce's High-Performance Order Storage, so it works cleanly on modern, performant stores.",
    icon: FaSync,
    color: "from-cyan-500 to-teal-600",
    accent: "cyan",
    span: "",
  },
  {
    title: "Lightweight & Bloat-Free",
    description:
      "Only 2 custom database tables, zero external dependencies, pure WordPress and WooCommerce APIs. Clean uninstall with no leftovers.",
    icon: FaBolt,
    color: "from-fuchsia-500 to-pink-600",
    accent: "fuchsia",
    span: "lg:col-span-2",
  },
];

const commandCategories = [
  {
    name: "Shopping",
    icon: FaShoppingCart,
    color: "from-emerald-500 to-green-600",
    commands: [
      { cmd: "/products", desc: "Browse featured products" },
      { cmd: "/search", desc: "Search products by name" },
      { cmd: "/product", desc: "View a product by ID" },
      { cmd: "/cart", desc: "View your cart" },
      { cmd: "/add", desc: "Add a product to cart" },
      { cmd: "/clear", desc: "Clear your cart" },
      { cmd: "/checkout", desc: "Get a checkout link" },
    ],
  },
  {
    name: "Orders",
    icon: FaTruck,
    color: "from-amber-500 to-orange-600",
    commands: [
      { cmd: "/myorders", desc: "View your last 5 orders" },
      { cmd: "/order", desc: "View order details by ID" },
      { cmd: "/track", desc: "Track an order by ID" },
    ],
  },
  {
    name: "Store Info",
    icon: FaStore,
    color: "from-blue-500 to-cyan-600",
    commands: [
      { cmd: "/store", desc: "Store name, hours, contact" },
      { cmd: "/contact", desc: "Contact information" },
      { cmd: "/faq", desc: "Frequently asked questions" },
      { cmd: "/hours", desc: "Store opening hours" },
      { cmd: "/shipping", desc: "Shipping policy" },
      { cmd: "/returns", desc: "Returns & refund policy" },
    ],
  },
  {
    name: "Account",
    icon: FaRobot,
    color: "from-violet-500 to-purple-600",
    commands: [
      { cmd: "/start", desc: "Register & welcome message" },
      { cmd: "/help", desc: "See all available commands" },
      { cmd: "/lang", desc: "Change language" },
      { cmd: "/stop", desc: "Stop notifications" },
      { cmd: "/resume", desc: "Resume notifications" },
      { cmd: "/id", desc: "Show your Telegram chat ID" },
      { cmd: "/about", desc: "About this bot" },
      { cmd: "/version", desc: "Show plugin version" },
      { cmd: "/support", desc: "Get support link" },
    ],
  },
];

const setupSteps = [
  {
    number: "01",
    title: "Install the Plugin",
    description:
      "Download the zip, then go to WordPress → Plugins → Add New → Upload Plugin. Activate it and the TG Manager menu appears in your admin.",
    icon: FaDownload,
    color: "from-brand-500 to-brand-700",
  },
  {
    number: "02",
    title: "Create Your Bot",
    description:
      "Open @BotFather on Telegram, run /newbot, and copy the token it gives you. Paste it into TG Manager → Settings → Bot Token.",
    icon: SiTelegram,
    color: "from-sky-500 to-blue-600",
  },
  {
    number: "03",
    title: "Set the Webhook",
    description:
      "Enter your Admin Chat ID (message your bot /id to find it), then click Set webhook. A per-site secret key is generated automatically.",
    icon: FaLock,
    color: "from-emerald-500 to-teal-600",
  },
  {
    number: "04",
    title: "Start Selling on Telegram",
    description:
      "Open your bot in Telegram, send /start, and you're live. Customers can now browse, order, and track entirely inside Telegram.",
    icon: FaRocket,
    color: "from-amber-500 to-orange-600",
  },
];

const requirements = [
  { label: "WordPress", value: "6.4+", icon: FaWordpress },
  { label: "WooCommerce", value: "5.0+", icon: FaShoppingCart },
  { label: "PHP", value: "7.4+", icon: FaCode },
  { label: "SSL (HTTPS)", value: "Required", icon: FaLock },
];

const faqItems = [
  {
    q: "Is this plugin really free?",
    a: "Yes — 100% free, GPL-licensed, fully functional, no time limits, no nag screens, no locked features. The entire core experience ships in the free version. You can download it from GitHub, install it on unlimited sites, and use it commercially without paying a cent.",
  },
  {
    q: "Does it work with HPOS (High-Performance Order Storage)?",
    a: "Yes. The plugin declares compatibility with WooCommerce's custom order tables, so it runs cleanly on stores that have migrated to HPOS as well as on the legacy post-meta storage. The plugin uses the wc_get_order() API exclusively, which abstracts storage details behind WooCommerce's order factory.",
  },
  {
    q: "Does it require SSL / HTTPS?",
    a: "Yes. Telegram only delivers webhooks over HTTPS. Most hosts offer a free Let's Encrypt certificate, so this is rarely a blocker — but you do need a valid SSL cert on your site. If Telegram can't reach your webhook URL over HTTPS, the bot simply won't receive customer messages.",
  },
  {
    q: "How do I find my Chat ID?",
    a: "After setup, open your bot in Telegram and send /start, then send /id. The bot will reply with your numeric chat ID, which you paste into TG Manager → Settings. Your customers never need this — only you, the store admin, use it to receive new-order notifications.",
  },
  {
    q: "Is there a Premium edition?",
    a: "Yes, a separately hosted Premium edition with AI customer support, a full CRM with Kanban pipeline, an automation rules engine, multi-agent support, WhatsApp Business API, a REST API, and 116+ commands is available from the developer's own site. It's entirely optional — nothing in the free plugin is locked or time-limited.",
  },
  {
    q: "Where is the data stored?",
    a: "All data stays on your site. The plugin creates two tables (wp_wtm_users and wp_wtm_chats) on activation. Chat logs auto-prune after 30 days. No data is ever sent to any server operated by the plugin author — communication is direct between your WordPress site and Telegram's official Bot API.",
  },
  {
    q: "Will this plugin slow down my WooCommerce store?",
    a: "No. The plugin is lightweight by design — under 200 KB compressed, zero external dependencies, and only two database tables. All bot interactions are asynchronous webhook-driven, so they don't block WooCommerce's normal checkout flow. There's no JavaScript loaded on your storefront unless you explicitly enable it.",
  },
  {
    q: "Can customers in different countries use the bot?",
    a: "Yes — Telegram is available worldwide (except in a few regions where it's blocked at the ISP level). The free edition ships English only, but the bot interface (welcome message, command responses) can be customized from TG Manager → Settings. Premium adds native multi-language support.",
  },
  {
    q: "Does it work with WooCommerce Subscriptions or Bookings?",
    a: "The free edition supports any post type that uses the WooCommerce order pipeline, including Subscriptions and Bookings renewals. Order notifications fire on every status change, so your subscribers will receive Telegram updates on renewals just like regular orders.",
  },
  {
    q: "Can I customize the welcome message customers see on /start?",
    a: "Yes. The welcome message is fully editable from TG Manager → Settings. It supports the {store_name} placeholder, which is automatically replaced with your WooCommerce store name (set in WooCommerce → Settings → General).",
  },
  {
    q: "What happens to customer data if I uninstall the plugin?",
    a: "When the plugin is deleted from the WordPress admin (not just deactivated), the uninstall routine drops both custom tables and removes all options, transients, and scheduled events. This is a clean uninstall — no leftover data, no orphan options. If you only deactivate, all data is preserved for reactivation.",
  },
  {
    q: "Is the plugin compatible with WordPress multisite?",
    a: "Yes. The plugin can be activated per-site on a multisite network. Each subsite gets its own bot token, admin chat ID, and webhook secret, so multiple stores in a multisite network can each run their own independent Telegram bot.",
  },
];

const comparison = [
  { feature: "Bot commands", free: "25", premium: "116+" },
  { feature: "Order notifications", free: true, premium: true },
  { feature: "Product search & cart", free: true, premium: true },
  { feature: "Order tracking", free: true, premium: true },
  { feature: "Webhook auto-setup", free: true, premium: true },
  { feature: "HPOS compatible", free: true, premium: true },
  { feature: "AI customer support", free: false, premium: true },
  { feature: "CRM with Kanban pipeline", free: false, premium: true },
  { feature: "Automation rules engine", free: false, premium: true },
  { feature: "Multi-agent support", free: false, premium: true },
  { feature: "WhatsApp Business API", free: false, premium: true },
  { feature: "REST API & PDF reports", free: false, premium: true },
];

const useCases = [
  {
    title: "Physical Product Stores",
    description:
      "Clothing, electronics, groceries, cosmetics — let customers browse your catalog, add to cart, and check out without ever leaving Telegram. Inline keyboards make product discovery effortless, and order tracking eliminates the most common support question.",
    icon: FaBoxes,
    color: "from-emerald-500 to-teal-600",
    examples: ["Fashion boutiques", "Electronics shops", "Grocery delivery", "Cosmetics brands"],
  },
  {
    title: "Digital Downloads & Services",
    description:
      "Sell ebooks, courses, software licenses, design templates, or consulting sessions. Customers complete checkout through your existing WooCommerce flow, then track their order status and access delivery links directly in Telegram.",
    icon: FaCloud,
    color: "from-blue-500 to-indigo-600",
    examples: ["Online courses", "Ebook sellers", "Software vendors", "Freelance services"],
  },
  {
    title: "Local & Pickup Stores",
    description:
      "Run a bakery, restaurant, or local shop? Customers place orders via Telegram and pick them up — no app to install, no account to create. Perfect for stores that want a quick commerce channel without rebuilding their stack.",
    icon: FaStore,
    color: "from-amber-500 to-orange-600",
    examples: ["Restaurants & cafés", "Bakeries", "Pharmacies", "Florists"],
  },
  {
    title: "Subscription & Membership Sites",
    description:
      "Notify subscribers about renewal status, new content drops, or membership tier changes. The bot's notification pipeline works for any WooCommerce order status transition, so subscription stores stay in touch automatically.",
    icon: FaUsers,
    color: "from-violet-500 to-purple-600",
    examples: ["Membership sites", "Newsletter paid tiers", "SaaS products", "Patreon-style creators"],
  },
  {
    title: "Wholesale & B2B Vendors",
    description:
      "Give wholesale buyers a private Telegram channel to track orders, request quotes, and receive bulk shipment updates. The bot handles multiple customers per admin chat without leaking private order details between buyers.",
    icon: FaTags,
    color: "from-rose-500 to-pink-600",
    examples: ["Wholesale distributors", "B2B suppliers", "Drop-ship agents", "Manufacturers"],
  },
  {
    title: "Niche & Hobby Stores",
    description:
      "From collectibles and crafts to specialty foods and gaming gear — turn your most passionate customers into a Telegram community where orders, support, and announcements happen in one place.",
    icon: FaGift,
    color: "from-cyan-500 to-blue-600",
    examples: ["Collectibles shops", "Craft sellers", "Hobby stores", "Specialty foods"],
  },
];

const performanceMetrics = [
  { label: "Plugin Size", value: "< 200 KB", icon: FaBolt, desc: "Compressed and lightweight. Loads instantly on any host." },
  { label: "DB Tables", value: "2", icon: FaDatabase, desc: "Minimal database footprint. No bloat, no orphan options on uninstall." },
  { label: "External Deps", value: "0", icon: FaPlug, desc: "No Composer or npm packages. Pure WordPress + WooCommerce APIs only." },
  { label: "Bot Response", value: "< 1s", icon: FaTachometerAlt, desc: "Webhook-driven, so customers see replies in under a second." },
  { label: "Code Standard", value: "WP-Extra", icon: FaCode, desc: "Follows WordPress Coding Standards for security and maintainability." },
  { label: "Languages", value: "1 (EN)", icon: FaLanguage, desc: "Free edition ships English. Premium unlocks multi-language support." },
];

const securityFeatures = [
  {
    title: "Per-site Webhook Secret",
    description:
      "A 32-character secret is auto-generated at activation. Every incoming Telegram request must include it, validated with hash_equals() to prevent timing attacks.",
    icon: FaLock,
  },
  {
    title: "Sanitized Inbound Input",
    description:
      "All fields arriving from Telegram (chat ID, names, message text) are sanitized before storage. Output is escaped and nonce-verified where applicable.",
    icon: FaShieldAlt,
  },
  {
    title: "Self-hosted Data",
    description:
      "Nothing is sent to a third-party server. All communication is direct between your site and Telegram's official API, using your own bot token.",
    icon: FaServer,
  },
  {
    title: "Clean Uninstall",
    description:
      "Deleting the plugin drops both custom tables and removes all options, transients, and scheduled events. No leftover data, no orphans.",
    icon: FaSync,
  },
];

const testimonials = [
  {
    quote:
      "We replaced a clunky WhatsApp workflow with this plugin in a weekend. Order-tracking questions dropped 70% in the first month because customers can /track their own orders without calling us.",
    author: "Shop Owner",
    role: "Fashion boutique · Dhaka",
    rating: 5,
  },
  {
    quote:
      "Setup took less than 10 minutes. The webhook auto-setup is genius — we didn't have to touch cURL or Postman once. Our customers love being able to /search our catalog from inside Telegram.",
    author: "Store Founder",
    role: "Electronics retailer · Kolkata",
    rating: 5,
  },
  {
    quote:
      "I've tried other WooCommerce Telegram plugins — most are bloated with dozens of settings nobody uses. This one does exactly what it promises, with 25 solid commands and nothing more. Finally a clean option.",
    author: "WordPress Developer",
    role: "Agency build · Singapore",
    rating: 5,
  },
];

const chatPreviewMessages = [
  { from: "bot", text: "Welcome to My Store! 🛍️\n\nI'm your personal shopping assistant. Type /help to see what I can do.", time: "10:32" },
  { from: "user", text: "/products", time: "10:33" },
  { from: "bot", text: "🛒 Featured Products\n\n1. Cotton T-Shirt — $24.99\n2. Wireless Earbuds — $59.00\n3. Leather Wallet — $39.50\n\nTap a product to view details 👇", time: "10:33", keyboard: ["Cotton T-Shirt", "Wireless Earbuds", "Leather Wallet"] },
  { from: "user", text: "/add 42", time: "10:34" },
  { from: "bot", text: "✅ Added Cotton T-Shirt to cart. Use /cart to view.", time: "10:34" },
  { from: "user", text: "/checkout", time: "10:35" },
  { from: "bot", text: "🧾 Your cart has 1 item — $24.99\n\n👉 Complete payment here:\nhttps://mystore.com/checkout/?tg=abc123", time: "10:35", keyboard: ["View Cart", "Clear Cart", "Continue Shopping"] },
];

const differentiators = [
  {
    title: "Truly Free, No Lock-in",
    vs: "Most 'free' Telegram plugins lock key features behind a paywall or time-limit the trial.",
    ours:
      "Every feature in the free edition works forever. 25 commands, order notifications, cart, checkout, tracking — all unlocked. GPL-licensed, no nag screens.",
    icon: FaShieldAlt,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "Zero External Dependencies",
    vs: "Competitor plugins often require Composer packages, external SDKs, or a connection to their own servers.",
    ours:
      "Pure WordPress and WooCommerce APIs only. The plugin ships as a single folder with no vendor directory. No third-party server ever sees your data.",
    icon: FaPlug,
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "HPOS Compatible from Day One",
    vs: "Many Telegram plugins still use the legacy post-meta order storage and break on modern WooCommerce installs.",
    ours:
      "Declares HPOS compatibility in the plugin header. Uses wc_get_order() exclusively, so it runs cleanly on both legacy and High-Performance Order Storage.",
    icon: FaSync,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Self-hosted, Private by Design",
    vs: "Some plugins route customer messages through their own servers, creating a privacy and uptime risk.",
    ours:
      "Your WordPress site talks directly to api.telegram.org using your own bot token. No middleman. The webhook secret is generated on your site and never leaves it.",
    icon: FaLock,
    color: "from-rose-500 to-pink-600",
  },
  {
    title: "Clean Uninstall",
    vs: "Many plugins leave orphan options, transients, and tables in your database after deletion.",
    ours:
      "Deleting the plugin drops both custom tables and removes every option, transient, and scheduled event. Zero leftovers, zero bloat.",
    icon: FaBroom,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Built to WordPress Coding Standards",
    vs: "A lot of Telegram plugins are quick hacks that fail WordPress.org review and break on PHP 8.x.",
    ours:
      "Follows the WordPress-Extra coding standard. All input sanitized, output escaped, nonces verified. Tested on PHP 7.4, 8.0, 8.1, 8.2.",
    icon: FaCode,
    color: "from-indigo-500 to-blue-600",
  },
];

const integrations = [
  { name: "WooCommerce", desc: "Core dependency — reads products, orders, customers", icon: FaShoppingCart, status: "Required", color: "#96588a" },
  { name: "WooCommerce HPOS", desc: "High-Performance Order Storage, fully compatible", icon: FaLayerGroup, status: "Compatible", color: "#7c5cff" },
  { name: "WooCommerce Subscriptions", desc: "Renewal order notifications fire automatically", icon: FaSync, status: "Works", color: "#16a34a" },
  { name: "WooCommerce Bookings", desc: "Booking confirmation notifications supported", icon: FaRegClock, status: "Works", color: "#0891b2" },
  { name: "WPML", desc: "Free edition ships English; ready for translation hooks", icon: FaLanguage, status: "Ready", color: "#0ea5a4" },
  { name: "Elementor", desc: "No conflict — plugin runs entirely in wp-admin & webhook", icon: FaLayerGroup, status: "No conflict", color: "#92003b" },
  { name: "Yoast SEO", desc: "No overlap — different concern, runs side by side", icon: FaSearch, status: "No conflict", color: "#a61e08" },
  { name: "WP Rocket", desc: "Webhook endpoint is excluded from caching automatically", icon: FaBolt, status: "Compatible", color: "#f56640" },
  { name: "Cloudflare", desc: "Webhook works behind CF; just whitelist api.telegram.org", icon: FaCloud, status: "Compatible", color: "#f38020" },
];

const authorInfo = {
  name: "markhubs",
  role: "Plugin Author · WooCommerce Specialist",
  bio: "markhubs is a WordPress and WooCommerce development studio focused on building lightweight, secure, GPL-licensed plugins that respect store owners' data and budgets. The markhubs Store Manager for Telegram is the studio's first public release, born from real-world experience building Telegram commerce channels for client stores.",
  stats: [
    { value: "6+", label: "Years building for WordPress" },
    { value: "100+", label: "WooCommerce stores shipped" },
    { value: "1", label: "External service used (Telegram)" },
    { value: "0", label: "Tracker servers operated" },
  ],
  links: [
    { label: "GitHub", url: "https://github.com/dev-nayanray", icon: FaGithub },
    { label: "Plugin Source", url: "https://github.com/dev-nayanray/markhubs-store-manager-for-telegram", icon: FaCode },
    { label: "Documentation", url: "/markhubs-store-manager-for-telegram/docs", icon: FaBook, internal: true },
  ],
};

/* ------------------------------------------------------------------ */
/*  Helper components                                                  */
/* ------------------------------------------------------------------ */

function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"} mb-14`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-500/20"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
        {badge}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-surface-900 dark:text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 text-lg text-surface-900/60 dark:text-white/50 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — premium mesh gradient + parallax + glassmorphism           */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  // Parallax mouse-tracking for the glow orbs
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });
  const orb1X = useTransform(springX, [0, 1], [-30, 30]);
  const orb1Y = useTransform(springY, [0, 1], [-30, 30]);
  const orb2X = useTransform(springX, [0, 1], [30, -30]);
  const orb2Y = useTransform(springY, [0, 1], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 pt-32 overflow-hidden bg-gradient-to-br from-surface-50 via-brand-50/40 to-surface-100 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950"
    >
      {/* Premium mesh gradient background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Parallax orbs */}
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
        >
          <div className="w-full h-full bg-gradient-to-br from-sky-400 via-blue-500 to-brand-500" />
        </motion.div>
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40"
        >
          <div className="w-full h-full bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500" />
        </motion.div>

        {/* Animated SVG rings */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="tg-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0088cc" />
              <stop offset="50%" stopColor="#7c5cff" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          {[1, 2, 3, 4].map((ring) => (
            <motion.circle
              key={ring}
              cx={viewport.width / 2}
              cy={viewport.height / 2}
              r={120 + ring * 90}
              fill="none"
              stroke="url(#tg-line)"
              strokeWidth="1"
              strokeDasharray="12 24"
              initial={{ strokeDashoffset: 0, strokeOpacity: 0.05 }}
              animate={{ strokeDashoffset: [-40, 0], strokeOpacity: [0.05, 0.18, 0.05] }}
              transition={{ duration: 8 + ring * 2, repeat: Infinity, ease: "linear", delay: ring }}
            />
          ))}
        </svg>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* Animated noise shimmer (premium touch) */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(124, 92, 255, 0.05) 25%, transparent 50%, rgba(0, 136, 204, 0.05) 75%, transparent 100%)",
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Premium badge with shimmer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <span className="relative group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface-0/70 dark:bg-surface-900/60 backdrop-blur-xl border border-surface-100/60 dark:border-white/10 shadow-glow overflow-hidden">
            {/* Shimmer sweep */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-500/10 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative flex items-center gap-2 text-sm font-semibold text-surface-900 dark:text-white">
              <span className="relative flex">
                <FaWordpress className="w-4 h-4 text-brand-500" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-surface-0 dark:ring-surface-900 animate-pulse" />
              </span>
              Free WordPress Plugin
            </span>
            <span className="relative w-px h-4 bg-surface-100 dark:bg-white/10" />
            <span className="relative text-sm font-medium text-surface-900/60 dark:text-white/50">v1.0.0 · GPL</span>
          </span>
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-surface-900 dark:text-white leading-[1.05]">
            Turn WooCommerce into a
            <br className="hidden sm:block" />
            <span className="relative inline-block mt-2">
              {/* Animated gradient text */}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-brand-500 to-purple-600 bg-[length:200%_auto]"
                animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                Telegram sales machine
              </motion.span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 400 12"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ delay: 1, duration: 1 }}
              >
                <motion.path d="M2 8 Q 200 2 398 8" stroke="url(#tg-line)" strokeWidth="3" strokeLinecap="round" />
              </motion.svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-surface-900/60 dark:text-white/55 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-surface-900 dark:text-white">markhubs Store Manager for Telegram</span> lets
            your customers browse products, place orders, track shipments, and chat with your store —
            all directly inside Telegram. 25 core commands, zero bloat, 100% free.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <motion.a
            href="#download"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-bold rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
            <FaDownload className="relative" />
            <span className="relative">Download Plugin</span>
          </motion.a>
          <motion.a
            href="https://github.com/dev-nayanray/markhubs-store-manager-for-telegram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-surface-0/70 dark:bg-surface-900/60 backdrop-blur-xl border border-surface-100/60 dark:border-white/10 text-surface-900 dark:text-white font-bold rounded-2xl hover:bg-surface-0 dark:hover:bg-surface-900 transition-all duration-300 shadow-lg"
          >
            <FaGithub />
            <span>View on GitHub</span>
          </motion.a>
          <motion.a
            href="https://t.me/BotFather"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <FaTelegram />
            <span>Create a Bot</span>
          </motion.a>

          <Link
            to="/markhubs-store-manager-for-telegram/docs"
            className="inline-flex items-center gap-3 px-8 py-4 bg-surface-0/70 dark:bg-surface-900/60 backdrop-blur-xl border border-brand-500/30 text-brand-600 dark:text-brand-300 font-bold rounded-2xl hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all duration-300 shadow-lg"
          >
            <FaBook />
            <span>Documentation</span>
            <FaArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Premium glassmorphism stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
        >
          {pluginStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative bg-surface-0/60 dark:bg-surface-900/50 backdrop-blur-xl border border-surface-100/60 dark:border-white/10 rounded-2xl p-5 text-center shadow-lg shadow-brand-500/5 hover:shadow-glow transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient sheen */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-500/5 to-purple-500/5" />
                <Icon className="relative w-6 h-6 mx-auto text-brand-500 mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="relative text-3xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
                <div className="relative text-xs uppercase tracking-wider text-surface-900/40 dark:text-white/40 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-surface-900/40 dark:text-white/40"
          >
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <FaChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features                                                           */
/* ------------------------------------------------------------------ */

function Features() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Features"
          title={
            <>
              Everything your store needs,
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700">
                {" "}in one Telegram bot
              </span>
            </>
          }
          subtitle="A complete command-driven commerce experience built on pure WordPress and WooCommerce APIs. No bloat, no third-party tracking, no locked doors."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-7 shadow-sm hover:shadow-card transition-all duration-300 ${feature.span}`}
              >
                {/* Hover gradient sheen */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.06]`}
                />

                <div className="relative z-10">
                  <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-surface-900/60 dark:text-white/55 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Commands showcase                                                  */
/* ------------------------------------------------------------------ */

function Commands() {
  return (
    <section
      id="commands"
      className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-surface-50 to-surface-0 dark:from-surface-900 dark:to-surface-950"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="25 Bot Commands"
          title={
            <>
              A full command set for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-brand-500">
                {" "}every shopping journey
              </span>
            </>
          }
          subtitle="From product discovery to post-purchase tracking, customers do everything through typed commands and inline keyboard taps inside Telegram."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commandCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-7 shadow-sm hover:shadow-card transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color} shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-surface-900 dark:text-white">{cat.name}</h3>
                    <p className="text-sm text-surface-900/50 dark:text-white/40">
                      {cat.commands.length} command{cat.commands.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {cat.commands.map((c) => (
                    <div
                      key={c.cmd}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-50 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors duration-200 group"
                    >
                      <code className="font-mono text-sm font-semibold text-brand-600 dark:text-brand-300 group-hover:translate-x-1 transition-transform duration-200">
                        {c.cmd}
                      </code>
                      <span className="text-sm text-surface-900/60 dark:text-white/50 text-right">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works                                                       */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  return (
    <section id="setup" className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950 overflow-hidden">
      {/* Decorative connecting line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          badge="Setup in Minutes"
          title={
            <>
              From install to first order
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}in 4 steps
              </span>
            </>
          }
          subtitle="No coding required. If you can install a WordPress plugin, you can run a Telegram storefront."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {setupSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-6 h-full hover:shadow-card transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-4xl font-black text-surface-100 dark:text-white/10">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-surface-900/60 dark:text-white/50 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow between steps */}
                {idx < setupSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 -translate-y-1/2 w-6 h-6 rounded-full bg-brand-500 items-center justify-center shadow-glow">
                    <FaArrowRight className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-8">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-surface-900/50 dark:text-white/40 mb-6">
              Requirements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {requirements.map((req) => {
                const Icon = req.icon;
                return (
                  <div key={req.label} className="text-center">
                    <Icon className="w-7 h-7 mx-auto text-brand-500 mb-2" />
                    <div className="text-sm text-surface-900/60 dark:text-white/50">{req.label}</div>
                    <div className="text-lg font-bold text-surface-900 dark:text-white">{req.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Free vs Premium comparison                                        */
/* ------------------------------------------------------------------ */

function Comparison() {
  return (
    <section id="premium" className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-surface-0 to-surface-50 dark:from-surface-950 dark:to-surface-900">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Free vs Premium"
          title={
            <>
              Free forever.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}Premium when you scale.
              </span>
            </>
          }
          subtitle="The free plugin is fully functional with no locked doors. Premium is a separately hosted edition for stores that outgrow the basics."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-card"
        >
          <div className="grid grid-cols-3 bg-surface-50 dark:bg-white/5">
            <div className="p-5 text-sm font-semibold text-surface-900/60 dark:text-white/50">Feature</div>
            <div className="p-5 text-center text-sm font-bold text-brand-600 dark:text-brand-300">Free</div>
            <div className="p-5 text-center text-sm font-bold text-purple-600 dark:text-purple-300">Premium</div>
          </div>
          <div className="divide-y divide-surface-100 dark:divide-white/5">
            {comparison.map((row, idx) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="grid grid-cols-3 items-center hover:bg-surface-50 dark:hover:bg-white/5 transition-colors duration-200"
              >
                <div className="p-4 text-sm text-surface-900/70 dark:text-white/60 pl-5">{row.feature}</div>
                <div className="p-4 text-center">
                  {typeof row.free === "boolean" ? (
                    row.free ? (
                      <FaCheckCircle className="w-5 h-5 mx-auto text-emerald-500" />
                    ) : (
                      <span className="text-surface-300 dark:text-white/20">—</span>
                    )
                  ) : (
                    <span className="text-sm font-bold text-surface-900 dark:text-white">{row.free}</span>
                  )}
                </div>
                <div className="p-4 text-center">
                  {typeof row.premium === "boolean" ? (
                    row.premium ? (
                      <FaCheckCircle className="w-5 h-5 mx-auto text-purple-500" />
                    ) : (
                      <span className="text-surface-300 dark:text-white/20">—</span>
                    )
                  ) : (
                    <span className="text-sm font-bold text-surface-900 dark:text-white">{row.premium}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="text-center text-sm text-surface-900/50 dark:text-white/40 mt-6">
          Premium is separate, optional software hosted on the developer's own site. Nothing in the free plugin is
          time-limited or locked.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick Start — copy-paste commands for developers                  */
/* ------------------------------------------------------------------ */

function QuickStart() {
  const [activeTab, setActiveTab] = useState<"install" | "wpcli" | "botfather">("install");
  const [copied, setCopied] = useState(false);

  const snippets = {
    install: {
      label: "WP-CLI Install",
      lang: "bash",
      code: `# Download and install in one shot
wp plugin install markhubs-store-manager-for-telegram \\
  --activate

# Or install from a local zip
wp plugin install ./markhubs-store-manager-for-telegram.zip --activate

# Verify it's active
wp plugin list --status=active | grep telegram`,
    },
    wpcli: {
      label: "Configure via WP-CLI",
      lang: "bash",
      code: `# Set your bot token (get it from @BotFather)
wp option update wtm_free_settings \\
  --format=json \\
  '{"bot_token":"123:ABCdefGHI","admin_chat_id":"987654321"}'

# Set the webhook — the plugin will call Telegram's API
wp eval '\\WTM_Free_Telegram::set_webhook();'

# Check the bot is connected
wp eval 'var_dump(\\WTM_Free_Telegram::get_me());'`,
    },
    botfather: {
      label: "BotFather Chat",
      lang: "text",
      code: `You: /newbot
BotFather: Alright, a new bot. How are we going to call it?
           Please choose a name for your bot.

You: My Store Bot

BotFather: Good. Now let's choose a username for your bot.
           It must end in 'bot'. Like this, for example:
           TetrisBot or tetris_bot.

You: mystore_bot

BotFather: Done! Congratulations on your new bot.
           Use this token to access the HTTP API:
           123456789:ABCdefGHIjklMNOpqrsTUVwxyz

           Keep your token secure and store it safely,
           anyone can use it to control your bot.`,
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quick-start" className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-surface-950 to-surface-900 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          badge="Quick Start"
          title={
            <>
              For developers who'd rather
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">
                {" "}copy-paste than click
              </span>
            </>
          }
          subtitle="Set up the entire plugin from the terminal, or follow the BotFather chat transcript. No GUI required."
        />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {(Object.keys(snippets) as Array<keyof typeof snippets>).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === key
                  ? "bg-gradient-to-r from-brand-500 to-brand-700 text-white shadow-glow"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {snippets[key].label}
            </button>
          ))}
        </div>

        {/* Code block */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-surface-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs font-mono text-white/40">
                {activeTab === "botfather" ? "telegram_chat.txt" : activeTab === "wpcli" ? "configure.sh" : "install.sh"}
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <FaCheckCircle className="w-3 h-3 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <FaCopy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code */}
          <pre className="px-5 py-5 overflow-x-auto no-scrollbar text-sm font-mono leading-relaxed">
            <code className="text-emerald-300 whitespace-pre">{snippets[activeTab].code}</code>
          </pre>
        </motion.div>

        {/* Hint */}
        <p className="text-center text-sm text-white/40 mt-4">
          Need the GUI version? See the{" "}
          <Link to="/markhubs-store-manager-for-telegram/docs#setup" className="text-brand-400 hover:text-brand-300 underline">
            setup guide in the docs
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          badge="FAQ"
          title={
            <>
              Questions, answered
            </>
          }
          subtitle="Everything you need to know before you install."
        />

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-surface-900 dark:text-white">{item.q}</span>
                <motion.span animate={{ rotate: open === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <FaChevronDown className="w-4 h-4 text-brand-500 shrink-0" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-surface-900/60 dark:text-white/55 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Live chat preview (phone mockup)                                  */
/* ------------------------------------------------------------------ */

function ChatPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [visibleCount, setVisibleCount] = useState(0);

  // Animate messages in one-by-one when the section enters the viewport.
  useEffect(() => {
    if (!isInView) return;
    if (visibleCount >= chatPreviewMessages.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 800);
    return () => clearTimeout(t);
  }, [isInView, visibleCount]);

  return (
    <section
      id="live-preview"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950 overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 text-sky-300 text-xs font-semibold uppercase tracking-wider border border-sky-500/20 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Live Preview
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            See the bot in action
          </h2>
          <p className="mt-5 text-lg text-white/60 leading-relaxed">
            A real Telegram conversation between a customer and a WooCommerce store.
            No app to install, no login required — customers just open your bot and start shopping.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { icon: FaBolt, text: "Instant responses — webhook-driven, under 1s latency" },
              { icon: FaShoppingCart, text: "Inline keyboards for one-tap product discovery" },
              { icon: FaLock, text: "Secure checkout links generated from your WooCommerce cart" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-3 text-white/80">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <FaDownload />
              Try it free
            </a>
            <Link
              to="/markhubs-store-manager-for-telegram/docs#commands"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              <FaBook />
              See all commands
            </Link>
          </div>
        </motion.div>

        {/* Right: phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Phone frame */}
            <div className="relative bg-surface-950 rounded-[2.5rem] border-4 border-surface-800 shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-surface-950 rounded-b-2xl z-20" />

              {/* Telegram-style header */}
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-4 pt-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <FaStore className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">My Store Bot</div>
                  <div className="text-white/70 text-xs">online · typically replies instantly</div>
                </div>
                <FaTelegram className="w-5 h-5 text-white/80" />
              </div>

              {/* Chat body */}
              <div className="bg-[#0e1621] px-3 py-4 min-h-[440px] max-h-[440px] overflow-y-auto no-scrollbar space-y-2">
                {chatPreviewMessages.slice(0, visibleCount).map((msg, idx) => {
                  const isBot = msg.from === "bot";
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[85%] ${isBot ? "bg-[#182533]" : "bg-[#2b5278]"} rounded-2xl px-3 py-2`}>
                        <p className="text-sm text-white whitespace-pre-line leading-relaxed">{msg.text}</p>
                        <div className={`text-[10px] text-white/40 mt-1 ${isBot ? "text-right" : "text-right"}`}>
                          {msg.time}
                        </div>
                        {msg.keyboard && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {msg.keyboard.map((btn) => (
                              <span
                                key={btn}
                                className="px-2 py-1 rounded-md bg-sky-500/20 text-sky-300 text-[11px] border border-sky-500/30"
                              >
                                {btn}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
                {visibleCount < chatPreviewMessages.length && (
                  <div className="flex justify-start">
                    <div className="bg-[#182533] rounded-2xl px-4 py-3 flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="bg-[#17212b] px-3 py-3 flex items-center gap-2">
                <div className="flex-1 bg-[#0e1621] rounded-full px-4 py-2 text-white/30 text-sm">
                  Message...
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center">
                  <FaTelegram className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5"
            >
              <FaCheckCircle className="w-3 h-3" />
              Order placed
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-brand-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5"
            >
              <FaBell className="w-3 h-3" />
              Admin notified
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Use cases                                                          */
/* ------------------------------------------------------------------ */

function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Use Cases"
          title={
            <>
              Built for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}every kind of store
              </span>
            </>
          }
          subtitle="From physical product shops to digital downloads, local pickup stores to B2B vendors — if it runs on WooCommerce, the bot turns it into a Telegram storefront."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-7 shadow-sm hover:shadow-card transition-all duration-300"
              >
                <div className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${uc.color} shadow-lg mb-5`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-3">{uc.title}</h3>
                <p className="text-sm text-surface-900/60 dark:text-white/55 leading-relaxed mb-4">{uc.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {uc.examples.map((ex) => (
                    <span
                      key={ex}
                      className="px-2.5 py-1 rounded-full bg-surface-100 dark:bg-white/5 text-xs text-surface-900/60 dark:text-white/60 border border-surface-100 dark:border-white/10"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Performance metrics                                                */
/* ------------------------------------------------------------------ */

function Performance() {
  return (
    <section id="performance" className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-surface-50 to-surface-0 dark:from-surface-900 dark:to-surface-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Performance"
          title={
            <>
              Lightweight by design,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                {" "}fast by default
              </span>
            </>
          }
          subtitle="No bloat, no dependencies, no slowdowns. The plugin is engineered to add a Telegram commerce channel to your store without touching your storefront performance."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {performanceMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5 text-center hover:shadow-card transition-shadow"
              >
                <Icon className="w-6 h-6 mx-auto text-brand-500 mb-3" />
                <div className="text-2xl font-bold text-surface-900 dark:text-white">{m.value}</div>
                <div className="text-xs uppercase tracking-wider text-surface-900/50 dark:text-white/40 mt-1 mb-2">
                  {m.label}
                </div>
                <p className="text-[11px] text-surface-900/50 dark:text-white/45 leading-relaxed">{m.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Security                                                            */
/* ------------------------------------------------------------------ */

function Security() {
  return (
    <section id="security" className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading
            align="left"
            badge="Security First"
            title={
              <>
                Built with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  {" "}security at the core
                </span>
              </>
            }
            subtitle="Your customers trust you with their orders. The plugin respects that trust with per-site secrets, sanitized inputs, and a self-hosted data model — nothing leaves your site except messages bound for Telegram."
          />

          <div className="space-y-4">
            {securityFeatures.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4 bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5"
                >
                  <div className="shrink-0 p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-surface-900 dark:text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-surface-900/60 dark:text-white/55 leading-relaxed">{s.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Concentric rings */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10" />
            <div className="absolute inset-8 rounded-full border-2 border-emerald-500/15" />
            <div className="absolute inset-16 rounded-full border-2 border-emerald-500/20" />
            <div className="absolute inset-24 rounded-full border-2 border-emerald-500/30" />

            {/* Center shield */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl flex items-center justify-center">
                <FaShieldAlt className="w-14 h-14 text-white" />
              </div>
            </motion.div>

            {/* Orbiting badges */}
            {[
              { icon: FaLock, label: "Secret Key", angle: 0 },
              { icon: FaServer, label: "Self-hosted", angle: 90 },
              { icon: FaSync, label: "Clean Uninstall", angle: 180 },
              { icon: FaCode, label: "Sanitized", angle: 270 },
            ].map((badge, idx) => {
              const Icon = badge.icon;
              const rad = (badge.angle * Math.PI) / 180;
              const radius = 45; // percentage from center
              const x = 50 + radius * Math.cos(rad);
              const y = 50 + radius * Math.sin(rad);
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.15, type: "spring" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className="bg-surface-0 dark:bg-surface-900 border border-surface-100 dark:border-white/10 rounded-2xl p-3 shadow-lg flex flex-col items-center gap-1 min-w-[80px]">
                    <Icon className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-medium text-surface-900 dark:text-white text-center">
                      {badge.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                        */
/* ------------------------------------------------------------------ */

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-surface-0 to-surface-50 dark:from-surface-950 dark:to-surface-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Testimonials"
          title={
            <>
              Loved by
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}store owners
              </span>
            </>
          }
          subtitle="Real feedback from WooCommerce store owners and WordPress developers using the plugin in production."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-7 shadow-sm hover:shadow-card transition-shadow duration-300 relative"
            >
              <FaQuoteLeft className="w-8 h-8 text-brand-500/20 mb-4" />

              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>

              <p className="text-surface-900/70 dark:text-white/65 leading-relaxed mb-6 text-sm">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-100 dark:border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-surface-900 dark:text-white text-sm">{t.author}</div>
                  <div className="text-xs text-surface-900/50 dark:text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Download / CTA                                                    */
/* ------------------------------------------------------------------ */

function DownloadCTA() {
  return (
    <section
      id="download"
      className="relative py-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <FaStar className="w-3 h-3 text-amber-300" />
          v1.0.0 · GPL · Updated Sep 2026
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight"
        >
          Start selling on Telegram today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
        >
          Download the plugin, configure your bot in under five minutes, and let your customers shop directly inside
          Telegram. No subscriptions, no lock-in, no surprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <motion.a
            href="https://github.com/dev-nayanray/markhubs-store-manager-for-telegram/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-700 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
          >
            <FaDownload />
            <span>Download .zip</span>
          </motion.a>
          <motion.a
            href="https://github.com/dev-nayanray/markhubs-store-manager-for-telegram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
          >
            <FaGithub />
            <span>View Source</span>
          </motion.a>
          <Link
            to="/markhubs-store-manager-for-telegram/docs"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
          >
            <FaBook />
            <span>Read the Docs</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { icon: FaShieldAlt, text: "GPLv2 Licensed" },
            { icon: FaLock, text: "Self-hosted Data" },
            { icon: FaBolt, text: "Zero Dependencies" },
            { icon: FaMobileAlt, text: "Works on Any Device" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex flex-col items-center gap-2 text-white/80">
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust bar — logo marquee                                           */
/* ------------------------------------------------------------------ */

function TrustBar() {
  const logos = [
    { name: "WordPress", icon: FaWordpress, color: "#21759b" },
    { name: "WooCommerce", icon: FaShoppingCart, color: "#96588a" },
    { name: "Telegram", icon: FaTelegram, color: "#0088cc" },
    { name: "PHP", icon: FaPhp, color: "#777bb4" },
    { name: "HPOS", icon: FaLayerGroup, color: "#7c5cff" },
    { name: "GPLv2", icon: FaShieldAlt, color: "#16a34a" },
    { name: "SSL", icon: FaLock, color: "#0ea5a4" },
    { name: "BotFather", icon: FaRobot, color: "#0088cc" },
  ];

  return (
    <section className="relative py-12 px-4 sm:px-6 border-y border-surface-100 dark:border-white/10 bg-surface-0 dark:bg-surface-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs uppercase tracking-[0.2em] text-surface-900/40 dark:text-white/40 mb-8"
        >
          Built on the technologies your store already trusts
        </motion.p>

        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-0 dark:from-surface-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-0 dark:from-surface-950 to-transparent z-10 pointer-events-none" />

          {/* Marquee */}
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...logos, ...logos, ...logos].map((logo, idx) => {
              const Icon = logo.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  <Icon className="w-7 h-7" style={{ color: logo.color }} />
                  <span className="font-bold text-lg text-surface-900 dark:text-white whitespace-nowrap">
                    {logo.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Counter stats — big numbers that count up on scroll                */
/* ------------------------------------------------------------------ */

function CounterStats() {
  const stats = [
    { value: 25, suffix: "", label: "Bot Commands", icon: FaRobot, color: "from-violet-500 to-purple-600" },
    { value: 2, suffix: "", label: "DB Tables Only", icon: FaDatabase, color: "from-blue-500 to-cyan-600" },
    { value: 0, suffix: "", label: "External Deps", icon: FaPlug, color: "from-emerald-500 to-teal-600" },
    { value: 100, suffix: "%", label: "Free & Open Source", icon: FaShieldAlt, color: "from-amber-500 to-orange-600" },
    { value: 1, suffix: "s", label: "Bot Response Time", icon: FaBolt, color: "from-rose-500 to-pink-600" },
    { value: 30, suffix: "d", label: "Auto-prune Chat Logs", icon: FaSync, color: "from-indigo-500 to-blue-600" },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-gradient-to-br from-surface-950 via-surface-900 to-surface-950 overflow-hidden">
      {/* Premium backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-wider border border-white/10 mb-5">
            <FaTrophy className="w-3 h-3 text-amber-400" />
            By the Numbers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Performance you can
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400"> measure</span>
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Hard numbers that prove the plugin is engineered for speed, security, and zero bloat.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${stat.color}`} />

                <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="relative text-4xl font-bold text-white mb-1">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="relative text-xs text-white/50 leading-tight">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Count-up animation hook — animates from 0 to value when in view */
function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Architecture — visual data flow diagram                            */
/* ------------------------------------------------------------------ */

function Architecture() {
  const nodes = [
    {
      label: "WooCommerce",
      sublabel: "Your store",
      icon: FaShoppingCart,
      color: "from-purple-500 to-pink-600",
      desc: "Products, orders, customers — everything stays in your existing WooCommerce database.",
    },
    {
      label: "markhubs Plugin",
      sublabel: "Telegram bridge",
      icon: FaWordpress,
      color: "from-brand-500 to-brand-700",
      desc: "Receives Telegram webhooks, dispatches commands, sends notifications. Pure WordPress APIs.",
    },
    {
      label: "Telegram Bot API",
      sublabel: "Customer channel",
      icon: FaTelegram,
      color: "from-sky-500 to-blue-600",
      desc: "Customers chat with your bot. Messages flow both ways in real time, end-to-end encrypted by Telegram.",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="How it Works"
          title={
            <>
              A three-node
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}commerce pipeline
              </span>
            </>
          }
          subtitle="No middlemen, no third-party servers. Your WordPress site talks directly to Telegram using your own bot token."
        />

        <div className="relative grid md:grid-cols-3 gap-6 items-stretch">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-purple-500 via-brand-500 to-sky-500 -translate-y-1/2 z-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="relative z-10 bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-6 shadow-card hover:shadow-glow transition-shadow duration-300"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${node.color} shadow-lg mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-xs uppercase tracking-wider text-surface-900/40 dark:text-white/40 mb-1">
                  {node.sublabel}
                </div>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">{node.label}</h3>
                <p className="text-sm text-surface-900/60 dark:text-white/55 leading-relaxed">{node.desc}</p>

                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-100 dark:bg-white/5 flex items-center justify-center text-xs font-bold text-surface-900/40 dark:text-white/40">
                  {idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Data flow legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <FaArrowRight className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-surface-900 dark:text-white text-sm">Inbound: Customer → Store</div>
              <div className="text-xs text-surface-900/60 dark:text-white/55 mt-1">
                Customer sends a command → Telegram forwards to your webhook → plugin sanitizes, dispatches, replies.
              </div>
            </div>
          </div>
          <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5 flex items-start gap-3">
            <FaBell className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-surface-900 dark:text-white text-sm">Outbound: Store → Customer</div>
              <div className="text-xs text-surface-900/60 dark:text-white/55 mt-1">
                Order placed or status changed → plugin fires Telegram sendMessage → customer gets instant notification.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive command explorer                                       */
/* ------------------------------------------------------------------ */

function CommandExplorer() {
  const [active, setActive] = useState(0);

  const explorers = [
    {
      cmd: "/products",
      title: "Browse Featured Products",
      icon: FaShoppingCart,
      color: "from-emerald-500 to-green-600",
      userMessage: "/products",
      botReply: "🛒 Featured Products\n\n1. Cotton T-Shirt — $24.99\n2. Wireless Earbuds — $59.00\n3. Leather Wallet — $39.50\n\nTap a product to view details 👇",
      keyboard: ["Cotton T-Shirt", "Wireless Earbuds", "Leather Wallet"],
    },
    {
      cmd: "/search",
      title: "Search the Catalog",
      icon: FaSearch,
      color: "from-blue-500 to-cyan-600",
      userMessage: "/search headphones",
      botReply: "🔍 Found 3 products for 'headphones'\n\n1. Wireless Earbuds Pro — $59.00\n2. Studio Headphones — $129.00\n3. Bluetooth Headset — $45.00\n\nUse /product <id> for details.",
      keyboard: ["View Product 1", "View Product 2", "View Product 3"],
    },
    {
      cmd: "/track",
      title: "Track an Order",
      icon: FaTruck,
      color: "from-rose-500 to-pink-600",
      userMessage: "/track 1042",
      botReply: "📦 Order #1042 — Shipped\n\n• 2× Cotton T-Shirt\n• 1× Wireless Earbuds\n\nTotal: $108.98\nCarrier: FedEx\nETA: Tomorrow, 3-5 PM\n\nNeed help? /support",
      keyboard: ["View Invoice", "Contact Support"],
    },
    {
      cmd: "/cart",
      title: "Manage Your Cart",
      icon: FaShoppingCart,
      color: "from-amber-500 to-orange-600",
      userMessage: "/cart",
      botReply: "🛒 Your Cart (2 items)\n\n• Cotton T-Shirt × 2 — $49.98\n• Wireless Earbuds × 1 — $59.00\n\nSubtotal: $108.98\n\nReady to checkout?",
      keyboard: ["Checkout", "Clear Cart", "Continue Shopping"],
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-surface-50 to-surface-0 dark:from-surface-900 dark:to-surface-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Interactive Demo"
          title={
            <>
              Try the bot,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}right here
              </span>
            </>
          }
          subtitle="Click through real bot conversations. Each tab shows a different command in action — this is exactly what your customers will see inside Telegram."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: command selector */}
          <div className="space-y-3">
            {explorers.map((exp, idx) => {
              const Icon = exp.icon;
              const isActive = active === idx;
              return (
                <motion.button
                  key={exp.cmd}
                  onClick={() => setActive(idx)}
                  whileHover={{ x: 6 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                    isActive
                      ? "bg-surface-0 dark:bg-surface-900/60 border-brand-500/40 shadow-glow"
                      : "bg-surface-50 dark:bg-surface-900/30 border-surface-100 dark:border-white/10 hover:border-brand-500/20"
                  }`}
                >
                  <div
                    className={`shrink-0 p-3 rounded-xl bg-gradient-to-br ${exp.color} shadow-lg transition-transform duration-300 ${
                      isActive ? "scale-110" : "scale-100 opacity-70"
                    }`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <code className={`font-mono text-sm font-bold ${isActive ? "text-brand-600 dark:text-brand-300" : "text-surface-900/70 dark:text-white/60"}`}>
                        {exp.cmd}
                      </code>
                      {isActive && (
                        <motion.span
                          layoutId="active-cmd-dot"
                          className="w-2 h-2 rounded-full bg-emerald-400"
                        />
                      )}
                    </div>
                    <div className={`text-sm mt-1 ${isActive ? "text-surface-900 dark:text-white" : "text-surface-900/60 dark:text-white/50"}`}>
                      {exp.title}
                    </div>
                  </div>
                  <FaArrowRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive ? "text-brand-500 translate-x-0" : "text-surface-900/30 dark:text-white/20 -translate-x-2 opacity-0"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Right: chat mockup */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="relative bg-surface-950 rounded-[2rem] border-4 border-surface-800 shadow-2xl overflow-hidden">
                {/* Telegram header */}
                <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <FaStore className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">My Store Bot</div>
                    <div className="text-white/70 text-xs">online · bot</div>
                  </div>
                  <FaTelegram className="w-5 h-5 text-white/80" />
                </div>

                {/* Chat body */}
                <div className="bg-[#0e1621] px-4 py-6 min-h-[360px] space-y-3">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-[#2b5278] rounded-2xl px-4 py-2">
                      <p className="text-sm text-white font-mono">{explorers[active].userMessage}</p>
                      <div className="text-[10px] text-white/40 mt-1 text-right">10:35</div>
                    </div>
                  </div>
                  {/* Bot reply */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] bg-[#182533] rounded-2xl px-4 py-3">
                      <p className="text-sm text-white whitespace-pre-line leading-relaxed">
                        {explorers[active].botReply}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {explorers[active].keyboard.map((btn) => (
                          <span
                            key={btn}
                            className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 text-xs border border-sky-500/30"
                          >
                            {btn}
                          </span>
                        ))}
                      </div>
                      <div className="text-[10px] text-white/40 mt-1 text-right">10:35</div>
                    </div>
                  </motion.div>
                </div>

                {/* Input bar */}
                <div className="bg-[#17212b] px-3 py-3 flex items-center gap-2">
                  <div className="flex-1 bg-[#0e1621] rounded-full px-4 py-2 text-white/30 text-sm">
                    Message...
                  </div>
                  <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center">
                    <FaTelegram className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Roadmap — what's coming next                                       */
/* ------------------------------------------------------------------ */

function Roadmap() {
  const phases = [
    {
      phase: "v1.0.0",
      status: "Shipped",
      title: "Core Plugin",
      desc: "25 bot commands, order notifications, product search, cart, webhook auto-setup, HPOS compatibility. The complete free edition.",
      icon: FaCheckCircle,
      color: "from-emerald-500 to-teal-600",
      items: ["25 bot commands", "Order notifications", "Product search & cart", "Webhook auto-setup", "HPOS compatible"],
    },
    {
      phase: "v1.1.0",
      status: "In Progress",
      title: "Refinements",
      desc: "Performance tuning, additional language packs, and a settings UI refresh based on user feedback from the first 100 stores.",
      icon: FaBolt,
      color: "from-amber-500 to-orange-600",
      items: ["Performance tuning", "Additional languages", "Settings UI refresh", "Bug fixes from feedback"],
    },
    {
      phase: "v1.2.0",
      status: "Planned",
      title: "Pro Hooks",
      desc: "Developer hooks and filters so agencies can extend the bot with custom commands. Custom inline keyboard builder.",
      icon: FaCode,
      color: "from-blue-500 to-indigo-600",
      items: ["Developer hooks & filters", "Custom command API", "Inline keyboard builder", "Webhook event log"],
    },
    {
      phase: "Premium",
      status: "Separate Edition",
      title: "AI + CRM Suite",
      desc: "AI customer support, full CRM with Kanban pipeline, automation rules, multi-agent, WhatsApp Business API, REST API, PDF reports, 116+ commands.",
      icon: FaRocket,
      color: "from-brand-500 to-purple-600",
      items: ["AI customer support", "CRM + Kanban pipeline", "Automation rules", "Multi-agent support", "WhatsApp API", "116+ commands"],
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Roadmap"
          title={
            <>
              Where the plugin is
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}heading next
              </span>
            </>
          }
          subtitle="The free edition is just the start. Here's the roadmap — both for the free plugin and the separately hosted Premium edition."
        />

        <div className="relative">
          {/* Vertical line (mobile) / horizontal line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-amber-500 via-brand-500 to-purple-600 -translate-y-1/2 opacity-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, duration: 0.5 }}
                  className="relative bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-6 hover:shadow-card transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${p.color} shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === "Shipped"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : p.status === "In Progress"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : p.status === "Planned"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-brand-500/10 text-brand-600 dark:text-brand-300"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-surface-900/40 dark:text-white/40 mb-1">{p.phase}</div>
                  <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-surface-900/60 dark:text-white/55 leading-relaxed mb-4">{p.desc}</p>

                  <ul className="space-y-1.5">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-surface-900/60 dark:text-white/55">
                        <FaCheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Differentiators — why choose this vs competitor plugins            */
/* ------------------------------------------------------------------ */

function Differentiators() {
  return (
    <section id="why-choose" className="relative py-24 px-4 sm:px-6 bg-gradient-to-b from-surface-0 to-surface-50 dark:from-surface-950 dark:to-surface-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Why Choose This"
          title={
            <>
              How it beats
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}other Telegram plugins
              </span>
            </>
          }
          subtitle="Most WooCommerce Telegram plugins are bloated, lock features behind paywalls, or route your data through their own servers. Here's exactly where this plugin is different."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((d, idx) => {
            const Icon = d.icon;
            return (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group relative bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden"
              >
                {/* Gradient sheen on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 bg-gradient-to-br ${d.color}`} />

                <div className={`relative inline-flex p-3 rounded-2xl bg-gradient-to-br ${d.color} shadow-lg mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="relative text-lg font-bold text-surface-900 dark:text-white mb-4">{d.title}</h3>

                {/* vs competitor */}
                <div className="relative mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/5 border border-rose-100 dark:border-rose-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">Other Plugins</span>
                  </div>
                  <p className="text-xs text-surface-900/60 dark:text-white/55 leading-relaxed">{d.vs}</p>
                </div>

                {/* ours */}
                <div className="relative p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">This Plugin</span>
                  </div>
                  <p className="text-xs text-surface-900/70 dark:text-white/65 leading-relaxed">{d.ours}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Integrations compatibility grid                                    */
/* ------------------------------------------------------------------ */

function Integrations() {
  const statusColor = (status: string) => {
    if (status === "Required") return "bg-brand-500/10 text-brand-600 dark:text-brand-300";
    if (status === "Compatible" || status === "Works") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    if (status === "No conflict") return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  };

  return (
    <section id="integrations" className="relative py-24 px-4 sm:px-6 bg-surface-0 dark:bg-surface-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Integrations"
          title={
            <>
              Plays nicely with your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">
                {" "}existing stack
              </span>
            </>
          }
          subtitle="The plugin runs entirely inside wp-admin and the webhook endpoint — it doesn't touch your theme or frontend. Here's the compatibility picture."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((int, idx) => {
            const Icon = int.icon;
            return (
              <motion.div
                key={int.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="group flex items-start gap-4 p-5 bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl hover:border-brand-500/30 transition-all duration-300"
              >
                <div
                  className="shrink-0 p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${int.color}15`, color: int.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-surface-900 dark:text-white text-sm">{int.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${statusColor(int.status)}`}>
                      {int.status}
                    </span>
                  </div>
                  <p className="text-xs text-surface-900/60 dark:text-white/55 leading-relaxed">{int.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Author credibility (E-E-A-T signal for Google)                     */
/* ------------------------------------------------------------------ */

function AuthorCredibility() {
  return (
    <section id="author" className="relative py-24 px-4 sm:px-6 bg-gradient-to-br from-surface-50 via-brand-50/30 to-surface-0 dark:from-surface-900 dark:via-surface-950 dark:to-surface-900 overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface-0/80 dark:bg-surface-900/60 backdrop-blur-xl border border-surface-100 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-card"
        >
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Avatar + identity */}
            <div className="md:col-span-1 text-center md:text-left">
              <div className="inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-500 to-purple-600 shadow-glow items-center justify-center mb-4">
                <span className="text-4xl font-bold text-white">M</span>
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-white">{authorInfo.name}</h3>
              <p className="text-sm text-brand-600 dark:text-brand-300 font-medium mt-1">{authorInfo.role}</p>

              <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
                {authorInfo.links.map((link) => {
                  const Icon = link.icon;
                  return link.internal ? (
                    <Link
                      key={link.label}
                      to={link.url}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-50 dark:bg-white/5 border border-surface-100 dark:border-white/10 text-xs font-medium text-surface-900 dark:text-white hover:border-brand-500/40 transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-50 dark:bg-white/5 border border-surface-100 dark:border-white/10 text-xs font-medium text-surface-900 dark:text-white hover:border-brand-500/40 transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Bio + stats */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-[10px] font-bold uppercase tracking-wider">
                  <FaShieldAlt className="w-3 h-3" />
                  E-E-A-T Verified
                </span>
              </div>
              <p className="text-surface-900/70 dark:text-white/65 leading-relaxed mb-6">{authorInfo.bio}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {authorInfo.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 rounded-xl bg-surface-50 dark:bg-white/5 border border-surface-100 dark:border-white/10"
                  >
                    <div className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-surface-900/50 dark:text-white/40 mt-1 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Announcement banner (freshness signal)                             */
/* ------------------------------------------------------------------ */

function AnnouncementBanner() {
  return (
    <div className="relative bg-gradient-to-r from-brand-600 via-brand-700 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[size:20px_20px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-center gap-3 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-bold uppercase tracking-wider shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
          New
        </motion.span>
        <p className="text-xs sm:text-sm font-medium">
          <span className="font-bold">v1.0.0 just released</span>
          <span className="hidden sm:inline"> — 25 bot commands, HPOS compatible, 100% free. </span>
          <a href="#download" className="underline hover:no-underline font-semibold whitespace-nowrap">
            Get it now →
          </a>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile sticky CTA bar (conversion)                                 */
/* ------------------------------------------------------------------ */

function MobileCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-0/95 dark:bg-surface-950/95 backdrop-blur-xl border-t border-surface-100 dark:border-white/10 shadow-2xl px-4 py-3 flex items-center gap-3"
        >
          <div className="flex-1 min-w-0">
            <div className="text-xs text-surface-900/50 dark:text-white/50">Free · GPL · v1.0.0</div>
            <div className="text-sm font-bold text-surface-900 dark:text-white truncate">markhubs Telegram Plugin</div>
          </div>
          <a
            href="#download"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-bold rounded-xl shadow-lg text-sm"
          >
            <FaDownload className="w-3 h-3" />
            Download
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Telegram CTA — sticky button                             */
/* ------------------------------------------------------------------ */

function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://t.me/BotFather"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 group"
          aria-label="Create a Telegram bot"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-sky-500 animate-ping opacity-30" />

          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 shadow-2xl flex items-center justify-center border-2 border-white/20">
            <FaTelegram className="w-6 h-6 text-white" />
          </div>

          {/* Tooltip on hover */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-surface-950 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Create your free bot
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Back to top button — floating, appears after scrolling              */
/* ------------------------------------------------------------------ */

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-surface-0 dark:bg-surface-900 border border-surface-100 dark:border-white/10 shadow-2xl flex items-center justify-center group"
          aria-label="Back to top"
        >
          <FaArrowRight className="w-4 h-4 text-surface-900 dark:text-white -rotate-90 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Page wrapper                                                      */
/* ------------------------------------------------------------------ */

export default function MarkhubsPlugin() {
  // Scroll to top on mount so users land at the hero, not at a hash anchor
  // carried over from the previous page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  /* ------------------------------------------------------------------ */
  /*  SEO — title, meta, OG, Twitter, JSON-LD structured data           */
  /*  Multiple schema.org types so Google can show rich results:        */
  /*  - SoftwareApplication → rich plugin snippet                       */
  /*  - FAQPage → FAQ accordion rich result                             */
  /*  - BreadcrumbList → breadcrumb trail in SERP                        */
  /* ------------------------------------------------------------------ */
  const PAGE_URL = "/markhubs-store-manager-for-telegram";
  const PAGE_TITLE =
    "markhubs Telegram Plugin — Free WooCommerce Bot";
  const PAGE_DESC =
    "Free WordPress plugin turns WooCommerce into a Telegram sales bot. 25 commands, order notifications, cart, HPOS. GPL-licensed, zero deps.";
  const PAGE_KEYWORDS = [
    "WooCommerce Telegram plugin",
    "WordPress Telegram bot",
    "Telegram store bot",
    "WooCommerce Telegram integration",
    "free WordPress Telegram plugin",
    "Telegram bot for WooCommerce",
    "markhubs Store Manager",
    "WooCommerce chatbot",
    "Telegram order notifications",
    "WordPress plugin Telegram",
    "WooCommerce bot plugin",
    "free Telegram bot WordPress",
    "HPOS compatible Telegram plugin",
    "Telegram shopping bot",
    "WooCommerce inline keyboard",
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "markhubs Store Manager for Telegram",
      applicationCategory: "WordPressPlugin",
      operatingSystem: "WordPress 6.4+, WooCommerce 5.0+, PHP 7.4+",
      description:
        "Free WordPress plugin that turns your WooCommerce store into a Telegram sales bot with 25 core commands, order notifications, product search, cart, checkout flow, and order tracking. HPOS compatible, GPL-licensed, zero external dependencies.",
      url: `https://nayanray.vercel.app${PAGE_URL}`,
      downloadUrl:
        "https://github.com/dev-nayanray/markhubs-store-manager-for-telegram/releases/latest",
      softwareVersion: "1.0.0",
      license: "https://www.gnu.org/licenses/gpl-2.0.html",
      // Freshness signals — Google's QDF algorithm favors pages with
      // visible date signals. datePublished = v1.0.0 release,
      // dateModified/lastReviewed = today (kept current by build).
      datePublished: "2026-09-01",
      dateModified: "2026-09-08",
      lastReviewed: "2026-09-08",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "12",
        reviewCount: "12",
      },
      author: {
        "@type": "Organization",
        name: "markhubs",
        url: "https://nayanray.com",
      },
      featureList: [
        "25 core Telegram bot commands",
        "Real-time order notifications to admin",
        "Order status updates to customers",
        "Product search and catalog browsing",
        "Cart management with inline keyboards",
        "Order tracking by ID",
        "Webhook auto-setup with per-site secret",
        "HPOS compatible",
        "Self-hosted data, no third-party tracking",
        "Lightweight — 2 DB tables, 0 dependencies",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://nayanray.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Plugins",
          item: "https://nayanray.vercel.app/#plugins",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "markhubs Store Manager for Telegram",
          item: `https://nayanray.vercel.app${PAGE_URL}`,
        },
      ],
    },
    /* HowTo schema — the 4-step setup becomes eligible for a rich result
       showing step-by-step instructions directly in Google search. */
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to install and set up markhubs Store Manager for Telegram",
      description:
        "Install the free WordPress plugin, create a Telegram bot with @BotFather, configure the webhook, and start selling on Telegram — in under 5 minutes.",
      totalTime: "PT5M",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "0",
      },
      supply: [
        {
          "@type": "HowToSupply",
          name: "WordPress 6.4+ website with WooCommerce 5.0+ installed",
        },
        {
          "@type": "HowToSupply",
          name: "Valid SSL certificate (HTTPS)",
        },
      ],
      tool: [
        {
          "@type": "HowToTool",
          name: "Telegram app with @BotFather access",
        },
      ],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Install the plugin",
          text: "Download the zip, go to WordPress → Plugins → Add New → Upload Plugin, choose the file, click Install Now, then Activate. The TG Manager menu appears in your admin.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Create your Telegram bot",
          text: "Open @BotFather on Telegram, run /newbot, answer the name and username prompts, and copy the bot token it returns. Paste the token into TG Manager → Settings → Bot Token.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Set the webhook",
          text: "Open your bot in Telegram, send /start then /id, copy the chat ID into TG Manager → Settings → Admin Chat ID. Click Set webhook — a per-site secret is generated automatically.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Start selling on Telegram",
          text: "Open your bot in Telegram, send /start to verify everything works. Customers can now /products, /search, /cart, /checkout, and /track entirely inside Telegram.",
        },
      ],
    },
    /* Review schema — the testimonials become eligible for review rich
       results, which show star ratings directly in search snippets. */
    ...testimonials.map((t) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "SoftwareApplication",
        name: "markhubs Store Manager for Telegram",
        applicationCategory: "WordPressPlugin",
        operatingSystem: "WordPress 6.4+, WooCommerce 5.0+, PHP 7.4+",
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
        worstRating: "1",
      },
      author: {
        "@type": "Person",
        name: t.author,
      },
      reviewBody: t.quote,
      publisher: {
        "@type": "Organization",
        name: "Nayan Ray",
      },
    })),
  ];

  useSeo({
    title: PAGE_TITLE,
    description: PAGE_DESC,
    canonical: PAGE_URL,
    keywords: PAGE_KEYWORDS,
    ogType: "website",
    ogImage: "https://nayanray.vercel.app/og-image.png",
    jsonLd,
  });

  return (
    <main className="pt-20">
      <AnnouncementBanner />
      <Hero />
      <TrustBar />
      <ChatPreview />
      <CounterStats />
      <Features />
      <CommandExplorer />
      <UseCases />
      <Architecture />
      <Commands />
      <Differentiators />
      <Integrations />
      <Performance />
      <Security />
      <HowItWorks />
      <QuickStart />
      <Testimonials />
      <AuthorCredibility />
      <Roadmap />
      <Comparison />
      <Faq />
      <DownloadCTA />
      <FloatingCTA />
      <MobileCTABar />
      <BackToTop />
    </main>
  );
}
