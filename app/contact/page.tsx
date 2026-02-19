"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0, raf: number;
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      cx += (x - cx) * 0.12; cy += (y - cy) * 0.12;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onEnter = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,[data-hover]")) setHovered(true); };
    const onLeave = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,[data-hover]")) setHovered(false); };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", onEnter); document.removeEventListener("mouseout", onLeave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ willChange: "transform" }}>
        <div className="h-10 w-10 rounded-full border border-emerald-400/60 transition-all duration-200"
          style={{ transform: hovered ? "scale(1.8)" : "scale(1)", background: hovered ? "rgba(52,211,153,0.08)" : "transparent", mixBlendMode: "difference" }} />
      </div>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ willChange: "transform" }}>
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
    </>
  );
}

function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="absolute block rounded-full"
          style={{ width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, background: i % 3 === 0 ? "rgba(52,211,153,0.5)" : i % 3 === 1 ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.2)", animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`, animationDelay: `${Math.random() * 8}s` }} />
      ))}
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function Badge({ color, children }: { color: "emerald" | "cyan"; children: React.ReactNode }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm
      ${color === "emerald" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]" : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]"}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full animate-pulse ${color === "emerald" ? "bg-emerald-400" : "bg-cyan-400"}`} />
      {children}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    { icon: "📧", title: "Email", value: "ecobridges.tech@gmail.com", description: "For detailed project inquiries and discussions", action: "mailto:ecobridges.tech@gmail.com", actionText: "Send Email" },
    { icon: "📱", title: "WhatsApp", value: "Quick discussion and project inquiries", description: "Fast response for urgent queries", action: "https://wa.me/1234567890", actionText: "Chat on WhatsApp" },
    { icon: "🌍", title: "Location", value: "India", description: "We work remotely with clients across regions", action: null, actionText: null },
  ] as const;

  const projectTypes = ["IoT System", "Web Application", "Mobile Application", "Prototype / POC", "Full-Stack Solution", "Other"] as const;

  const nextSteps = [
    { number: "01", title: "We review your requirement", desc: "Analyze your project details and technical needs" },
    { number: "02", title: "Schedule a discussion if needed", desc: "Clarify requirements and understand constraints" },
    { number: "03", title: "Suggest a technical approach", desc: "Propose architecture and technology stack" },
    { number: "04", title: "Share a clear execution plan", desc: "Timeline, milestones, and budget estimate" },
  ] as const;

  const whatToInclude = [
    "Project goal and success criteria",
    "Timeline and budget range",
    "Hardware needs (if any)",
    "Users and workflows",
    "Technical constraints or requirements",
    "Integration needs with existing systems",
  ] as const;

  const workingPoints = [
    "Clear communication",
    "Structured development process",
    "Practical and deployable solutions",
    "Budget-friendly planning",
    "Reliable support",
  ] as const;

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#e5e5e5",
    fontFamily: "'Orbitron', monospace",
    fontSize: "12px",
    outline: "none",
    transition: "all 0.3s",
  };

  return (
    <>
      <CustomCursor />
      <Particles />
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-[0.015]" aria-hidden>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(52,211,153,0.8)", animation: "scanline 8s linear infinite" }} />
      </div>

      <div className="relative z-10 space-y-24">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-16"
          style={{ background: "radial-gradient(ellipse at top left, rgba(16,185,129,0.1) 0%, transparent 60%), linear-gradient(135deg, #0d1a14 0%, #0a0a0a 50%, #0d1520 100%)", border: "1px solid rgba(52,211,153,0.2)", animation: "borderGlow 4s ease-in-out infinite" }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden
            style={{ backgroundImage: "linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(to right, rgba(52,211,153,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" />
            <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-cyan-500/8 blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
          </div>
          <div className="relative">
            <Badge color="emerald">Get in Touch</Badge>
            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Let's Build Something{" "}</span>
              <span className="shimmer-text">Meaningful Together</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
              Have an idea, project, or problem you want to solve? We'd love to hear from you.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Whether you're looking for an IoT solution, software platform, mobile app, or a complete end-to-end system, EcoBridges is ready to collaborate.
            </p>
          </div>
        </section>

        {/* ── CONTACT METHODS ── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4 text-center">
              <Badge color="cyan">Reach Us</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">How to Reach Us</h2>
              <p className="text-zinc-400">Choose the method that works best for you</p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {contactMethods.map((method, idx) => (
              <Reveal key={method.title} delay={idx * 100}>
                <div data-hover className="card-glass group relative overflow-hidden rounded-2xl p-8">
                  <div className="absolute -right-8 -top-8 text-8xl opacity-[0.04] transition-all group-hover:scale-110 group-hover:opacity-[0.08] select-none">
                    {method.icon}
                  </div>
                  <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-emerald-500/8 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/15 group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                      style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}>
                      {method.icon}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{method.title}</h3>
                    <p className="mt-2 text-xs font-bold tracking-widest text-emerald-400">{method.value}</p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400">{method.description}</p>
                    {method.action && (
                      <a href={method.action} target="_blank" rel="noopener noreferrer" data-hover
                        className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold tracking-widest text-emerald-400 transition-all hover:shadow-[0_0_16px_rgba(52,211,153,0.2)]"
                        style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.25)" }}>
                        {method.actionText}
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FORM + SIDEBAR ── */}
        <section className="grid gap-8 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <Reveal>
              <div className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-sm font-bold text-white mb-1">What to Include</h3>
                <p className="text-xs text-zinc-500 mb-5">Help us understand your project better</p>
                <ul className="space-y-2.5">
                  {whatToInclude.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
                      <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl p-6" style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.2)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white tracking-widest">Response Time</h3>
                    <p className="text-[11px] text-zinc-500">Fast turnaround</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                  You can expect a response within{" "}
                  <span className="font-bold text-emerald-400">24–48 hours</span> on weekdays.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-2xl p-6 space-y-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 className="text-xs font-bold text-white tracking-widest">Working with EcoBridges</h3>
                <ul className="space-y-2">
                  {workingPoints.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-zinc-400">
                      <svg className="h-4 w-4 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal className="lg:col-span-2">
            <div id="form" className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/6 blur-[80px]" />

              <div className="relative">
                <div className="mb-8">
                  <Badge color="emerald">Project Inquiry</Badge>
                  <h2 className="mt-4 text-2xl font-bold text-white">Tell Us About Your Project</h2>
                  <p className="mt-2 text-xs text-zinc-500">Fill out the form below and we'll get back to you soon</p>
                </div>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)" }}>
                      <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">Inquiry Sent!</h3>
                    <p className="text-xs text-zinc-400 max-w-sm">Thank you for reaching out. We'll review your project details and get back to you within 24–48 hours.</p>
                    <button onClick={() => setSubmitted(false)} data-hover
                      className="mt-2 rounded-xl px-5 py-2 text-xs font-bold text-emerald-400 transition-all"
                      style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}>
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Full Name *</span>
                        <input type="text" name="name" required placeholder="Your name"
                          className="h-12 rounded-xl px-4 transition-all focus:shadow-[0_0_0_2px_rgba(52,211,153,0.3)]"
                          style={inputStyle} />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Email Address *</span>
                        <input type="email" name="email" required placeholder="you@company.com"
                          className="h-12 rounded-xl px-4 transition-all focus:shadow-[0_0_0_2px_rgba(52,211,153,0.3)]"
                          style={inputStyle} />
                      </label>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Contact Number (Optional)</span>
                      <input type="tel" name="phone" placeholder="+91 1234567890"
                        className="h-12 rounded-xl px-4 transition-all focus:shadow-[0_0_0_2px_rgba(52,211,153,0.3)]"
                        style={inputStyle} />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Project Type *</span>
                      <select name="projectType" required
                        className="h-12 rounded-xl px-4 transition-all focus:shadow-[0_0_0_2px_rgba(52,211,153,0.3)]"
                        style={{ ...inputStyle, appearance: "none" }}>
                        <option value="" style={{ background: "#0a0a0a" }}>Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type} style={{ background: "#0a0a0a" }}>{type}</option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Brief Project Description *</span>
                      <textarea name="description" rows={5} required
                        placeholder="What are you building? What problems are you solving? What are your technical requirements and constraints?"
                        className="rounded-xl p-4 resize-none transition-all focus:shadow-[0_0_0_2px_rgba(52,211,153,0.3)]"
                        style={inputStyle} />
                    </label>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Expected Timeline</span>
                        <input type="text" name="timeline" placeholder="e.g., 2-3 months"
                          className="h-12 rounded-xl px-4 transition-all focus:shadow-[0_0_0_2px_rgba(52,211,153,0.3)]"
                          style={inputStyle} />
                      </label>
                      <label className="grid gap-2">
                        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Budget Range</span>
                        <input type="text" name="budget" placeholder="e.g., $5,000 - $10,000"
                          className="h-12 rounded-xl px-4 transition-all focus:shadow-[0_0_0_2px_rgba(52,211,153,0.3)]"
                          style={inputStyle} />
                      </label>
                    </div>

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[11px] text-zinc-600">* Required fields. We respect your privacy.</p>
                      <button type="submit" data-hover
                        className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-xs font-bold text-white">
                        Send Inquiry
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── WHAT HAPPENS NEXT ── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4 text-center">
              <Badge color="emerald">Next Steps</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">What Happens Next?</h2>
              <p className="text-zinc-400">Once you submit your inquiry:</p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 80}>
                <div data-hover className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.12)]"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/8 blur-2xl transition-all group-hover:bg-emerald-500/15 group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-emerald-400"
                      style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                      {step.number}
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-20 text-center"
            style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.98), rgba(10,26,20,0.9), rgba(10,21,32,0.95))", border: "1px solid rgba(52,211,153,0.2)" }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute -left-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
              <div className="absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>
            <div className="relative space-y-6">
              <h2 className="text-4xl font-bold text-white sm:text-6xl">
                Your Idea Deserves a{" "}
                <span className="shimmer-text">Working Solution</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
                Let's discuss your project and build the right technology together.
              </p>
              <p className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Ready to Start?</p>
              <div className="pt-4">
                <a href="#form" data-hover
                  className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white">
                  Start a Project
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </Reveal>

      </div>
    </>
  );
}
