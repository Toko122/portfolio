
"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const cvPath = `${basePath}/Toko_Migineishvili_Professional_CV.pdf`;

const navigation = [
  { label: "Projects", href: "#work", number: "01" },
  { label: "About", href: "#developer", number: "02" },
  { label: "Skills", href: "#skills", number: "03" },
  { label: "Contact", href: "#contact", number: "04" },
];

const projects = [
  {
    title: "TransAuto",
    category: "Client Web Application",
    description:
      "A full-stack automotive platform featuring secure online payments, role-based administration, real-time notifications, transactional emails, and structured data management.",
    highlights: [
      "Integrated Flitt payments with signature verification and payment status handling.",
      "Implemented real-time admin notifications using Server-Sent Events.",
      "Built email notifications and PostgreSQL data import workflows.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Flitt",
      "Redis",
      "SSE",
      "SendGrid",
    ],
    href: "https://www.transauto.ge/",
    color: "fuchsia" as const,
  },
  {
    title: "Cyber Academy",
    category: "Educational Website",
    description:
      "A modern, responsive educational website designed with an emphasis on usability, clear navigation, performance, and consistent visual design.",
    highlights: [
      "Developed the website interface using Next.js and TypeScript.",
      "Created responsive layouts for mobile, tablet, and desktop devices.",
      "Focused on maintainable components and a polished user experience.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Cloudinary",
      "Responsive UI",
    ],
    href: "https://academy.edu.ge",
    color: "cyan" as const,
  },
];

