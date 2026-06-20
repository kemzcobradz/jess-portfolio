"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import NeuralVortexBg from "./neural-vortex-bg";

/* ─── Hooks ───────────────────────────────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(end: number, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, startCounting]);
  return count;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return progress;
}

function useMouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);
  return pos;
}

/* ─── Components ──────────────────────────────────────── */

function Section({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `all 0.7s ease-out ${delay}ms` }}>
      {children}
    </div>
  );
}

function StatCounter({ end, label, suffix = "+" }: { end: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView(0.3);
  const count = useCountUp(end, 2000, inView);
  return (
    <div ref={ref}>
      <div className="text-3xl sm:text-4xl font-bold text-[#C3E41D]">{count}{suffix}</div>
      <div className="text-sm text-neutral-500 mt-1">{label}</div>
    </div>
  );
}

function GradientDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-[#C3E41D]/30 to-transparent my-2" />;
}

/* ─── Data ────────────────────────────────────────────── */

const projects = [
  {
    title: "Mr. Paws — Premium Pet Care, BGC & Pasig City",
    status: "Completed",
    statusLabel: "Completed — Full SEO Pipeline",
    sampleProject: "Mr. Paws Urban Pets",
    sampleProjectLink: "https://www.mrpaws.ph/",
    problem: "Strong offline reputation (Parents' Choice Award 2025), but the website had zero SEO foundation. No structured data. Missing meta descriptions. No content strategy. Invisible to local pet owners searching online.",
    deliverables: [
      { name: "Company Profile", desc: "Deep research to establish facts about the business before building anything. Created writing guidelines to ensure brand-consistent content across all deliverables. The process was automated for repeatability.", link: "https://drive.google.com/drive/u/0/folders/1vP6M3mYm1L6SPCywo6jIDdRluZ8eq6RW" },
      { name: "Content Strategy", desc: "Covers the entire research-to-execution pipeline: Competitor Analysis to benchmark who's winning in local search and why, SERP Analysis to understand what content formats and intent signals Google rewards, Keyword Research mapping 180+ prioritized terms across all service lines, a Keyword Cannibalization Audit to prevent pages from competing against each other, a Topic Hub Report organizing everything into pillar-and-cluster architecture, and a 3-Month Content Calendar translating that structure into a sequenced publishing plan.", link: "https://drive.google.com/drive/u/0/folders/1n3rNonT97aefmF5zKmrjrgM_qtap6oGW" },
      { name: "On-Page Optimization", desc: "Meta-Tag Recommendations with title tags and meta descriptions written to target intent and improve click-through rates. Schema Markup Plan outlining structured data types (LocalBusiness, Service, FAQ) so Google can better understand and display the site. Internal-Linking Strategy mapping how pages connect to distribute authority, reinforce topic clusters, and guide both users and crawlers.", link: "https://drive.google.com/drive/u/0/folders/1e-QjunuovHInY66hXpW-lq6CAZ9vFl72" },
      { name: "Blog Content", desc: "A fully executed hub-and-spoke content sample. A central pillar page targets a broad, high-volume topic as the authority piece, with supporting cluster articles targeting specific long-tail keywords linking back to the hub. Content structured for SEO — building topical authority, improving internal link equity, and signaling comprehensive subject coverage.", link: "https://drive.google.com/drive/u/0/folders/1NM0mKHkwNPtSPadGm-B10oR4GDHUuJN1" },
      { name: "Homepage & Service Page Recommendations", desc: "Structural and copy changes to turn pages into high-converting, search-optimized landing pages. Covers above-the-fold messaging, keyword placement, heading hierarchy, CTAs, and content sections tailored to each service (grooming, boarding, pet photography). Every recommendation grounded in search intent for local pet owners in BGC and Pasig.", link: "https://drive.google.com/drive/u/0/folders/1ToEHE926Q4-b86-UHriHGUapUTB2vPS3" },
      { name: "Screaming Frog Crawl", desc: "Technical snapshot of the site before optimizations. Surfaces missing meta tags, duplicate content, broken links, redirect chains, missing alt text, and pages blocked from indexing. The baseline audit that informed all subsequent recommendations — every fix grounded in actual site data.", link: "https://drive.google.com/drive/u/0/folders/1fuFLK_WacpxNjeSIuFyl6efxbAhV2mEO" },
      { name: "Technical Audit", desc: "Deep evaluation of overall site health: page speed, mobile-friendliness, indexability, sitemap and robots.txt configuration, Core Web Vitals, and HTTPS status. Findings documented with clear, prioritized action items so the client knows exactly what to fix, in what order, and why it matters for rankings.", link: "https://drive.google.com/drive/u/0/folders/1v95qUtDuGaW-3GxV_aEWnbGBEW9_as06" },
      { name: "Press Releases", desc: "Write and distribute SEO-optimized press releases through high-authority platforms to build backlinks, improve domain authority, and increase brand visibility. Each release is structured for search engines while staying newsworthy and compliant with publisher guidelines.", link: "https://drive.google.com/drive/u/0/folders/1f8de2eBVRQwySUTPIv01EaYYQmIriZcq" },
      { name: "Citations Audit & Cleanup", desc: "Audit and correct business listings across 50+ online directories (Google Business Profile, Yelp, Facebook, YellowPages, Bing Places, and more). Ensure NAP consistency, remove duplicates, and fix errors that hurt local search rankings.", link: "https://drive.google.com/drive/u/0/folders/1U3sewT_BWAEqR4iK55RveH2J-UzXCRv7" },
      { name: "GBP Audit", desc: "7-tab Google Business Profile audit covering core listing data (NAP, hours, categories), services & products verification, competitor comparison, service gap research, and a prioritized action checklist — all grounded in actual site and Maps data, not assumptions.", link: "https://docs.google.com/spreadsheets/d/1A6L1xN0_krktaw9gnU3B82kF0ZurzAc4sIGK_hjOtkM/edit" },
    ],
  },
  {
    title: "MiniPet Philippines — Pet Products (Wix)",
    status: "In Progress",
    statusLabel: "In Progress",
    sampleProject: "MiniPet Philippines",
    sampleProjectLink: "https://www.minipetph.com/",
    problem: "Website had critical technical issues blocking indexing and sales. Homepage was set to noindex. XML sitemap returned 404. Product pages had mismatched URLs, titles, and H1 tags. Zero structured data.",
    deliverables: [
      { name: "Company Profile", desc: "Deep research to establish facts about the business before building anything. Created writing guidelines to ensure brand-consistent content across all deliverables.", link: "https://drive.google.com/drive/folders/1HXWv6syZerWu3ta6PVwQV6lEVivXokqO" },
      { name: "Content Strategy", desc: "Keyword Research mapping 104+ prioritized terms across product lines and search intent. Topic Hub Report organizing everything into pillar-and-cluster architecture. Keyword Cannibalization Audit preventing pages from competing against each other. Competitor Analysis benchmarking who's winning in pet e-commerce search and why.", link: "https://drive.google.com/drive/folders/1wLmD32G5G05jZCgpjG6wxmBo5yCmTr6K" },
      { name: "Service & Homepage Recommendations", desc: "Structural and copy changes to turn pages into high-converting, search-optimized landing pages. Covers above-the-fold messaging, keyword placement, heading hierarchy, CTAs, and product-focused content sections. Includes Service Page Optimization with HTML mockups.", link: "https://drive.google.com/drive/folders/1reNE_e211kKxEs2qdO8Oq628wn6Gs_iF" },
      { name: "Screaming Frog Crawl", desc: "Technical snapshot of the site before optimizations. Surfaces missing meta tags, duplicate content, broken links, and noindex issues that were blocking indexing.", link: "https://drive.google.com/drive/folders/1eDZCaH03aPAHfzZoEjaZ3sgVDiGou9t3" },
      { name: "Technical Audit", desc: "Deep evaluation of overall site health: homepage noindex, XML sitemap 404, product page URL mismatches, missing structured data, and Wix-specific configuration issues. Findings documented with clear, prioritized action items.", link: "https://drive.google.com/drive/folders/1ADwjqUUSDuoBD-Y0a1QlUBJyrlZs0D2a" },
      { name: "Analytics & Reporting", desc: "Page Speed Insights and Google Looker Studio dashboards for ongoing performance tracking.", link: "https://drive.google.com/drive/folders/1bmLEesihVc9E3VfoH8HIPyZFPe3VeoIE" },
      { name: "GBP Audit", desc: "Google Business Profile audit covering local search visibility and listing optimization.", link: "https://docs.google.com/spreadsheets/d/1nB3VXJiN9swTZrNB7NLs5B_wiuy3WmJs/edit" },
    ],
  },
  {
    title: "TalktoDr.Lee — Healthcare / Mental Health",
    status: "In Progress",
    statusLabel: "In Progress",
    sampleProject: "Talk To Dr. Lee",
    sampleProjectLink: "https://talktodrlee.com/",
    problem: "The website is empty and should be rebuilt from scratch.",
    deliverables: [
      { name: "Company Profile", desc: "Deep research into the practice, services, and competitive landscape. Created a compliance-aware profile with writing guidelines for all content deliverables.", link: "https://drive.google.com/drive/folders/1jqPvZq_HluIIuzXf31BcNVfY2dBfxcNz" },
      { name: "Content Strategy", desc: "Competitor Analysis to benchmark who's winning in healthcare search and why. Keyword Research mapping prioritized terms across service lines. Topic Hub Report organizing everything into pillar-and-cluster architecture. SERP Analysis to understand what content formats Google rewards for healthcare queries.", link: "https://drive.google.com/drive/folders/15sTt8KdPITA6ZeWneoXLDJqWOQ3QIW9B" },
      { name: "Homepage & Service Page Recommendations", desc: "Structural and copy changes to turn pages into high-converting, search-optimized landing pages. Covers above-the-fold messaging, keyword placement, heading hierarchy, CTAs, and content sections tailored to each service — all within regulated industry guidelines.", link: "https://drive.google.com/drive/folders/19kZAG3WABmbCRU5XBW3VRgm6w_D96ufX" },
      { name: "Screaming Frog Crawl", desc: "Technical snapshot of the site before optimizations. Surfaces missing meta tags, duplicate content, broken links, redirect chains, and pages blocked from indexing.", link: "https://drive.google.com/drive/folders/1PmiUZLecUHsb_ISKWGK7YBROOayCr8pN" },
      { name: "GBP Audit", desc: "Google Business Profile audit covering core listing data, services & products verification, competitor comparison, service gap research, and a prioritized action checklist.", link: "https://docs.google.com/spreadsheets/d/1USEBXfG_GGIZbd3eWRPyW8ssx70yDd86MVanxuvQU3I/edit" },
    ],
  },
  {
    title: "Manila Prince Hotel — Premium Hotel, Manila",
    status: "In Progress",
    statusLabel: "In Progress",
    sampleProject: "Manila Prince Hotel",
    sampleProjectLink: "https://manilaprince.com/",
    problem: "Established hotel with an outdated website. No SEO foundation, no content strategy, weak local search visibility. Losing bookings to competitors who rank higher on Google.",
    deliverables: [
      { name: "Company Profile", desc: "Deep research into the hotel's brand, services, competitive positioning, and market. Created a comprehensive profile documenting everything needed to inform the SEO strategy.", link: "https://drive.google.com/drive/folders/1ReDUFRKIajRjL2yEy2ZYant6EIx6dWxJ" },
      { name: "Content Strategy", desc: "Competitor Analysis to benchmark who's winning in hospitality search and why. Keyword Research mapping prioritized terms across room types, amenities, and location-based searches. Topic Hub Report organizing everything into pillar-and-cluster architecture for topical authority.", link: "https://drive.google.com/drive/folders/18n5dw0WezrKGyXQhYcCTs1rwD_TWI2Tp" },
      { name: "Blog Content", desc: "Hub-and-spoke content sample targeting staycation-related keywords. A central pillar page with supporting cluster articles designed to build topical authority and capture informational search traffic.", link: "https://drive.google.com/drive/folders/11JmVp9MZYoOCsTw2aHCk2wjWkI0yMnsE" },
      { name: "Homepage & Service Page Recommendations", desc: "Structural and copy changes to turn pages into high-converting, search-optimized landing pages. Covers above-the-fold messaging, keyword placement, heading hierarchy, CTAs, and content sections tailored to hotel services.", link: "https://drive.google.com/drive/folders/1JavxnC8oGZ7dQdDBilL7y1RqtIyK5Rzz" },
      { name: "Screaming Frog Crawl", desc: "Technical snapshot of the site before optimizations. Surfaces missing meta tags, duplicate content, broken links, redirect chains, and pages blocked from indexing.", link: "https://drive.google.com/drive/folders/1tSIOLALUywTvdWBTiSRXa4UmuBpI25qI" },
      { name: "Technical Audit", desc: "Deep evaluation of site health: page speed, mobile-friendliness, indexability, sitemap and robots.txt configuration, Core Web Vitals, and HTTPS status. Prioritized action items so the client knows what to fix first.", link: "https://drive.google.com/drive/folders/1EOsTavw4y55Lp4ejiWL2qlB-zcwHncdB" },
      { name: "GBP Audit", desc: "7-tab Google Business Profile audit covering core listing data, services & products verification, competitor comparison, service gap research, and a prioritized action checklist.", link: "https://docs.google.com/spreadsheets/d/1ouys6Qe-rCP9zir2Ob-AZDgh2EHHQ70PWGOrTwr2agw/edit" },
    ],
  },
];

const otherProjects = [
  {
    title: "N8N GBP Post Automator",
    desc: "I created this automation sheet for creating GBP Post Contents, Generating Keywords, and FAQs. We managed to create contents faster than to do them manually. For now, this is not available online for this needs VPS to work 24/7. If given the chance, I can automate your processes too.",
    link: "https://docs.google.com/spreadsheets/d/1LgB0vf_E-PI82HhMPuZImkff0Ll_skyLTviO-h_VJJE/edit?gid=1452795685#gid=1452795685",
  },
  {
    title: "SEO Campaign Dashboards",
    desc: "This is a sample dashboard for monitoring campaign tasks, workload distribution, deadlines, etc. With this we can manage campaigns easily and conveniently. I can do something like this for your business too.",
    link: "https://kemzcobradz.github.io/sample-task-management-dashboard/",
  },
];

const services = [
  { title: "SEO (Specialized)", items: ["Technical SEO auditing (180+ item checklist, 24 categories)", "Keyword research and content strategy", "On-page optimization and internal linking", "Local SEO and Google Business Profile management", "SEO reporting and analytics"] },
  { title: "Executive Assistant & Admin", items: ["Calendar & schedule management across multiple time zones", "Email inbox management and client communication", "Client onboarding (9+ clients onboarded end-to-end)", "Document preparation, reports, and meeting notes", "Travel coordination and expense tracking"] },
  { title: "Generalist VA & Project Management", items: ["Project tracking (Freedcamp, 931+ tasks managed)", "Data entry, reporting, and KPI dashboards", "Content writing and editing", "Process documentation and SOP creation", "Research and competitor analysis"] },
];

const tools = [
  { category: "SEO & Analytics", items: ["Google Analytics", "Google Tag Manager", "Google Search Console", "Google Business Profile", "Looker Studio", "Screaming Frog", "Ahrefs", "SEMrush", "GTMetrix", "Local Dominator", "VPS"] },
  { category: "Productivity", items: ["Google Workspace", "Microsoft Office", "Slack", "Mattermost", "Freedcamp", "Obsidian"] },
  { category: "AI & Automation", items: ["ChatGPT", "Claude", "Claude Cowork", "Claude Code", "Gemini", "Gemini CLI", "N8N", "Python scripting", "Openclaw", "Openwork", "Opencode", "Hermes"] },
  { category: "CMS", items: ["WordPress"] },
  { category: "Design", items: ["Canva"] },
];

const highlights = [
  { title: "From Zero to Structured", desc: "In a portfolio showcase project, I built a complete SEO foundation from scratch: 414+ targeted keywords, 125 content pages, and a full technical audit. This is exactly what I'd deliver for a real client." },
  { title: "931 Tasks, Zero Missed Deadlines", desc: "As Account Manager, I managed 12+ simultaneous client campaigns across 8 industries. Every task tracked, every deadline hit, every client informed. No balls dropped." },
  { title: "I Build Systems, Not Just Work", desc: "I've created 30+ SOPs that make work repeatable and auditable. When I finish a project, the process stays behind — documented, testable, and ready for the next person." },
  { title: "I Speak Both Languages", desc: "Technical enough to run a 157-item SEO audit and write Python scripts. Clear enough to explain the findings to a non-technical client in plain English." },
];

/* ─── Main ────────────────────────────────────────────── */

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [activeHighlight, setActiveHighlight] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollProgress = useScrollProgress();
  const mouse = useMouseGlow();

  // Cycle highlights every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHighlight((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && buttonRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "PROJECTS", href: "#projects" },
    { label: "TOOLS", href: "#tools" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* WebGL Neural Vortex Background */}
      <NeuralVortexBg />

      {/* Noise texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#C3E41D] to-[#C3E41D]/60 z-[60] transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="relative">
            <button ref={buttonRef} type="button" className="p-2 text-neutral-500 hover:text-[#C3E41D] transition-colors duration-300" aria-label={isMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
            {isMenuOpen && (
              <div ref={menuRef} className="absolute top-full left-0 w-[200px] bg-[#111] border border-white/10 shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100]">
                {menuItems.map((item) => (
                  <a key={item.label} href={item.href} className="block text-lg font-bold tracking-tight py-1.5 px-2 text-neutral-400 hover:text-[#C3E41D] transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="text-4xl text-white" style={{ fontFamily: "'Brush Script MT', cursive" }}>J</div>
          <div className="w-16" />
        </nav>
      </header>

      {/* Hero — side by side with mouse glow */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Mouse-follow glow */}
        <div className="pointer-events-none fixed inset-0 z-0 transition-all duration-300 ease-out" style={{ background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(195,228,29,0.06), transparent 40%)` }} />

        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-[44px] sm:text-[56px] md:text-[64px] lg:text-[80px] leading-[0.9] tracking-tighter font-light" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Jess Jacinth Kem Cobrado
            </h1>
            <p className="mt-4 text-neutral-500 text-lg sm:text-xl md:text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              SEO Virtual Assistant | Executive Assistant | Generalist VA
            </p>
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-200 leading-snug">
                I Help Businesses Get Found, Stay Organized, and Scale Without Chaos
              </h2>
              <p className="mt-4 text-neutral-500 text-base sm:text-lg leading-relaxed max-w-xl">
                8+ years across administration, financial management, client account management, digital marketing, and project management. I&apos;m not just a doer — I build systems that outlast the project.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative group cursor-pointer">
              {/* Glow behind image — intensifies on hover */}
              <div className="absolute -inset-4 bg-[#C3E41D]/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:bg-[#C3E41D]/25 group-hover:blur-3xl group-hover:scale-105" />
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-[380px] md:h-[460px] rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-[#C3E41D]/30 group-hover:shadow-[0_0_40px_rgba(195,228,29,0.15)]">
                <img src="/headshot.png" alt="Jess Cobrado, SEO Virtual Assistant and Executive Assistant" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: "50% 15%" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown className="w-8 h-8 text-neutral-500 animate-bounce" />
        </div>
      </section>

      <GradientDivider />

      {/* What I Bring to the Table — horizontal scroll */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-8">What I Bring to the Table</h2></Section>
        <div className="flex gap-6 overflow-x-auto pb-4 pt-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {highlights.map((item, i) => (
            <Section key={item.title} delay={i * 100}>
              <div
                className={`group relative min-w-[300px] sm:min-w-[350px] snap-center bg-[#111] border rounded-xl p-6 transition-all duration-500 cursor-pointer ${
                  activeHighlight === i
                    ? "border-[#C3E41D]/40 shadow-[0_0_30px_rgba(195,228,29,0.08)]"
                    : "border-white/5 hover:border-[#C3E41D]/40 hover:shadow-[0_12px_40px_rgba(195,228,29,0.1)] hover:-translate-y-2"
                }`}
                onClick={() => setActiveHighlight(i)}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C3E41D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="relative text-lg font-semibold text-white mb-3 group-hover:text-[#C3E41D] transition-colors duration-300">{item.title}</h3>
                <p className="relative text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">{item.desc}</p>
              </div>
            </Section>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {highlights.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`transition-all duration-300 cursor-pointer rounded-full ${
                activeHighlight === i 
                  ? "w-8 h-2 bg-[#C3E41D] shadow-[0_0_10px_rgba(195,228,29,0.5)]" 
                  : "w-2 h-2 bg-neutral-700 hover:bg-neutral-500 hover:shadow-[0_0_8px_rgba(195,228,29,0.3)]"
              }`}
              onClick={() => setActiveHighlight(i)}
              aria-label={`Highlight ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <GradientDivider />

      {/* Services */}
      <section id="services" className="py-24 px-6 max-w-6xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-12">Services</h2></Section>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <Section key={service.title} delay={i * 100}>
              <div className="group relative bg-[#111] border border-white/5 rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(195,228,29,0.1)] hover:border-[#C3E41D]/40 h-full overflow-hidden">
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C3E41D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="relative text-xl font-semibold text-white mb-6 group-hover:text-[#C3E41D] transition-colors duration-300">{service.title}</h3>
                <ul className="relative space-y-3">
                  {service.items.map((item, j) => (
                    <li key={item} className="text-neutral-400 text-sm leading-relaxed flex items-start gap-2 transition-all duration-300 group-hover:translate-x-1" style={{ transitionDelay: `${j * 30}ms` }}>
                      <span className="text-[#C3E41D] mt-1.5 text-xs transition-transform duration-300 group-hover:scale-125">&#9679;</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>
          ))}
        </div>
      </section>

      <GradientDivider />

      {/* Work Samples */}
      <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-12">Work Samples</h2></Section>
        <div className="space-y-8">
          {projects.map((project, i) => (
            <Section key={project.title} delay={i * 100}>
              <div className="group bg-[#111] border border-white/5 rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(195,228,29,0.1)] hover:border-[#C3E41D]/40 overflow-hidden relative">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C3E41D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#C3E41D] transition-colors duration-300">{project.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ml-4 ${project.status === "Completed" ? "bg-[#C3E41D]/10 text-[#C3E41D]" : "bg-blue-500/10 text-blue-400"}`}>{project.statusLabel}</span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-1"><span className="text-neutral-500">Sample Project:</span> {project.sampleProjectLink ? <a href={project.sampleProjectLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#C3E41D] transition-colors duration-200">{project.sampleProject}</a> : project.sampleProject}</p>
                  <p className="text-sm text-neutral-400 mb-4"><span className="text-neutral-500">Problem:</span> {project.problem}</p>
                  <button type="button" className="text-sm text-[#C3E41D] hover:underline mb-4 cursor-pointer" onClick={() => setExpandedProject(expandedProject === i ? null : i)}>
                    {expandedProject === i ? "Hide deliverables ▲" : "What I Did ▼"}
                  </button>
                  {expandedProject === i && (
                    <div className="space-y-5 mt-4 border-t border-white/5 pt-4">
                      {project.deliverables.map((d) => (
                        <div key={d.name}>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-white">{d.name}</p>
                            <a href={d.link} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-[#C3E41D] transition-colors duration-200 cursor-pointer">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <p className="text-sm text-neutral-400 leading-relaxed">{d.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      <GradientDivider />

      {/* Other Projects */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-12">Other Projects</h2></Section>
        <div className="grid md:grid-cols-2 gap-8">
          {otherProjects.map((project, i) => (
            <Section key={project.title} delay={i * 100}>
              <div className="group bg-[#111] border border-white/5 rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(195,228,29,0.1)] hover:border-[#C3E41D]/40 h-full overflow-hidden relative">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C3E41D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#C3E41D] transition-colors duration-300 mb-4">{project.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4">{project.desc}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#C3E41D] hover:underline">
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      <GradientDivider />

      {/* Tools */}
      <section id="tools" className="py-24 px-6 max-w-5xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-12">Tools I Work With</h2></Section>
        <div className="space-y-8">
          {tools.map((group, i) => (
            <Section key={group.category} delay={i * 80}>
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-3">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tool) => (
                  <span key={tool} className="px-3 py-1.5 bg-[#111] border border-white/5 rounded-lg text-sm text-neutral-300 hover:border-[#C3E41D]/40 hover:text-[#C3E41D] hover:shadow-[0_8px_30px_rgba(195,228,29,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-default">{tool}</span>
                ))}
              </div>
            </Section>
          ))}
        </div>
      </section>

      <GradientDivider />

      {/* About Me */}
      <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-8">About Me</h2></Section>
        <Section delay={100}>
          <div className="space-y-6 text-neutral-400 text-lg leading-relaxed max-w-3xl">
            <p>8+ years of combined experience in administration, financial management, client account management, digital marketing, and project management. BS in Business Administration from Bukidnon State University. Additional training in Technical SEO, C, Python, Django, and HTML/CSS.</p>
            <p>I&apos;ve worked across industries including pet care, healthcare, hospitality, and e-commerce — adapting my approach to fit each business&apos;s unique needs and audiences.</p>
            <p>I create systems, document processes, and deliver results that last beyond the project.</p>
          </div>
        </Section>
      </section>

      <GradientDivider />

      {/* Let's Connect */}
      <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-8">Let&apos;s Connect</h2></Section>
        <Section delay={100}>
          <div className="space-y-4 text-neutral-400">
            <p><span className="text-neutral-500">Email:</span> <a href="mailto:kemzcobradz@gmail.com" className="hover:text-[#C3E41D] transition-colors duration-200 cursor-pointer">kemzcobradz@gmail.com</a></p>
            <p><span className="text-neutral-500">Location:</span> Central Poblacion, Kalilangan, Bukidnon, Philippines (Remote)</p>
            <p><span className="text-neutral-500">Timezone:</span> Asia/Manila (GMT+8)</p>
            <p className="pt-4 text-white text-lg">Open to remote VA, SEO, and executive assistant roles.</p>
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
          <span>&copy; 2026 Jess Cobrado. All rights reserved.</span>
          <span>Last updated: June 17, 2026</span>
        </div>
      </footer>
    </div>
  );
}
