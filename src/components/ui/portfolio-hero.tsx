"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import NeuralVortexBg from "./neural-vortex-bg";
import headshotImg from "../../../public/headshot.png";

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

const testimonials = [
  {
    quote: "I've had the opportunity to work closely with Jess at Propel and have consistently found him to be someone I can rely on. He takes ownership of his responsibilities, follows through on his commitments, and can be trusted to deliver quality work with minimal supervision once instructions and expectations are clearly communicated.\n\nJess is also proactive in his approach. He looks for ways to contribute, identify potential issues, and help keep tasks moving forward. His strong work ethic and willingness to put in the effort have made him a dependable presence within the team.\n\nHe's also eager to learn and continuously improve, which has been valuable to the work we've done at Propel. Overall, Jess's reliability, initiative, and commitment have made him someone the team can consistently count on.",
    name: "Shekinah Garcia",
    role: "Operations Manager",
    company: "Propel Digital Marketing",
    email: "shekinah@propeldigitalmarketing.ca",
  },
  {
    quote: "I had the pleasure of working closely with Jess, and I found him to be a capable and reliable team member. He picks up new tasks quickly, takes initiative, and handles his work with a solid level of ownership. His experience spans SEO, account management, executive support, and general operations.\n\nJess is a strong communicator and a fast learner who consistently delivered on what was asked of him. I am happy to recommend him for SEO, executive assistant, or generalist roles.",
    name: "Saad Satti",
    role: "Head SEO",
    company: "Propel Digital Marketing",
    email: "saad@propeldigitalmarketing.ca",
  },
];

const services = [
  { title: "SEO (Specialized)", items: ["Technical SEO auditing (180+ item checklist, 24 categories)", "Keyword research and content strategy", "On-page optimization and internal linking", "Local SEO and Google Business Profile management", "SEO reporting and analytics"] },
  { title: "Executive Assistant & Admin", items: ["Calendar & schedule management across multiple time zones", "Email inbox management and client communication", "Client onboarding (9+ clients onboarded end-to-end)", "Document preparation, reports, and meeting notes", "Travel coordination and expense tracking"] },
  { title: "Generalist VA & Project Management", items: ["Project tracking (Freedcamp, 931+ tasks managed)", "Data entry, reporting, and KPI dashboards", "Content writing and editing", "Process documentation and SOP creation", "Research and competitor analysis"] },
];

