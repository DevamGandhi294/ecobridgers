import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "EcoBridges - Bridging Ideas to Real-World Technology",
  description: "IoT systems, web platforms, mobile applications, and cloud solutions. From concept to execution with practical, scalable, and maintainable systems.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </head>
      <body style={{ background: "#050608", color: "#e5e5e5", fontFamily: "'Orbitron', system-ui, sans-serif" }}>
        <div className="min-h-screen">
          {/* Header */}
          <header
            className="sticky top-0 z-50 backdrop-blur-lg"
            style={{
              background: "rgba(5,6,8,0.85)",
              borderBottom: "1px solid rgba(52,211,153,0.15)",
            }}
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              {/* Logo */}
              <Link href="/" className="group inline-flex items-center gap-3">
                <span
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all group-hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(6,182,212,0.1))",
                    border: "1px solid rgba(52,211,153,0.3)",
                  }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </span>
                <div className="leading-tight">
                  <div
                    className="text-base font-bold tracking-widest text-white transition-colors group-hover:text-emerald-400"
                    style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "0.12em" }}
                  >
                    EcoBridges
                  </div>
                  <div className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
                    IoT • Web • Mobile • Cloud
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden items-center gap-1 sm:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl px-4 py-2 text-xs font-semibold tracking-widest uppercase text-zinc-400 transition-all hover:bg-white/[0.06] hover:text-emerald-300"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="ml-3 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2 text-xs font-bold tracking-widest uppercase text-white transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #06b6d4)",
                    fontFamily: "'Orbitron', monospace",
                  }}
                >
                  Start Project
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </nav>

              {/* Mobile Navigation */}
              <details className="relative sm:hidden">
                <summary
                  className="list-none cursor-pointer rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-100 transition-all hover:text-emerald-300"
                  style={{
                    background: "rgba(52,211,153,0.06)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    fontFamily: "'Orbitron', monospace",
                  }}
                >
                  Menu
                </summary>
                <div
                  className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl shadow-2xl"
                  style={{
                    background: "rgba(8,10,12,0.97)",
                    border: "1px solid rgba(52,211,153,0.2)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="p-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-300 transition-all hover:bg-white/[0.06] hover:text-emerald-300"
                        style={{ fontFamily: "'Orbitron', monospace" }}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-white"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #06b6d4)",
                        fontFamily: "'Orbitron', monospace",
                      }}
                    >
                      Start Project
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </details>
            </div>
            {/* Gradient line */}
            <div
              className="h-px w-full"
              style={{ background: "linear-gradient(to right, transparent, rgba(52,211,153,0.4), transparent)" }}
            />
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
            {children}
          </main>

          {/* Footer */}
          <footer
            className="relative"
            style={{
              background: "rgba(5,6,8,0.9)",
              borderTop: "1px solid rgba(52,211,153,0.12)",
            }}
          >
            <div
              className="absolute top-0 left-0 h-px w-full"
              style={{ background: "linear-gradient(to right, transparent, rgba(52,211,153,0.4), transparent)" }}
            />

            <div className="mx-auto max-w-6xl px-6 py-14">
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2.5">
                    <span
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(6,182,212,0.1))",
                        border: "1px solid rgba(52,211,153,0.25)",
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <div
                      className="text-sm font-bold tracking-widest text-white"
                      style={{ fontFamily: "'Orbitron', monospace", letterSpacing: "0.12em" }}
                    >
                      EcoBridges
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-500" style={{ fontFamily: "'Orbitron', monospace" }}>
                    Practical delivery for real-world systems. Building IoT, web, mobile, and cloud solutions.
                  </p>
                  {/* Tech badge */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["IoT", "Web", "Mobile", "Cloud"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest"
                        style={{
                          background: "rgba(52,211,153,0.06)",
                          border: "1px solid rgba(52,211,153,0.2)",
                          color: "#6ee7b7",
                          fontFamily: "'Orbitron', monospace",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3
                    className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    Quick Links
                  </h3>
                  <ul className="space-y-2.5">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-xs text-zinc-400 tracking-widest transition-colors hover:text-emerald-400"
                          style={{ fontFamily: "'Orbitron', monospace" }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3
                    className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    Services
                  </h3>
                  <ul className="space-y-2.5">
                    {["IoT & Embedded Systems", "Web & Cloud Platforms", "Mobile Applications", "AI-Assisted Solutions"].map((s) => (
                      <li key={s} className="text-xs text-zinc-500 tracking-wide" style={{ fontFamily: "'Orbitron', monospace" }}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div>
                  <h3
                    className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-emerald-400"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    Get Started
                  </h3>
                  <p
                    className="mb-5 text-xs leading-relaxed text-zinc-500"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    Ready to bridge your idea to reality?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-emerald-400 transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]"
                    style={{
                      background: "rgba(52,211,153,0.08)",
                      border: "1px solid rgba(52,211,153,0.25)",
                      fontFamily: "'Orbitron', monospace",
                    }}
                  >
                    Contact Us
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="mt-12 flex flex-col gap-4 pt-8 text-[10px] text-zinc-600 sm:flex-row sm:items-center sm:justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "'Orbitron', monospace" }}
              >
                <div className="tracking-widest">
                  © {new Date().getFullYear()} EcoBridges. All rights reserved.
                </div>
                <div className="flex gap-6 tracking-widest">
                  <Link href="/privacy" className="transition-colors hover:text-emerald-400">Privacy Policy</Link>
                  <Link href="/terms" className="transition-colors hover:text-emerald-400">Terms of Service</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
