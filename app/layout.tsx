import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
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
      <body className="antialiased bg-zinc-950 text-zinc-50">
        <div className="min-h-screen">
          {/* Enhanced Header with Gradient Border Bottom */}
          <header className="sticky top-0 z-50 border-b border-emerald-500/20 bg-zinc-950/90 backdrop-blur-lg">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              {/* Logo with Animated Pulse */}
              <Link href="/" className="group inline-flex items-center gap-3">
                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-sm transition-all group-hover:scale-105 group-hover:border-emerald-500/50">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                  </span>
                </span>
                <div className="leading-tight">
                  <div className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-emerald-400">
                    EcoBridges
                  </div>
                  <div className="text-[11px] font-medium text-zinc-400">
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
                    className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="ml-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                >
                  Start a project
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </nav>

              {/* Mobile Navigation */}
              <details className="relative sm:hidden">
                <summary className="list-none cursor-pointer rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-zinc-100 backdrop-blur-sm transition-all hover:bg-emerald-500/10">
                  Menu
                </summary>
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                  <div className="p-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-white/[0.08] hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-center text-sm font-semibold text-white"
                    >
                      Start a project
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </details>
            </div>

            {/* Animated gradient line at bottom of header */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          </header>

          {/* Main Content */}
          <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
            {children}
          </main>

          {/* Enhanced Footer */}
          <footer className="relative border-t border-emerald-500/20 bg-zinc-950/50 backdrop-blur-sm">
            {/* Gradient line at top */}
            <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand Column */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <div className="text-base font-bold text-white">EcoBridges</div>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Practical delivery for real-world systems. Building IoT, web, mobile, and cloud solutions.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white">Quick Links</h3>
                  <ul className="space-y-2">
                    {navLinks.slice(0, 4).map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white">Services</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>IoT & Embedded Systems</li>
                    <li>Web & Cloud Platforms</li>
                    <li>Mobile Applications</li>
                    <li>AI-Assisted Solutions</li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white">Get Started</h3>
                  <p className="mb-4 text-sm text-zinc-400">
                    Ready to bridge your idea to reality?
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                  >
                    Contact Us
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  © {new Date().getFullYear()} EcoBridges. All rights reserved.
                </div>
                <div className="flex gap-6 text-xs">
                  <Link href="/privacy" className="transition-colors hover:text-emerald-400">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="transition-colors hover:text-emerald-400">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}