const tools = [
  { category: "SEO & Analytics", items: [
    { name: "Google Analytics", icon: "googleanalytics", color: "#E37400" },
    { name: "Google Tag Manager", icon: "googletagmanager", color: "#4285F4" },
    { name: "Google Search Console", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk6K1fQx6ySor4yz5HN6eNew5i380KiDUw6A&s" },
    { name: "Google Business Profile", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHWVzD-ATDCxxYEGXHKZAge461LbJtxfSvXg&s" },
    { name: "Looker Studio", icon: "google", color: "#4285F4" },
    { name: "Screaming Frog", icon: "data:image/png;base64,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" },
    { name: "Ahrefs", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAArlBMVEUFStr////7hQEFS9oALdbV3vgAK9ba4vjQ2fb/iQAASd0zUcj38Ov7dgAAQ9lSduL7fQAAPdgAQej9xZ4AReLFdmExTM7zhykAOdhrYa+Hl+d0i+UyVtsAMdf+3saxu+97kObx9P23w/EpUdvJ0fRNZ9/l6/uisu2Yqes+XN3Ay/NthuQAJdZRa986YN1KcOFfa8f/zZkAPe+sqNH10rm9aFrMeFeUoelne+EADdQmiLy8AAAFOklEQVR4nO2ca3uyOBCGYRFws/uOzZ7erJCFAKII0j3b/f9/bEFaFYgY2hLmg8/VT7XV+xrDZJI5GCZCGXdeF6n7+UrfCyWWgVcyp3AmUOGwjRcsxUgoNzwQRolhTSQDKCMHz1WHEpFfVECTi4BTBjJzSaCCjII1PVItC2gWKUAlJddgpIsIL5N7UCHostKbLID1IJS7YXqJGrHSvQ2VxDAHk2GAn9yCipjW1dSiYpEcKoLZmGr3EMmgkvnsdKLiSR/KjmdlqqhiuwdVzrTGL4JDFyqcxRe0xdZtqGR2O9WCpAWV4YDyr6ECrnlvkcvi2wuUyGZ+8t5EsvQMFSBY5Y3o9gw1t4u6iMRvULaDYkXVshz7FcpD8eg1Aq+BEhs03171/W3ECWqJyFCNAzUwPXu1WHCCyuncINei+QkKi+dsRLITFJ+boy1+girQeKlaVlFDpdig0grKxePPa1mOW0HZCxUoeLdGPkbWwlaGel4p6vdfuxrnm9WhiC9MRf3x9G1HP0wFFd+7ETzrx6dv2vo6HdSNO7cHVFeX0+sD6s6fYoTCaanlA+oB9blQRu8CHgEUeUApQsEeIRRRh/ry1NbXP3/qaDAWHQOVr3sKr+W9Kv/rt47+/ufntv71h6jGPH1A1bToZqTM7790Q9HvPgtKURbb9aE6i0w7lIETaosRKnhAqYn3kucPqOYtjDqpCZUXYxTAsGLobZI6oQgByvhiwSE+rPL1cRdE+6Wbii6TLihCKVjZZhXuomWaCtEH0QxFgDm+t4vsYRKdUED9PLhjGc1QlK8i5dsXPVA09sYTTQzFV8qHZF1QhEjKnGaGAqJ87tMGBepXnvqg6DuX05RQTPkoow+qTnahgyLKl7D6oD5oqGmguJKhRGon++AYllqCPDiIQRg3CXbrl+dNFlfxFaMLLTE6Pd7Acfe7vGSOwysUIKT5IEvPwQGk+0t63PiU1QGw1f5vPVBEEhqIo8OI/J01HbEkdhqom9UCBZs+kzdQXaEHqu+lBstQtEBJHr7jUBmKFqj+1Y65md1S/asdcyh/ToqZoG6XoRDq93sWZoZidNtD0gV1o7KJWjsJki4oafUsFOsb0YQeqHXPVBZAfjPA0QO17/opKFYDUbweP2W+XJnKIsx4GTwUTuHRexmEKm7hr1SEUIce75y/ptj7VpLPEV7MKtHseX3/5DwBFPGln1QFwUGUKEXvk0Se77r/mRrqQ8fjiaBkK312KFIKfFDW4oPf3yQHByKJ0meHMmgvbkMANaJ0sdoYdaXW6Isqkp3/py1dSyW7skRpSKjGHDJXoLLX1T6tNdt+14UuX4xT6KA1286eB3ZfsV05rzGy3hIAgKOQEy3zmJ7Ddt11Ccw49nKxabT2+XUfvAxq0rISQiEL926dC62UukFYGtDtzI/9rn7p6s62doIaU7lPKF/E5XN9xwkOk44KIF3Vv7r+Ga6ab6BGthNYdUr7VJA/TRdC006AsvECZYsKzmaeEmPbE8oGMZStdDi6td/02nQoDogW1Vt7JspGVtPF46kuLb8om6MRPX9XbeQplrZRkokzFJ7RBM2pEfEQBzNBsdV0xl3gGAwSmm0oDCNUSrMLNf+wmUtvDqKxPJfLOTQDjKh0gNGso54Iv77XQjIUy2pdrLZrIexypvFh7WwKikFrYQeiP5LO1z2Szr87kq7SNqNE1/A+wrJ+llMGZYpt7OhwDwScWJafl0JVsr0DTDoQklAGB+9G/nJodGbu86JwFp8upyi4n48fnXlGS93lp0vWCTEGah79D0ABrhPf29ATAAAAAElFTkSuQmCC" },
    { name: "SEMrush", icon: "semrush", color: "#FF6400" },
    { name: "GTMetrix", icon: "data:image/png;base64,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" },
    { name: "Local Dominator", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN2FG7SWksqVR4Hf5HY3In1ewAx7B94iBi7g&s" },
    { name: "VPS", icon: "digitalocean", color: "#0080FF" },
  ]},
  { category: "Productivity", items: [
    { name: "Google Workspace", icon: "google", color: "#4285F4" },
    { name: "Microsoft Office", icon: "data:image/jpeg;base64,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" },
    { name: "Slack", icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAA1VBMVEX/////mAAAvNRMr1DpHmMAutPpEV4At9H/jQD96/BFrUr/48j/mwB5wXxNx9uc4ez1q77tV4Tx+PH/lACx2bPnAFPp+Po4qT3nAE7/9uf/oUH/rle327j4zNj0pLj/9etctWDd7t7/vX3V8faMyY7F4sXD6/Kv5e5su2/0/P385Ov/793+9Pf3v87/pzzrRnfuZov/1q//lyJ00uGVzJeI1+TS6dKl1KYqpTD61uH/69LwdpnmAEH/uGjzmLH/x5T/njHyjKfrMm//oyf/0aH/x4r/tXCSaV0lAAAHAklEQVR4nO2aa0PiOhCGS6EFq4BSoCoKRUDuF5cFRY43BP//TzopFEjbNLemu+Wcvl+dhifjZCaZRJKYNFVkvJRc42BcN5MEaU22n2dUjgALcNsH4xYJNqmZYcKWibCyMjtYP2tE3GQ9RNpHCtppd2/9m0yrtUKkbZPC1grcsm1caFLQ3kWGNktBW4xpT5KWZpVFh5Ymg0WHVsoRQyFKtLP0KdGWT4qWZlsTIdqGTMCNFK00OynaMiEtRIsWxMIp0UptbOhGjRbUXwxu5GixsRs9Wqmbz6V9gCNIC9ybl9PIuhZJWqBGPofSNJq0lsoI7f8WPVqcYtrwFNOGp5g2PMW0sMqN9gxZn3Cazh4bZdRoAWgL82Izm802n1v1gg8rqKSg9ivMAvuFXBvBy03b+m0ahqEBGUYyW0S1eLuznELucvltE5XczDMiJ+28k9SgDzXN9Npgd9g0SsuPImgLTcPzlWHOnY7N8/v14F85H5y2bhooK8PRlM4TWzBUvM5o4KCtmz6fGEUYNrBnt7RKPhitLyzc8m8L8ayFK7eD0BaQYbD3rh27FE1ZetxyANpnDOzham0qyrVA6Sk/bR1vajxbRoFzlxO3zE1Lul4zrTJBbiCzCMoLjLSYJXa0LZOvbpmU63LSFnFRu7XNFqSGUNcC5z5y0pKtjbqgwnBUOs9HWyC5FtC2yK15Rh0Dl422/kKmfaa4U2KkPdyhs9G2yL7VspJYVv4+GA1tJzK0d3+bluJ9QrLFQpuleCnDSMv09oONthliTmB7V0NBCza5wraLe9rjpvGOTGsWWGjnFDe3bLAy53swMq2WLEhdsQlXOe4TKIrpS4uF1pqa2NKbhg87pBxqeYuB1pqa0E2YIkuwCJtA+ChLpNU626mJdK7SdtDOsQj271PSGnbUiItcKNnu1MQeteCHdiRaI2sblkXRwg9Edyp0/GNhd9CipNWOuY7i4RQVrOyGxZ1fXK9Z8bSaCfXuhJwkFU8nbBu6PrhG09nrxNJqSUcnrCEHbYQp3jCwvdtBcGjOMCDQGqari9udBeNV5JlrgR31nHS5V9M6c7eRP61humcG9DiVeVOZklamqCjYa/47CfU5jZfOnbfj7UOrGckm8kVxt2Hdi/NIzpd9HbtTodgxXoyttOYc1Z2/s//skomYGETczjOq3SCQ7lVvtYr+9wj1okd3rTDfaceKFStWLHoNeot7j3p+1r3eYtEbUA5d67+eM+m1f4MZ7ux+qV4j9E8VNa1Fdbz7cyk1GZ6RSM/fEhkO6ZWnGtpP7+NSSU0hVPLSDoZL9WisXq/eff0P9Poxyuh6gkd65nvz6h3xcqwiUZG0vUnKaayqq0tf2PUnJ+qOV//8cPtqgnYrmnaIMFZLE7R7byoZflQb+NMRwL1xyZfVS/uOnlhpvEDAvt4G8OsB9xuKhrMrf8d6ab/8jNWx17t9EbCWdw+4Azysi7Z67WuoXrlzQ60iBBbg/trnhiUuDNy091jLLxftgyBYgFuxf58A66AdTLD/B/XeAXsuDBbgPlH8vot2iJ+aOnbQjkTS3lqJYUhgddKuCFMrDSHYp8C5y4G7ljBLHEW78F9itnMnEO2bQNcC2readEbyloOWtCBTKSjp9m9FwgLcG7K3YNrBimisHivwk1DXJhKZJ6lK9BZE2yPaptT3A+1GMK3+QBG2EC022dq0y8N+V1yytWlHEjF/wbSXZGN1sqetiV1kQBcSoeqy0x6qr7CqexQV7WVEaC+oIoGT9kc07TfNKrtecNGKzwkVUuHf+nbAR7sWTbuRekRadcxJK7w6nBO34o7Cy0ZbE3NuOOi75nvKgnTPSSu4PIBSBrZVhNoPFSdW2r7QHWNiux0nZQXoOMBIK3TLqP9shxykcAylpcRPe/MpDlfv78bEJTF1dRaAVmBayKz3Y/ovNDXlOBYy0wqrENslRsBVU/Axi4dWUF7QH+BWYxXZBnN5lotW2ghIDJkHZ1906F1qaunK3SnioQWxG9C9ur52DSmdfa0cLVFVHXt7nFy0IJEFaImCL3/6nhFBmXi/UkvqTqXUpIpocHLSWu1mnaPfrIOPRg/nCNatfxfV5XiVWl0tL9G3Cby0IPO+riuj7ws2jd425+hGPpX4af+GYtrwFNOGp5g2PP2XaWs3HgXI9SHT1n5uvapU1qiqHwFaVB8MlP7MxcefcbGgrl3m84/wiuox6noF91AiYrTWTajfRjCKtAl918w4EVoQDYg3HZGlta9CT4XW0SOIPm1CD3eliaZ9OyXaRCbUKiyaVt+cFO3olGgTv8JMYsJpQ80K4mnDLL//c9qEp9cpUOT3TSl1wnIrHapv7yl8y/T2I1Ratnc1HxQZLNRiNiY6F36zRA7bUKuDtCTSrljeg9n3i9T6F6e4MSn+nzEoAAAAAElFTkSuQmCC" },
    { name: "Mattermost", icon: "mattermost", color: "#0072C6" },
    { name: "Freedcamp", icon: "trello", color: "#0079BF" },
    { name: "Obsidian", icon: "obsidian", color: "#7C3AED" },
  ]},
  { category: "AI & Automation", items: [
    { name: "ChatGPT", icon: "data:image/png;base64,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" },
    { name: "Claude", icon: "anthropic", color: "#D97757" },
    { name: "Claude Cowork", icon: "anthropic", color: "#D97757" },
    { name: "Claude Code", icon: "anthropic", color: "#D97757" },
    { name: "Gemini", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png" },
    { name: "Gemini CLI", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png" },
    { name: "N8N", icon: "n8n", color: "#EA4B71" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "Openclaw", icon: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openclaw.svg" },
    { name: "Openwork", icon: "data:image/jpeg;base64,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" },
    { name: "Opencode", icon: "https://opencode.ai/_build/assets/preview-opencode-logo-light-B5i-Y4z2.png" },
    { name: "Hermes", icon: "https://cdn.jsdelivr.net/gh/selfhst/icons/png/hermes-agent.png" },
  ]},
  { category: "CMS", items: [
    { name: "WordPress", icon: "wordpress", color: "#21759B" },
  ]},
  { category: "Design", items: [
    { name: "Canva", icon: "data:image/jpeg;base64,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" },
  ]},
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
    { label: "TESTIMONIALS", href: "#testimonials" },
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
            <h2 className="mt-4 text-neutral-500 text-lg sm:text-xl md:text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              SEO Virtual Assistant | Executive Assistant | Generalist VA
            </h2>
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-200 leading-snug">
                I Help Businesses Get Found, Stay Organized, and Scale Without Chaos
              </h2>
              <p className="mt-4 text-neutral-500 text-base sm:text-lg leading-relaxed max-w-xl">
                8+ years across administration, financial management, client account management, digital marketing, and project management. I&apos;m not just a doer — I build systems that outlast the project.
              </p>
              <a href="mailto:kemzcobradz@gmail.com" className="inline-block mt-8 px-8 py-4 bg-[#C3E41D] text-black font-semibold rounded-xl hover:bg-[#d4f530] hover:shadow-[0_0_30px_rgba(195,228,29,0.3)] transition-all duration-300">
                Work With Me
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative group cursor-pointer">
              {/* Glow behind image — intensifies on hover */}
              <div className="absolute -inset-4 bg-[#C3E41D]/10 rounded-3xl blur-2xl transition-all duration-500 group-hover:bg-[#C3E41D]/25 group-hover:blur-3xl group-hover:scale-105" />
              <div className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-[380px] md:h-[460px] rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-[#C3E41D]/30 group-hover:shadow-[0_0_40px_rgba(195,228,29,0.15)]">
                <img src={headshotImg.src} alt="Jess Cobrado, SEO Virtual Assistant and Executive Assistant" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: "50% 15%" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown className="w-8 h-8 text-neutral-500 animate-bounce" />
        </div>
      </section>

      <GradientDivider />

      {/* What I Bring to the Table — grid */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-8">What I Bring to the Table</h2></Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <Section key={item.title} delay={i * 100}>
              <div
                className={`group relative bg-[#111] border rounded-xl p-6 transition-all duration-500 cursor-pointer h-full ${
                  activeHighlight === i
                    ? "border-[#C3E41D]/40 shadow-[0_0_30px_rgba(195,228,29,0.08)]"
                    : "border-white/5 hover:border-[#C3E41D]/40 hover:shadow-[0_12px_40px_rgba(195,228,29,0.1)] hover:-translate-y-2"
                }`}
                onClick={() => setActiveHighlight(i)}
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C3E41D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <h3 className="relative text-lg font-semibold text-white mb-3 group-hover:text-[#C3E41D] transition-colors duration-300">{item.title}</h3>
                <p className="relative text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">{item.desc}</p>
              </div>
            </Section>
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
                          <a href={d.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-[#C3E41D] hover:underline transition-all duration-200 cursor-pointer mb-1 inline-block">
                            {d.name}
                          </a>
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
              <div className="flex flex-wrap gap-3">
                {group.items.map((tool) => (
                  <div key={tool.name} className="group flex items-center gap-2 px-3 py-2 bg-[#111] border border-white/5 rounded-lg hover:border-[#C3E41D]/40 hover:shadow-[0_8px_30px_rgba(195,228,29,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-default">
                    {'icon' in tool && tool.icon ? (
                      <img 
                        src={tool.icon.startsWith('data:') || tool.icon.startsWith('http') ? tool.icon : `https://cdn.simpleicons.org/${tool.icon}/${tool.color!.replace('#', '')}`}
                        alt={`${tool.name} logo`}
                        className="w-4 h-4"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : null}
                    <span className="text-sm text-neutral-300 group-hover:text-[#C3E41D] transition-colors duration-300">{tool.name}</span>
                  </div>
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

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 max-w-5xl mx-auto">
        <Section><h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[#C3E41D] mb-12">What Colleagues Say</h2></Section>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <Section key={t.name} delay={i * 100}>
              <div className="group relative bg-[#111] border border-white/5 rounded-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(195,228,29,0.1)] hover:border-[#C3E41D]/40 h-full overflow-hidden flex flex-col">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C3E41D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Quote mark */}
                <div className="relative text-[#C3E41D]/20 text-6xl font-serif leading-none mb-4 select-none">&ldquo;</div>
                {/* Quote text */}
                <p className="relative text-neutral-400 text-sm leading-relaxed flex-1 whitespace-pre-line group-hover:text-neutral-300 transition-colors duration-300">{t.quote}</p>
                {/* Attribution */}
                <div className="relative mt-6 pt-4 border-t border-white/5">
                  <p className="text-white font-semibold text-sm group-hover:text-[#C3E41D] transition-colors duration-300">{t.name}</p>
                  <p className="text-neutral-500 text-xs mt-1">{t.role} &middot; {t.company}</p>
                  <p className="text-neutral-400 text-xs mt-1">{t.email}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      <GradientDivider />

      {/* Let's Connect */}
      <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center">
        <Section><h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-8">Open to remote VA, SEO, and executive assistant roles.</h2></Section>
        <Section delay={100}>
          <a href="mailto:kemzcobradz@gmail.com" className="inline-block px-8 py-4 bg-[#C3E41D] text-black font-semibold rounded-xl hover:bg-[#d4f530] hover:shadow-[0_0_30px_rgba(195,228,29,0.3)] transition-all duration-300">
            Work With Me
          </a>
        </Section>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
          <span>&copy; 2026 Jess Jacinth Kem Cobrado. All rights reserved.</span>
          <span>Last updated: June 17, 2026</span>
        </div>
      </footer>
    </div>
  );
}
