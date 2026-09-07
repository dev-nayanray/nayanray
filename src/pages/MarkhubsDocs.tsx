import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook, FaDownload, FaGithub, FaArrowLeft, FaArrowRight, FaCopy, FaCheck,
  FaCog, FaTelegram, FaLock, FaDatabase, FaCode, FaShieldAlt,
  FaRobot, FaSync, FaPlug,
  FaWrench, FaChevronDown, FaExternalLinkAlt, FaRocket,
} from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const docSections = [
  { id: "overview", label: "Overview", icon: FaBook },
  { id: "requirements", label: "Requirements", icon: FaCog },
  { id: "installation", label: "Installation", icon: FaDownload },
  { id: "bot-setup", label: "Bot Setup", icon: SiTelegram },
  { id: "configuration", label: "Configuration", icon: FaWrench },
  { id: "commands", label: "Bot Commands", icon: FaRobot },
  { id: "webhooks", label: "Webhooks & Security", icon: FaLock },
  { id: "database", label: "Database Schema", icon: FaDatabase },
  { id: "privacy", label: "Privacy & Data", icon: FaShieldAlt },
  { id: "troubleshooting", label: "Troubleshooting", icon: FaWrench },
  { id: "premium", label: "Premium Edition", icon: FaRocket },
  { id: "changelog", label: "Changelog", icon: FaCode },
];

const commands = [
  { cmd: "/start", desc: "Register as a Telegram user and receive the welcome message.", args: "none" },
  { cmd: "/help", desc: "Display the full list of available commands.", args: "none" },
  { cmd: "/products", desc: "Browse featured / on-sale products with inline keyboards.", args: "none" },
  { cmd: "/search", desc: "Search the WooCommerce catalog by product name.", args: "<query>" },
  { cmd: "/product", desc: "View full details of a single product by its ID.", args: "<id>" },
  { cmd: "/cart", desc: "View the current contents of your cart.", args: "none" },
  { cmd: "/add", desc: "Add a product to your cart.", args: "<id>" },
  { cmd: "/clear", desc: "Empty your cart.", args: "none" },
  { cmd: "/checkout", desc: "Generate a secure checkout link for your cart.", args: "none" },
  { cmd: "/myorders", desc: "View your last 5 orders.", args: "none" },
  { cmd: "/order", desc: "View detailed information for a specific order.", args: "<order_id>" },
  { cmd: "/track", desc: "Track the status of an order by its ID.", args: "<order_id>" },
  { cmd: "/store", desc: "Show store info — name, hours, contact details.", args: "none" },
  { cmd: "/contact", desc: "Show the store's contact information.", args: "none" },
  { cmd: "/faq", desc: "Show frequently asked questions.", args: "none" },
  { cmd: "/hours", desc: "Show store opening hours.", args: "none" },
  { cmd: "/shipping", desc: "Show the store's shipping policy.", args: "none" },
  { cmd: "/returns", desc: "Show the returns & refund policy.", args: "none" },
  { cmd: "/lang", desc: "Change the bot's display language.", args: "<code>" },
  { cmd: "/stop", desc: "Stop receiving order notifications.", args: "none" },
  { cmd: "/resume", desc: "Resume receiving order notifications.", args: "none" },
  { cmd: "/id", desc: "Reply with your numeric Telegram chat ID.", args: "none" },
  { cmd: "/about", desc: "Show information about the bot.", args: "none" },
  { cmd: "/version", desc: "Show the installed plugin version.", args: "none" },
  { cmd: "/support", desc: "Get a link to the support resource.", args: "none" },
];

const settings = [
  {
    key: "bot_token",
    label: "Bot Token",
    type: "string",
    required: true,
    desc: "The Telegram bot token issued by @BotFather. Stored locally on your site; never sent to any third-party server.",
  },
  {
    key: "admin_chat_id",
    label: "Admin Chat ID",
    type: "string",
    required: true,
    desc: "Your personal Telegram chat ID. Used to deliver new-order notifications and status-change alerts to you as the store owner.",
  },
  {
    key: "default_language",
    label: "Default Language",
    type: "string",
    default: "en",
    desc: "ISO 639-1 language code assigned to new users when they /start the bot. Free edition ships English only.",
  },
  {
    key: "notify_new_order",
    label: "Notify on New Order",
    type: "yes/no",
    default: "yes",
    desc: "When enabled, the admin chat receives an instant Telegram message the moment a new order is placed in WooCommerce.",
  },
  {
    key: "notify_status_change",
    label: "Notify on Status Change",
    type: "yes/no",
    default: "yes",
    desc: "When enabled, customers receive a Telegram update each time their order status changes (processing, shipped, completed, etc.).",
  },
  {
    key: "welcome_message",
    label: "Welcome Message",
    type: "text",
    default: "Welcome to {store_name}! ...",
    desc: "The message users see when they /start the bot for the first time. Supports the {store_name} placeholder, which is replaced with your WooCommerce store name.",
  },
  {
    key: "search_results_per_msg",
    label: "Search Results per Message",
    type: "int",
    default: "10",
    desc: "Number of products to display per Telegram message when running /search. Telegram enforces a 4096-character limit, so very high values may cause truncation.",
  },
  {
    key: "webhook_secret",
    label: "Webhook Secret",
    type: "string (auto)",
    default: "auto-generated",
    desc: "A 32-character secret generated automatically at activation. Required on every incoming webhook request; validated with hash_equals() to reject spoofed calls.",
  },
];

