import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaTelegram, FaWordpress, FaDownload, FaGithub, FaRocket,
  FaShieldAlt, FaBolt, FaShoppingCart, FaSearch, FaTruck, FaBell,
  FaRobot, FaDatabase, FaPlug, FaLock, FaCheckCircle, FaArrowRight,
  FaChevronDown, FaStar, FaCode, FaMobileAlt, FaStore, FaSync, FaBook,
} from "react-icons/fa";
import {
  SiTelegram,
} from "react-icons/si";

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
    a: "Yes — 100% free, GPL-licensed, fully functional, no time limits, no nag screens, no locked features. The entire core experience ships in the free version.",
  },
  {
    q: "Does it work with HPOS (High-Performance Order Storage)?",
    a: "Yes. The plugin declares compatibility with WooCommerce's custom order tables, so it runs cleanly on stores that have migrated to HPOS as well as on the legacy post-meta storage.",
  },
  {
    q: "Does it require SSL / HTTPS?",
    a: "Yes. Telegram only delivers webhooks over HTTPS. Most hosts offer a free Let's Encrypt certificate, so this is rarely a blocker — but you do need a valid SSL cert on your site.",
  },
  {
    q: "How do I find my Chat ID?",
    a: "After setup, open your bot in Telegram and send /start, then send /id. The bot will reply with your numeric chat ID, which you paste into TG Manager → Settings.",
  },
  {
    q: "Is there a Premium edition?",
    a: "Yes, a separately hosted Premium edition with AI customer support, a full CRM with Kanban pipeline, an automation rules engine, multi-agent support, WhatsApp Business API, a REST API, and 116+ commands is available from the developer's own site. It's entirely optional — nothing in the free plugin is locked or time-limited.",
  },
  {
    q: "Where is the data stored?",
    a: "All data stays on your site. The plugin creates two tables (wp_wtm_users and wp_wtm_chats) on activation. Chat logs auto-prune after 30 days. No data is ever sent to any server operated by the plugin author.",
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
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 pt-32 overflow-hidden bg-gradient-to-br from-surface-50 via-brand-50/40 to-surface-100 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950"
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(0, 136, 204, 0.18) 0%, transparent 45%), radial-gradient(circle at 75% 65%, rgba(124, 92, 255, 0.20) 0%, transparent 50%)",
          }}
        />
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
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-surface-0/70 dark:bg-surface-900/60 backdrop-blur-xl border border-surface-100/60 dark:border-white/10 shadow-glow">
            <span className="flex items-center gap-2 text-sm font-semibold text-surface-900 dark:text-white">
              <FaWordpress className="w-4 h-4 text-brand-500" />
              Free WordPress Plugin
            </span>
            <span className="w-px h-4 bg-surface-100 dark:bg-white/10" />
            <span className="text-sm font-medium text-surface-900/60 dark:text-white/50">v1.0.0</span>
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-brand-500 to-purple-600">
                Telegram sales machine
              </span>
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-bold rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300"
          >
            <FaDownload />
            <span>Download Plugin</span>
          </motion.a>
          <motion.a
            href="https://github.com/dev-nayanray/markhubs-store-manager-for-telegram"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
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
            whileHover={{ scale: 1.03 }}
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
        >
          {pluginStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-surface-0/60 dark:bg-surface-900/50 backdrop-blur-xl border border-surface-100/60 dark:border-white/10 rounded-2xl p-5 text-center shadow-lg shadow-brand-500/5 hover:shadow-glow transition-shadow duration-300"
              >
                <Icon className="w-6 h-6 mx-auto text-brand-500 mb-2" />
                <div className="text-3xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-surface-900/40 dark:text-white/40 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
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
          v1.0.0 · GPL Licensed
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
/*  Page wrapper                                                      */
/* ------------------------------------------------------------------ */

export default function MarkhubsPlugin() {
  // Scroll to top on mount so users land at the hero, not at a hash anchor
  // carried over from the previous page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <main className="pt-20">
      <Hero />
      <Features />
      <Commands />
      <HowItWorks />
      <Comparison />
      <Faq />
      <DownloadCTA />
    </main>
  );
}