const skills = [
  {
    title: "Frontend Development",
    items: [
      "React / Next.js",
      "TypeScript / JavaScript",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "Responsive Design",
      "UI Components",
    ],
  },
  {
    title: "Backend & Databases",
    items: [
      "Node.js / Express",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Authentication / JWT",
    ],
  },
  {
    title: "Infrastructure & Tools",
    items: [
      "Linux / Ubuntu",
      "Nginx / PM2",
      "VPS Deployment",
      "Git / GitHub",
      "Vercel",
      "Production Debugging",
    ],
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const colorClasses = {
    cyan: "hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)]",
    fuchsia:
      "hover:border-fuchsia-400/60 hover:shadow-[0_0_30px_rgba(232,121,249,0.12)]",
  };

  return (
    <article
      className={`group flex h-full flex-col rounded-xl border border-cyan-900/40 bg-[#0b1020]/90 p-6 transition-all duration-300 sm:p-8 ${colorClasses[project.color]}`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-cyan-400/70">
            {project.category}
          </p>
          <h3 className="text-2xl font-bold text-white">
            {project.title}
          </h3>
        </div>

        <span className="rounded-lg border border-cyan-900/50 p-2 text-cyan-400">
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <p className="mb-6 text-sm leading-7 text-slate-300">
        {project.description}
      </p>

      <ul className="mb-7 space-y-3 text-sm leading-6 text-slate-400">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span className="text-fuchsia-400" aria-hidden="true">
              ›
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-cyan-900/40 bg-cyan-950/20 px-3 py-1.5 text-xs text-cyan-200/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition-colors hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
        >
          Visit Project
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  // Lock page scrolling while the sidebar is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // Keyboard support and responsive cleanup.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Move keyboard focus into the sidebar.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const frame = requestAnimationFrame(() => {
      sidebarRef.current
        ?.querySelector<HTMLButtonElement>(
          "[data-sidebar-close]"
        )
        ?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [mobileMenuOpen]);

  // Trap Tab navigation inside the open sidebar.
  function handleSidebarKeyDown(
    event: ReactKeyboardEvent<HTMLElement>
  ) {
    if (event.key !== "Tab") return;

    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const elements = Array.from(
      sidebar.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex="0"]'
      )
    );

    if (!elements.length) return;

    const first = elements[0];
    const last = elements[elements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      id="top"
      className="relative min-h-screen bg-[#050510] font-mono text-cyan-50 selection:bg-fuchsia-500/30 selection:text-fuchsia-100"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] max-w-full -translate-x-1/2 rounded-full bg-cyan-700/10 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-800/10 blur-[120px]" />
      </div>

      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-cyan-900/40 bg-[#050510]/95 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#top"
            onClick={closeMenu}
            className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-xl font-black tracking-widest text-transparent"
          >
            TOKO.DEV
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-cyan-400 focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-sidebar"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile sidebar and backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <button
            type="button"
            aria-label="Close navigation sidebar"
            tabIndex={mobileMenuOpen ? 0 : -1}
            onClick={closeMenu}
            className={`absolute inset-0 h-full w-full bg-[#02030a]/80 backdrop-blur-sm transition-opacity duration-300 ${
              mobileMenuOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          />

          <aside
            id="mobile-sidebar"
            ref={sidebarRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            aria-hidden={!mobileMenuOpen}
            onKeyDown={handleSidebarKeyDown}
            className={`absolute inset-y-0 right-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto border-l border-cyan-500/30 bg-[#090e1d] shadow-[-20px_0_80px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out ${
              mobileMenuOpen
                ? "translate-x-0"
                : "translate-x-full"
            }`}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between border-b border-cyan-900/40 px-6 py-6">
              <div>
                <p className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-lg font-black tracking-widest text-transparent">
                  TOKO.DEV
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Navigation
                </p>
              </div>

              <button
                data-sidebar-close
                type="button"
                onClick={closeMenu}
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-label="Close sidebar"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-fuchsia-500/40 bg-fuchsia-950/30 text-fuchsia-300 transition-colors hover:bg-fuchsia-900/40 focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Sidebar introduction */}
            <div className="px-6 pb-4 pt-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-fuchsia-400">
                Explore Portfolio
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Let&apos;s navigate.
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Discover my work, technical skills,
                and professional background.
              </p>
            </div>

            {/* Sidebar links */}
            <nav
              aria-label="Mobile navigation links"
              className="flex flex-col px-4 py-4"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="group flex items-center justify-between rounded-lg border-b border-cyan-900/30 px-4 py-5 transition-all hover:bg-cyan-950/40 focus-visible:outline-2 focus-visible:outline-cyan-400"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-fuchsia-400/70">
                      {item.number}
                    </span>
                    <span className="text-base font-bold uppercase tracking-wider text-slate-200 transition-colors group-hover:text-cyan-300">
                      {item.label}
                    </span>
                  </span>

                  <ArrowUpRight className="h-4 w-4 text-cyan-500 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </a>
              ))}
            </nav>

            {/* Sidebar CV button */}
            <div className="px-6 pt-4">
              <a
                href={cvPath}
                download="Toko_Migineishvili_CV.pdf"
                onClick={closeMenu}
                tabIndex={mobileMenuOpen ? 0 : -1}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-cyan-400/50 bg-cyan-500/15 px-5 py-4 text-xs font-bold uppercase tracking-widest text-cyan-300 transition-all hover:bg-cyan-500/25 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download CV
              </a>
            </div>

            {/* Sidebar footer */}
            <div className="mt-auto px-6 pb-8 pt-12">
              <div className="h-px bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/40 to-transparent" />

              <p className="mt-6 text-xs uppercase tracking-widest text-slate-500">
                Connect with me
              </p>

              <div className="mt-4 flex flex-wrap gap-5">
                <a
                  href="https://github.com/Toko122"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="text-sm font-semibold text-cyan-400 hover:text-cyan-200"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/toko-migineishvili-a19770370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="text-sm font-semibold text-fuchsia-400 hover:text-fuchsia-200"
                >
                  LinkedIn ↗
                </a>
              </div>

              <p className="mt-8 text-[11px] uppercase tracking-wider text-slate-600">
                © {new Date().getFullYear()} Toko Migineishvili
              </p>
            </div>
          </aside>
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        {/* Hero */}
        <section className="flex min-h-[75vh] flex-col justify-center py-20 sm:py-28">
          <div className="max-w-5xl">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              />
              Full-Stack Web Developer
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
              Hello, I&apos;m Toko Migineishvili
            </p>

            <h1 className="max-w-5xl text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Building Modern
              <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                Digital Experiences.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl border-l-2 border-fuchsia-500/60 pl-6 text-base leading-8 text-slate-300 sm:text-lg">
              Full-Stack Developer with 2+ years of hands-on
              experience building responsive web applications,
              developing backend systems, and deploying
              production-ready solutions. I work across the
              development lifecycle, from architecture and
              implementation to deployment and troubleshooting.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-7 py-4 text-sm font-bold uppercase tracking-wider text-[#050510] transition-all hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              >
                Explore Projects
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href={cvPath}
                download="Toko_Migineishvili_CV.pdf"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-cyan-500/50 bg-cyan-950/30 px-7 py-4 text-sm font-bold uppercase tracking-wider text-cyan-300 transition-all hover:bg-cyan-900/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                Download CV
              </a>
            </div>

            <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-slate-500">
              <span>Based in Batumi, Georgia</span>
              <span>Full-Stack Development</span>
              <span>Linux & Deployment</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="work"
          className="scroll-mt-24 border-t border-cyan-900/40 py-24"
        >
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">
              Portfolio / 01
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Selected Projects
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              A selection of client and product development work,
              demonstrating practical experience with frontend
              interfaces, backend architecture, integrations,
              and application deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        {/* About */}
        <section
          id="developer"
          className="scroll-mt-24 border-t border-cyan-900/40 py-24"
        >
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">
                Developer / 02
              </p>
              <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
                About Me
              </h2>

              <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-xl border border-cyan-500/30 bg-cyan-950/20">
                <Image
                  src={`${basePath}/sysadmin_03.png`}
                  alt="Toko Migineishvili"
                  fill
                  sizes="(max-width: 1024px) 100vw, 350px"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050510]/70 to-transparent" />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 text-base leading-8 text-slate-300 lg:col-span-8">
              <p>
                I&apos;m{" "}
                <strong className="font-semibold text-cyan-300">
                  Toko Migineishvili
                </strong>
                , a Full-Stack Web Developer focused on building
                reliable, maintainable, and user-friendly digital
                products.
              </p>

              <p>
                My experience includes developing applications
                with{" "}
                <strong className="font-semibold text-white">
                  React, Next.js, TypeScript, Node.js,
                  PostgreSQL, and Redis
                </strong>
                . I have worked on client platforms, educational
                websites, and marketplace functionality involving
                authentication, payment processing, role-based
                interfaces, and real-time notifications.
              </p>

              <p>
                Beyond application development, I have practical
                experience with Linux environments, VPS deployment,
                Nginx, PM2, and production troubleshooting. I
                enjoy understanding how software works from the
                user interface through to the server.
              </p>

              <p>
                I&apos;m a responsible, hardworking, and
                detail-oriented developer who values clear
                communication, continuous learning, and delivering
                dependable results.
              </p>

              <p>
                I&apos;m also expanding my knowledge of
                cybersecurity, with a particular interest in
                OSINT, SOCMINT, security research, and
                understanding digital risks.
              </p>

              <div className="mt-4 rounded-xl border border-fuchsia-500/20 bg-fuchsia-950/10 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                  My Approach
                </p>
                <p className="mt-3 text-xl font-semibold text-white">
                  Build thoughtfully. Deliver reliably.
                  Keep improving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="scroll-mt-24 border-t border-cyan-900/40 py-24"
        >
          <div className="mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">
              Expertise / 03
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Technical Skills
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-400">
              Technologies and tools I use to develop, deploy,
              and maintain modern web applications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {skills.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-cyan-900/40 bg-[#0b1020]/80 p-7 transition-colors hover:border-cyan-500/40"
              >
                <h3 className="mb-6 border-b border-cyan-900/40 pb-4 text-sm font-bold uppercase tracking-wider text-cyan-400">
                  {group.title}
                </h3>

                <ul className="space-y-4">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-24 border-t border-cyan-900/40 py-28"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-fuchsia-400">
              Contact / 04
            </p>

            <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
              Let&apos;s Build{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
                Something Great.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400">
              I&apos;m interested in meaningful software
              development opportunities, challenging projects,
              and collaboration with teams that value quality,
              responsibility, and continuous improvement.
              Let&apos;s connect.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://github.com/Toko122"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-950/30 px-7 py-4 text-sm font-bold uppercase tracking-wider text-cyan-300 transition-all hover:bg-cyan-900/50"
              >
                View GitHub
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="https://www.linkedin.com/in/toko-migineishvili-a19770370/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-fuchsia-600 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-fuchsia-500"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-10 text-xs uppercase tracking-widest text-cyan-400/70">
              Open to collaboration and professional opportunities
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-900/30 py-9">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center text-xs text-slate-500 sm:px-8 md:flex-row">
          <p>
            © {new Date().getFullYear()} Toko Migineishvili.
            All rights reserved.
          </p>

          <p>
            Designed & developed by{" "}
            <a
              href="https://github.com/Toko122"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 hover:text-cyan-200"
            >
              Toko Migineishvili
            </a>
          </p>

          <a
            href="#top"
            className="font-semibold uppercase tracking-widest text-cyan-400 hover:text-white"
          >
            Back to Top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