const dbTables = [
  {
    name: "{prefix}wtm_users",
    purpose: "Registered Telegram users linked to their chat ID. One row per customer who has run /start.",
    columns: [
      { name: "id", type: "BIGINT(20) UNSIGNED", note: "Auto-increment primary key" },
      { name: "chat_id", type: "BIGINT(20) UNSIGNED", note: "Unique Telegram chat ID" },
      { name: "username", type: "VARCHAR(191)", note: "Telegram @handle (nullable)" },
      { name: "first_name", type: "VARCHAR(191)", note: "From Telegram user object" },
      { name: "last_name", type: "VARCHAR(191)", note: "From Telegram user object" },
      { name: "language", type: "VARCHAR(10)", note: "User language preference, default 'en'" },
      { name: "is_registered", type: "TINYINT(1)", note: "1 once /start has completed" },
      { name: "created_at", type: "DATETIME", note: "First-seen timestamp" },
      { name: "last_seen", type: "DATETIME", note: "Updated on each /start interaction" },
    ],
  },
  {
    name: "{prefix}wtm_chats",
    purpose: "Inbound and outbound message log. Auto-pruned to the last 30 days via WP-Cron.",
    columns: [
      { name: "id", type: "BIGINT(20) UNSIGNED", note: "Auto-increment primary key" },
      { name: "chat_id", type: "BIGINT(20) UNSIGNED", note: "Telegram chat ID, indexed" },
      { name: "direction", type: "VARCHAR(10)", note: "'in' for inbound, 'out' for outbound" },
      { name: "message", type: "TEXT", note: "Sanitized message text" },
      { name: "created_at", type: "DATETIME", note: "Timestamp of message" },
    ],
  },
];

const troubleshooting = [
  {
    problem: "Webhook doesn't set, or bot doesn't respond",
    cause: "The most common cause is an invalid bot token, or the webhook URL is not reachable over HTTPS.",
    fix: "Verify the bot token with @BotFather. Confirm your site has a valid SSL certificate (https://). Visit TG Manager → Settings and click 'Set webhook' again. Check that your host does not block incoming POST requests from api.telegram.org.",
  },
  {
    problem: "Order notifications aren't arriving in Telegram",
    cause: "Either the admin Chat ID is wrong, or the notify_new_order setting is disabled.",
    fix: "Open your bot in Telegram, send /id, and copy the exact numeric chat ID it returns into TG Manager → Settings. Make sure 'Notify on New Order' is enabled. Place a test order in WooCommerce and check the chat log table.",
  },
  {
    problem: "Customer runs /track but sees 'Order not found'",
    cause: "Orders are tracked by their numeric ID. The customer must use the WooCommerce order ID, not the order key.",
    fix: "Instruct the customer to use /track 1042 (numeric ID), not /track wc_order_abc123. The numeric ID appears in the WooCommerce → Orders list and in the order confirmation email.",
  },
  {
    problem: "Products don't appear in /products or /search",
    cause: "Only published, purchasable WooCommerce products appear in the bot catalog.",
    fix: "In WooCommerce → Products, confirm the product is published, marked as in stock, and has a regular or sale price set. Drafts and out-of-stock items are intentionally hidden from the bot.",
  },
  {
    problem: "Webhook was working, then stopped",
    cause: "Telegram may have dropped the webhook after repeated delivery failures, or your site's webhook secret was regenerated.",
    fix: "Return to TG Manager → Settings and click 'Set webhook'. The secret is shown in the admin page; it must match what Telegram is calling. If you regenerated the secret, the new webhook URL must be re-set.",
  },
  {
    problem: "PHP fatal error on activation",
    cause: "Your PHP version is older than 7.4, or WooCommerce is not active.",
    fix: "Update PHP to 7.4 or higher via your hosting panel. Install and activate WooCommerce before activating this plugin. The plugin declares a dependency on WooCommerce in its header.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper components                                                  */
/* ------------------------------------------------------------------ */

function CopyableCode({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group relative my-4">
      {label && (
        <div className="text-xs font-mono uppercase tracking-wider text-surface-900/40 dark:text-white/40 mb-2">
          {label}
        </div>
      )}
      <div className="flex items-start gap-3 bg-surface-950 dark:bg-black/40 rounded-2xl border border-surface-100 dark:border-white/10 overflow-hidden">
        <pre className="flex-1 px-5 py-4 text-sm font-mono text-emerald-300 overflow-x-auto no-scrollbar">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="shrink-0 px-4 hover:bg-white/10 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <FaCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <FaCopy className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
          )}
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ id, icon: Icon, title, subtitle }: { id: string; icon: any; title: string; subtitle?: string }) {
  return (
    <div className="mb-8 scroll-mt-32" id={id}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">{title}</h2>
      </div>
      {subtitle && <p className="text-surface-900/60 dark:text-white/55 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page sections                                                      */
/* ------------------------------------------------------------------ */

function DocsHero() {
  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-br from-surface-50 via-brand-50/40 to-surface-100 dark:from-surface-950 dark:via-surface-900 dark:to-surface-950">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            to="/markhubs-store-manager-for-telegram"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-300 hover:gap-3 transition-all duration-300"
          >
            <FaArrowLeft className="w-3 h-3" />
            Back to landing page
          </Link>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider border border-brand-500/20 mb-5"
        >
          <FaBook className="w-3 h-3" />
          Documentation · v1.0.0
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-surface-900 dark:text-white leading-tight"
        >
          markhubs Store Manager
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-brand-500 to-purple-600 mt-2">
            Documentation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-surface-900/60 dark:text-white/55 max-w-3xl leading-relaxed"
        >
          Everything you need to install, configure, and operate your Telegram bot for WooCommerce — from bot creation
          with @BotFather to webhook security, command reference, and database schema.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <a
            href="#installation"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-medium rounded-xl shadow-glow hover:shadow-xl transition-all duration-300"
          >
            <FaDownload className="w-4 h-4" />
            Install
          </a>
          <a
            href="#commands"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-0/70 dark:bg-surface-900/60 backdrop-blur-xl border border-surface-100/60 dark:border-white/10 text-surface-900 dark:text-white font-medium rounded-xl hover:bg-surface-0 transition-all duration-300"
          >
            <FaRobot className="w-4 h-4" />
            Command Reference
          </a>
          <a
            href="https://github.com/dev-nayanray/markhubs-store-manager-for-telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-0/70 dark:bg-surface-900/60 backdrop-blur-xl border border-surface-100/60 dark:border-white/10 text-surface-900 dark:text-white font-medium rounded-xl hover:bg-surface-0 transition-all duration-300"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Sidebar({ active, onNavigate }: { active: string; onNavigate: (id: string) => void }) {
  return (
    <aside className="hidden lg:block sticky top-32 self-start w-64 shrink-0 max-h-[calc(100vh-9rem)] overflow-y-auto no-scrollbar">
      <div className="text-xs font-semibold uppercase tracking-wider text-surface-900/40 dark:text-white/40 mb-4 px-3">
        On this page
      </div>
      <nav className="space-y-1">
        {docSections.map((section) => {
          const Icon = section.icon;
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => onNavigate(section.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "bg-brand-500/10 text-brand-600 dark:text-brand-300 font-semibold"
                  : "text-surface-900/60 dark:text-white/50 hover:bg-surface-50 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {section.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/20">
        <div className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300 mb-2">
          Need help?
        </div>
        <p className="text-xs text-surface-900/60 dark:text-white/55 leading-relaxed mb-3">
          Found a bug or have a feature request? Open an issue on GitHub.
        </p>
        <a
          href="https://github.com/dev-nayanray/markhubs-store-manager-for-telegram/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-300 hover:gap-3 transition-all"
        >
          Open Issue
          <FaArrowRight className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
}

function Overview() {
  return (
    <section className="py-12">
      <SectionTitle
        id="overview"
        icon={FaBook}
        title="Overview"
        subtitle="markhubs Store Manager for Telegram turns your WooCommerce store into a Telegram sales machine. Customers can browse products, place orders, track shipments, and chat with your store — all directly inside Telegram. The free edition ships with 25 core bot commands and a complete order-notification pipeline."
      />

      <div className="prose prose-surface max-w-none space-y-4 text-surface-900/70 dark:text-white/65 leading-relaxed">
        <p>
          The plugin creates a single Telegram bot connected to your store. When customers message the bot, Telegram
          forwards their messages to a webhook endpoint on your WordPress site. The plugin sanitizes each inbound
          message, routes it through a command dispatcher, and replies with product information, order status, cart
          actions, or store policy text — all without the customer ever leaving the Telegram app.
        </p>
        <p>
          Outbound notifications work the same way in reverse: when an order is placed or its status changes, the plugin
          sends a formatted message to the customer's chat ID and to your admin chat ID via the Telegram Bot API. This
          creates a real-time commerce channel between you, your customers, and your store — no third-party servers, no
          monthly fees, no data leaving your site.
        </p>
        <p>
          The plugin is built on pure WordPress and WooCommerce APIs. It declares HPOS compatibility, ships only two
          custom database tables, and uninstalls cleanly. The webhook endpoint is protected with a per-site secret key
          generated at activation, validated with hash_equals() so spoofed requests are rejected without ever reaching
          your dispatcher.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: "Bot Commands", value: "25", icon: FaRobot },
          { label: "DB Tables", value: "2", icon: FaDatabase },
          { label: "External Deps", value: "0", icon: FaPlug },
          { label: "License", value: "GPLv2+", icon: FaShieldAlt },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5 text-center"
            >
              <Icon className="w-5 h-5 mx-auto text-brand-500 mb-2" />
              <div className="text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-surface-900/50 dark:text-white/40 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Requirements() {
  const reqs = [
    { label: "WordPress", value: "6.4 or higher", note: "Required for the modern Settings API and Hook improvements used by the plugin." },
    { label: "WooCommerce", value: "5.0 or higher", note: "Tested up to WooCommerce 11.x. Required because the plugin reads products and orders via WooCommerce APIs." },
    { label: "PHP", value: "7.4 or higher", note: "Recommended PHP 8.0+. The plugin uses typed properties and array merging patterns that require 7.4+." },
    { label: "SSL / HTTPS", value: "Required", note: "Telegram only delivers webhooks over HTTPS. A free Let's Encrypt certificate from your host is sufficient." },
    { label: "WP-Cron", value: "Active", note: "Used to prune the chat log table after 30 days. Disable with caution — chat logs will grow indefinitely." },
    { label: "Outbound HTTPS", value: "Allowed", note: "Your server must be able to reach api.telegram.org over HTTPS. Most hosts allow this by default." },
  ];
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="requirements"
        icon={FaCog}
        title="Requirements"
        subtitle="Before installing, confirm your environment meets the following requirements."
      />
      <div className="overflow-hidden rounded-2xl border border-surface-100 dark:border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-50 dark:bg-white/5 text-left">
              <th className="p-4 font-semibold text-surface-900 dark:text-white">Requirement</th>
              <th className="p-4 font-semibold text-surface-900 dark:text-white">Minimum</th>
              <th className="p-4 font-semibold text-surface-900 dark:text-white hidden md:table-cell">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100 dark:divide-white/5">
            {reqs.map((r) => (
              <tr key={r.label} className="hover:bg-surface-50 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-surface-900 dark:text-white">{r.label}</td>
                <td className="p-4 text-brand-600 dark:text-brand-300 font-mono">{r.value}</td>
                <td className="p-4 text-surface-900/60 dark:text-white/55 hidden md:table-cell">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Installation() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="installation"
        icon={FaDownload}
        title="Installation"
        subtitle="Two install paths are supported. The automatic upload from the WordPress admin is the fastest for most users."
      />

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="inline-flex w-7 h-7 rounded-lg bg-brand-500 text-white items-center justify-center text-sm font-bold">1</span>
            Automatic (WordPress Admin)
          </h3>
          <ol className="space-y-3 text-sm text-surface-900/70 dark:text-white/65">
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">1.</span>
              <span>Log into your WordPress admin dashboard.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">2.</span>
              <span>Go to <strong className="text-surface-900 dark:text-white">Plugins → Add New → Upload Plugin</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">3.</span>
              <span>Choose the downloaded <code className="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-white/10 text-brand-600 dark:text-brand-300 font-mono text-xs">markhubs-store-manager-for-telegram.zip</code> file.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">4.</span>
              <span>Click <strong className="text-surface-900 dark:text-white">Install Now</strong>, then <strong className="text-surface-900 dark:text-white">Activate</strong>.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">5.</span>
              <span>A new <strong className="text-surface-900 dark:text-white">TG Manager</strong> menu appears in your admin sidebar.</span>
            </li>
          </ol>
        </div>

        <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-4 flex items-center gap-2">
            <span className="inline-flex w-7 h-7 rounded-lg bg-brand-500 text-white items-center justify-center text-sm font-bold">2</span>
            Manual (FTP / File Manager)
          </h3>
          <ol className="space-y-3 text-sm text-surface-900/70 dark:text-white/65">
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">1.</span>
              <span>Extract the zip on your computer.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">2.</span>
              <span>Upload the <code className="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-white/10 text-brand-600 dark:text-brand-300 font-mono text-xs">markhubs-store-manager-for-telegram</code> folder to <code className="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-white/10 text-brand-600 dark:text-brand-300 font-mono text-xs">/wp-content/plugins/</code>.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">3.</span>
              <span>Visit <strong className="text-surface-900 dark:text-white">Plugins → Installed Plugins</strong> in WordPress admin.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-brand-500 font-mono">4.</span>
              <span>Locate <em>markhubs Store Manager for Telegram</em> and click <strong className="text-surface-900 dark:text-white">Activate</strong>.</span>
            </li>
          </ol>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-2xl p-5 flex gap-4">
        <FaWrench className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Activation note:</strong> On activation the plugin creates its two database tables and generates a
          32-character webhook secret. The secret is stored in the <code className="font-mono">wtm_free_settings</code> option
          and is required on every incoming Telegram webhook request. If you ever need to invalidate the existing
          webhook, regenerate the secret from <strong>TG Manager → Settings</strong>.
        </div>
      </div>
    </section>
  );
}

function BotSetup() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="bot-setup"
        icon={SiTelegram}
        title="Creating your Telegram Bot"
        subtitle="A Telegram bot is created through @BotFather, Telegram's official bot management account. The process takes about a minute."
      />

      <div className="space-y-4">
        {[
          {
            n: "1",
            title: "Open @BotFather",
            body: (
              <p>
                Open Telegram and search for{" "}
                <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-brand-600 dark:text-brand-300 font-medium inline-flex items-center gap-1">
                  @BotFather <FaExternalLinkAlt className="w-3 h-3" />
                </a>. Start a chat with it. BotFather is Telegram's official bot for creating and managing other bots.
              </p>
            ),
          },
          {
            n: "2",
            title: "Create the bot",
            body: (
              <>
                <p>Send <code className="font-mono text-brand-600 dark:text-brand-300">/newbot</code>. BotFather will ask for two things:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>A display name (e.g. <em>My Store Bot</em>) — what users see in the chat list.</li>
                  <li>A username ending in <code className="font-mono">bot</code> (e.g. <em>mystore_bot</em>) — the unique @handle.</li>
                </ul>
              </>
            ),
          },
          {
            n: "3",
            title: "Copy the bot token",
            body: (
              <p>
                BotFather replies with a long string like{" "}
                <code className="font-mono text-brand-600 dark:text-brand-300">123456789:ABCdefGHIjklMNOpqrsTUVwxyz</code>.
                This is your <strong>Bot Token</strong> — treat it like a password. Anyone with the token can send
                messages as your bot.
              </p>
            ),
          },
          {
            n: "4",
            title: "Paste the token into WordPress",
            body: (
              <p>Go to <strong>TG Manager → Settings → Bot Token</strong> in your WordPress admin and paste the token. Save.</p>
            ),
          },
          {
            n: "5",
            title: "Find your Admin Chat ID",
            body: (
              <p>
                Open your bot in Telegram and send <code className="font-mono text-brand-600 dark:text-brand-300">/start</code>,
                then <code className="font-mono text-brand-600 dark:text-brand-300">/id</code>. The bot replies with your
                numeric chat ID. Paste it into <strong>Admin Chat ID</strong>.
              </p>
            ),
          },
          {
            n: "6",
            title: "Set the webhook",
            body: (
              <p>
                Click <strong>Set webhook</strong>. The plugin calls Telegram's <code className="font-mono">setWebhook</code>{" "}
                endpoint with your site's webhook URL plus the auto-generated secret. Telegram confirms with a 200 OK
                and starts forwarding messages immediately. Open the bot and send{" "}
                <code className="font-mono text-brand-600 dark:text-brand-300">/start</code> to verify everything works.
              </p>
            ),
          },
        ].map((step) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5"
          >
            <div className="shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold flex items-center justify-center shadow-lg">
              {step.n}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-surface-900 dark:text-white mb-2">{step.title}</h3>
              <div className="text-sm text-surface-900/70 dark:text-white/65 leading-relaxed">{step.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Configuration() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="configuration"
        icon={FaWrench}
        title="Configuration Reference"
        subtitle="All plugin settings live in the wtm_free_settings option and are editable from TG Manager → Settings. Below is the full schema, including defaults and types."
      />

      <div className="overflow-hidden rounded-2xl border border-surface-100 dark:border-white/10">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="bg-surface-50 dark:bg-white/5 text-left">
                <th className="p-4 font-semibold text-surface-900 dark:text-white">Setting</th>
                <th className="p-4 font-semibold text-surface-900 dark:text-white">Key</th>
                <th className="p-4 font-semibold text-surface-900 dark:text-white">Type</th>
                <th className="p-4 font-semibold text-surface-900 dark:text-white">Default</th>
                <th className="p-4 font-semibold text-surface-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-white/5">
              {settings.map((s) => (
                <tr key={s.key} className="hover:bg-surface-50 dark:hover:bg-white/5 transition-colors align-top">
                  <td className="p-4">
                    <div className="font-semibold text-surface-900 dark:text-white">{s.label}</div>
                    {s.required && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-wider">
                        Required
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-mono text-xs text-brand-600 dark:text-brand-300">{s.key}</td>
                  <td className="p-4 font-mono text-xs text-surface-900/60 dark:text-white/50">{s.type}</td>
                  <td className="p-4 font-mono text-xs text-surface-900/60 dark:text-white/50">{s.default}</td>
                  <td className="p-4 text-surface-900/70 dark:text-white/65">{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
        <h3 className="font-bold text-surface-900 dark:text-white mb-3">Welcome message placeholder</h3>
        <p className="text-sm text-surface-900/70 dark:text-white/65 leading-relaxed">
          The <code className="font-mono text-brand-600 dark:text-brand-300">{`{store_name}`}</code> placeholder in the
          welcome message is replaced at runtime with your WooCommerce store name (set in{" "}
          <strong>WooCommerce → Settings → General</strong>). The placeholder is required — without it, the bot will
          fall back to the WordPress site title.
        </p>
      </div>
    </section>
  );
}

function Commands() {
  const [filter, setFilter] = useState("");
  const filtered = commands.filter(
    (c) => c.cmd.toLowerCase().includes(filter.toLowerCase()) || c.desc.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="commands"
        icon={FaRobot}
        title="Bot Commands Reference"
        subtitle="All 25 commands supported by the free edition. Premium extends this to 116+ commands including AI-driven support, CRM actions, and automation triggers."
      />

      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter commands..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-96 px-5 py-3 rounded-xl bg-surface-50 dark:bg-white/5 border border-surface-100 dark:border-white/10 text-surface-900 dark:text-white placeholder-surface-900/40 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((c) => (
          <div
            key={c.cmd}
            className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-xl p-4 hover:border-brand-500/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-1">
              <code className="font-mono text-sm font-bold text-brand-600 dark:text-brand-300">{c.cmd}</code>
              {c.args !== "none" && (
                <code className="font-mono text-xs text-surface-900/50 dark:text-white/40">{c.args}</code>
              )}
            </div>
            <p className="text-sm text-surface-900/70 dark:text-white/65">{c.desc}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-surface-900/40 dark:text-white/40">No commands match your filter.</div>
      )}
    </section>
  );
}

function Webhooks() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="webhooks"
        icon={FaLock}
        title="Webhooks & Security"
        subtitle="The plugin's webhook endpoint accepts incoming Telegram messages at a secret-key-protected URL. Here's how it works."
      />

      <div className="space-y-6">
        <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-surface-900 dark:text-white mb-3">Webhook URL format</h3>
          <p className="text-sm text-surface-900/70 dark:text-white/65 mb-4 leading-relaxed">
            Telegram forwards customer messages to the following URL on your site:
          </p>
          <CopyableCode
            code={`https://yoursite.com/?wtm_free_webhook=1&key=<your-site-secret>`}
            label="Webhook URL"
          />
          <p className="text-sm text-surface-900/70 dark:text-white/65 leading-relaxed">
            The <code className="font-mono text-brand-600 dark:text-brand-300">key</code> parameter is a 32-character
            secret generated automatically at activation. It's stored in the <code className="font-mono">wtm_free_settings</code>{" "}
            option and validated on every incoming request using PHP's{" "}
            <code className="font-mono text-brand-600 dark:text-brand-300">hash_equals()</code> function, which prevents
            timing attacks. Requests without a valid key are rejected with a 403 before reaching the dispatcher.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: FaLock,
              title: "Secret-key auth",
              body: "Every webhook request must include the per-site secret. Without it, the request is rejected at the door.",
            },
            {
              icon: FaShieldAlt,
              title: "Sanitized input",
              body: "Inbound fields from Telegram (chat ID, name, username, message text) are sanitized before storage in the chat log table.",
            },
            {
              icon: FaSync,
              title: "Auto-pruning",
              body: "A WP-Cron job (wtm_free_hourly_check) prunes chat log rows older than 30 days so the table stays small.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-surface-0 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5"
              >
                <Icon className="w-5 h-5 text-brand-500 mb-3" />
                <h4 className="font-bold text-surface-900 dark:text-white text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-surface-900/60 dark:text-white/55 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
          <h3 className="font-bold text-surface-900 dark:text-white mb-3">Outbound Telegram API calls</h3>
          <p className="text-sm text-surface-900/70 dark:text-white/65 leading-relaxed mb-3">
            The plugin makes outbound calls to <code className="font-mono text-brand-600 dark:text-brand-300">api.telegram.org</code>{" "}
            only for these explicit actions:
          </p>
          <ul className="space-y-2 text-sm text-surface-900/70 dark:text-white/65">
            <li className="flex gap-3">
              <code className="font-mono text-xs text-emerald-500 shrink-0 w-28">sendMessage</code>
              <span>When sending a customer an order update or responding to a command.</span>
            </li>
            <li className="flex gap-3">
              <code className="font-mono text-xs text-emerald-500 shrink-0 w-28">sendPhoto</code>
              <span>When sending product images alongside product details.</span>
            </li>
            <li className="flex gap-3">
              <code className="font-mono text-xs text-emerald-500 shrink-0 w-28">setWebhook</code>
              <span>When you click "Set webhook" in TG Manager → Settings.</span>
            </li>
            <li className="flex gap-3">
              <code className="font-mono text-xs text-emerald-500 shrink-0 w-28">deleteWebhook</code>
              <span>When you click "Delete webhook" to disconnect the bot.</span>
            </li>
            <li className="flex gap-3">
              <code className="font-mono text-xs text-emerald-500 shrink-0 w-28">getMe</code>
              <span>When checking bot connection status in the admin UI.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Database() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="database"
        icon={FaDatabase}
        title="Database Schema"
        subtitle="The plugin creates two tables on activation and removes them (along with all options, transients, and scheduled events) on uninstall. No data is left behind."
      />

      <div className="space-y-8">
        {dbTables.map((table) => (
          <div key={table.name} className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <code className="font-mono text-base font-bold text-brand-600 dark:text-brand-300">{table.name}</code>
            </div>
            <p className="text-sm text-surface-900/70 dark:text-white/65 mb-4">{table.purpose}</p>
            <div className="overflow-hidden rounded-xl border border-surface-100 dark:border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-0 dark:bg-black/30 text-left">
                    <th className="p-3 font-mono text-xs font-semibold text-surface-900 dark:text-white">Column</th>
                    <th className="p-3 font-mono text-xs font-semibold text-surface-900 dark:text-white">Type</th>
                    <th className="p-3 font-mono text-xs font-semibold text-surface-900 dark:text-white">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-white/5">
                  {table.columns.map((col) => (
                    <tr key={col.name} className="hover:bg-surface-0 dark:hover:bg-white/5">
                      <td className="p-3 font-mono text-xs text-brand-600 dark:text-brand-300">{col.name}</td>
                      <td className="p-3 font-mono text-xs text-surface-900/60 dark:text-white/50">{col.type}</td>
                      <td className="p-3 text-xs text-surface-900/70 dark:text-white/65">{col.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-2xl p-5 flex gap-4">
          <FaShieldAlt className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-sm text-rose-800 dark:text-rose-200">
            <strong>Uninstall behavior:</strong> When the plugin is deleted from the WordPress admin (not just
            deactivated), the uninstall routine drops both tables and deletes all options, transients, and scheduled
            events associated with the plugin. This is a clean uninstall — no leftover data.
          </div>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="privacy"
        icon={FaShieldAlt}
        title="Privacy & Data Flow"
        subtitle="The plugin is designed to keep customer data on your site. No data is ever sent to a server operated by the plugin author."
      />

      <div className="space-y-4">
        {[
          {
            title: "What's stored on your site",
            body: "Two database tables: registered Telegram users (chat ID, name, username, language) and an inbound/outbound chat log. The chat log auto-prunes after 30 days. Settings are stored in a single WordPress option.",
          },
          {
            title: "What's sent to Telegram",
            body: "Order notifications (order number, status, items, totals) and command responses (product info, search results, store policy text). These are delivered via Telegram's Bot API to your customers' chat IDs and to your admin chat ID.",
          },
          {
            title: "What's NOT sent",
            body: "Nothing is sent to any server operated by the plugin author. All communication is direct between your WordPress site and Telegram's official API (api.telegram.org), using your own bot token.",
          },
          {
            title: "Customer consent",
            body: "Customers must send /start to the bot to register. Until they do, the bot does not store their information. Customers can /stop notifications at any time, and /resume later.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5"
          >
            <h3 className="font-bold text-surface-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-surface-900/70 dark:text-white/65 leading-relaxed">{item.body}</p>
          </div>
        ))}

        <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-5">
          <h3 className="font-bold text-surface-900 dark:text-white mb-3">External service links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://telegram.org/tos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-300 hover:underline inline-flex items-center gap-1"
              >
                Telegram Terms of Service <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href="https://telegram.org/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-300 hover:underline inline-flex items-center gap-1"
              >
                Telegram Privacy Policy <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Troubleshooting() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="troubleshooting"
        icon={FaWrench}
        title="Troubleshooting"
        subtitle="Common issues and their fixes. If your problem isn't listed, open an issue on GitHub."
      />

      <div className="space-y-3">
        {troubleshooting.map((item, idx) => (
          <div
            key={idx}
            className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-semibold text-surface-900 dark:text-white">{item.problem}</span>
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
                  <div className="px-5 pb-5 space-y-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1">Cause</div>
                      <p className="text-sm text-surface-900/70 dark:text-white/65 leading-relaxed">{item.cause}</p>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-1">Fix</div>
                      <p className="text-sm text-surface-900/70 dark:text-white/65 leading-relaxed">{item.fix}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function Premium() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="premium"
        icon={FaRocket}
        title="Premium Edition"
        subtitle="A separately hosted Premium edition is available for stores that outgrow the free 25-command bot. It is optional, additional software — nothing in the free plugin is locked or time-limited."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
            Free Edition
          </div>
          <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">What you have</h3>
          <ul className="space-y-2 text-sm text-surface-900/70 dark:text-white/65">
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 25 core bot commands</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Order notifications & tracking</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Product search & cart</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Webhook auto-setup</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> HPOS compatible</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> English language</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/30 rounded-2xl p-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold uppercase tracking-wider mb-4">
            Premium Edition
          </div>
          <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-3">What's added</h3>
          <ul className="space-y-2 text-sm text-surface-900/70 dark:text-white/65">
            <li className="flex gap-2"><FaRocket className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> 116+ bot commands</li>
            <li className="flex gap-2"><FaRobot className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> AI customer support</li>
            <li className="flex gap-2"><FaCog className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> CRM with Kanban pipeline</li>
            <li className="flex gap-2"><FaSync className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> Automation rules engine</li>
            <li className="flex gap-2"><FaTelegram className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> Multi-agent support</li>
            <li className="flex gap-2"><FaPlug className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> WhatsApp Business API</li>
            <li className="flex gap-2"><FaCode className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" /> REST API & PDF reports</li>
          </ul>
          <a
            href="https://wootelegram.com/#pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-medium rounded-xl shadow-glow hover:shadow-xl transition-all duration-300 text-sm"
          >
            View Premium
            <FaArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Changelog() {
  return (
    <section className="py-12 border-t border-surface-100 dark:border-white/10">
      <SectionTitle
        id="changelog"
        icon={FaCode}
        title="Changelog"
        subtitle="Version history for the free edition."
      />

      <div className="space-y-4">
        <div className="bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold">v1.0.0</span>
            <span className="text-sm text-surface-900/50 dark:text-white/40">Initial release</span>
          </div>
          <ul className="space-y-2 text-sm text-surface-900/70 dark:text-white/65">
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 25 core bot commands</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Order notifications and tracking</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Product search and cart</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Webhook auto-setup with per-site secret key authentication</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> HPOS compatibility</li>
            <li className="flex gap-2"><FaCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> All webhook-sourced input sanitized before database storage</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page wrapper                                                      */
/* ------------------------------------------------------------------ */

export default function MarkhubsDocs() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    docSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-0">
      <DocsHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex gap-12">
        <Sidebar active={activeSection} onNavigate={setActiveSection} />

        <div className="flex-1 min-w-0 max-w-4xl">
          <Overview />
          <Requirements />
          <Installation />
          <BotSetup />
          <Configuration />
          <Commands />
          <Webhooks />
          <Database />
          <Privacy />
          <Troubleshooting />
          <Premium />
          <Changelog />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-t border-surface-100 dark:border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/markhubs-store-manager-for-telegram"
            className="inline-flex items-center gap-3 px-6 py-3 bg-surface-50 dark:bg-surface-900/60 border border-surface-100 dark:border-white/10 rounded-xl text-surface-900 dark:text-white font-medium hover:border-brand-500/40 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Landing Page
          </Link>
          <a
            href="https://github.com/dev-nayanray/markhubs-store-manager-for-telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-medium rounded-xl shadow-glow hover:shadow-xl transition-all"
          >
            View on GitHub
            <FaGithub className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
