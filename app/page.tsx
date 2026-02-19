"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Custom Cursor ─────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let x = 0, y = 0, cx = 0, cy = 0;
    let raf: number;

    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", move);

    const loop = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onEnter = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[data-hover]")) setHovered(true);
    };
    const onLeave = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[data-hover]")) setHovered(false);
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] transition-opacity"
        style={{ willChange: "transform" }}
      >
        <div
          className="relative h-10 w-10 rounded-full border border-emerald-400/60 transition-all duration-200"
          style={{
            transform: hovered ? "scale(1.8)" : "scale(1)",
            background: hovered ? "rgba(52,211,153,0.08)" : "transparent",
            mixBlendMode: "difference",
          }}
        />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ willChange: "transform" }}
      >
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
    </>
  );
}

/* ─── Floating Particles ────────────────────────────────── */
function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "rgba(52,211,153,0.5)" : i % 3 === 1 ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.2)",
            animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Counter ──────────────────────────────────── */
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-hover
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ease ${delay}ms` }}
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-150" />
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at center, rgba(52,211,153,0.05) 0%, transparent 70%)" }} />
      <div className="relative">
        <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          style={{ fontFamily: "'Orbitron', 'Space Mono', monospace" }}>{value}</div>
        <div className="mt-2 text-xs font-medium text-zinc-400 sm:text-sm">{label}</div>
      </div>
    </div>
  );
}

/* ─── Section Reveal ────────────────────────────────────── */
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

/* ─── Glowing Badge ─────────────────────────────────────── */
function Badge({ color, children }: { color: "emerald" | "cyan"; children: React.ReactNode }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm
      ${color === "emerald"
        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
        : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]"}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${color === "emerald" ? "bg-emerald-400" : "bg-cyan-400"} animate-pulse`} />
      {children}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function Home() {
  const stats = [
    { value: "1+", label: "Years Experience" },
    { value: "5+", label: "Team Projects" },
    { value: "Multi", label: "Featured Works" },
    { value: "One", label: "Optimized Stack" },
  ] as const;

  const highlights = [
    { icon: "🔌", title: "IoT & Embedded Systems", desc: "Smart systems using sensors, microcontrollers, and edge devices with real-time monitoring and control.", gradient: "from-emerald-500/20 to-teal-500/10" },
    { icon: "🌐", title: "Web & Cloud Platforms", desc: "Admin dashboards, control panels, APIs, and real-time cloud connectivity using modern technologies.", gradient: "from-cyan-500/20 to-blue-500/10" },
    { icon: "📱", title: "Mobile Applications", desc: "Cross-platform apps for monitoring, control, and analytics — tightly integrated with IoT systems.", gradient: "from-violet-500/20 to-purple-500/10" },
    { icon: "🧠", title: "AI-Assisted Solutions", desc: "Data-driven insights, predictive indicators, and intelligent automation using AI/ML techniques.", gradient: "from-amber-500/20 to-orange-500/10" },
  ] as const;

  const processSteps = [
    { num: "01", title: "Discussion & Understanding", desc: "We understand your idea, requirements, constraints, and real-world use case.", icon: "💬" },
    { num: "02", title: "System Architecture", desc: "Design complete system flow, hardware architecture, cloud structure, and data pipelines.", icon: "🏗️" },
    { num: "03", title: "Parallel Development", desc: "Hardware, cloud, and software development run simultaneously to save time.", icon: "⚡" },
    { num: "04", title: "Testing & Iteration", desc: "Real condition testing, performance optimization, and refinement based on feedback.", icon: "🔬" },
    { num: "05", title: "Deployment & Handover", desc: "Final deployment with documentation and guidance for smooth usage and scalability.", icon: "🚀" },
  ] as const;

  const whyChoose = [
    { text: "Clear bridge between vision and execution", icon: "🌉" },
    { text: "Budget-friendly without compromising quality", icon: "💎" },
    { text: "Strong hardware + software integration", icon: "🔗" },
    { text: "One proven tech stack for reliability", icon: "🏆" },
    { text: "Team-based structured workflows", icon: "👥" },
    { text: "Built for startups, institutions & industries", icon: "🏭" },
  ] as const;

  const clientTypes = [
    { type: "Startups & Innovators", icon: "🚀" },
    { type: "Educational Institutions", icon: "🎓" },
    { type: "Industrial Monitoring", icon: "🏭" },
    { type: "Research & Prototypes", icon: "🔬" },
    { type: "Custom IoT Solutions", icon: "📡" },
    { type: "Full-Stack Development", icon: "💻" },
  ] as const;

  const techStack = ["Next.js", "ESP32", "MQTT", "Firebase", "Flutter", "Python", "Node.js", "AWS"];

  return (
    <>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Sora:wght@300;400;500;600;700&display=swap');

        * { cursor: none !important; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(52,211,153,0.3); box-shadow: 0 0 10px rgba(52,211,153,0.1); }
          50% { border-color: rgba(52,211,153,0.6); box-shadow: 0 0 20px rgba(52,211,153,0.3); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        body {
          font-family: 'Orbitron', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #050608;
          color: #e5e5e5;
          -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: inherit;
          letter-spacing: 0.06em;
        }

        p, span, li, button, a, input, textarea {
          font-family: inherit;
        }

        .page-shell {
          max-width: 1120px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 4rem;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #34d399 30%, #22d3ee 60%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .card-glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-glass:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(52,211,153,0.3);
          box-shadow: 0 0 40px rgba(52,211,153,0.1), 0 20px 40px rgba(0,0,0,0.4);
          transform: translateY(-4px);
        }

        .tech-pill {
          border: 1px solid rgba(52,211,153,0.25);
          background: rgba(52,211,153,0.05);
          color: #6ee7b7;
          padding: 4px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: all 0.3s;
        }
        .tech-pill:hover {
          background: rgba(52,211,153,0.15);
          border-color: rgba(52,211,153,0.5);
          box-shadow: 0 0 16px rgba(52,211,153,0.2);
          transform: scale(1.05);
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981, #06b6d4);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          box-shadow: 0 0 0 0 rgba(52,211,153,0.4);
          transition: all 0.3s;
        }
        .btn-primary:hover {
          box-shadow: 0 0 30px rgba(52,211,153,0.5), 0 8px 24px rgba(0,0,0,0.3);
          transform: translateY(-2px) scale(1.02);
        }

        .node-item {
          position: relative;
          transition: all 0.3s;
        }
        .node-item:hover .node-circle {
          background: rgba(52,211,153,0.25);
          border-color: rgba(52,211,153,0.8);
          box-shadow: 0 0 20px rgba(52,211,153,0.4);
          transform: scale(1.1);
        }
        .node-circle {
          transition: all 0.3s;
        }

        .process-card {
          transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .process-card:hover {
          transform: translateX(8px);
        }

        .marquee-track {
          display: flex;
          animation: marquee 20s linear infinite;
          width: max-content;
        }

        .glow-ring::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(135deg, #10b981, #06b6d4, #10b981);
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }
        .glow-ring:hover::before { opacity: 1; }
      `}</style>

      <CustomCursor />
      <Particles />

      {/* Scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-[0.015]" aria-hidden>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(52,211,153,0.8)", animation: "scanline 8s linear infinite" }} />
      </div>

      <div className="relative z-10 space-y-28">

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative -mt-10 overflow-hidden rounded-[2.5rem] p-8 sm:p-20"
          style={{ background: "radial-gradient(ellipse at top left, rgba(16,185,129,0.12) 0%, transparent 60%), radial-gradient(ellipse at bottom right, rgba(6,182,212,0.08) 0%, transparent 60%), linear-gradient(135deg, #0d1a14 0%, #0a0a0a 50%, #0d1520 100%)", border: "1px solid rgba(52,211,153,0.2)", animation: "borderGlow 4s ease-in-out infinite" }}>

          {/* Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden
            style={{ backgroundImage: "linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(to right, rgba(52,211,153,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          {/* Blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-[100px] animate-pulse" />
            <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
            <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-400/8 blur-[80px] animate-pulse" style={{ animationDelay: "3s" }} />
          </div>

          {/* Decorative circles */}
          <div className="pointer-events-none absolute right-16 top-16 h-48 w-48 rounded-full border border-emerald-500/10" style={{ animation: "pulseRing 4s ease-out infinite" }} />
          <div className="pointer-events-none absolute right-16 top-16 h-48 w-48 rounded-full border border-cyan-500/10" style={{ animation: "pulseRing 4s ease-out infinite", animationDelay: "2s" }} />

          <div className="relative">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-xs font-semibold tracking-widest text-emerald-300 uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(52,211,153,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Built for Practical Delivery
            </div>

            {/* Heading */}
            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
              style={{ fontFamily: "'Orbitron', monospace" }}>
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Bridging Ideas to{" "}</span>
              <span className="shimmer-text">Real-World Technology</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              EcoBridges is a project-based technology team building IoT systems, web platforms,
              mobile applications, and cloud solutions using a fast, reliable, and scalable tech stack.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
              We act as the bridge between your idea and a working, deployable product — from concept to execution.
            </p>

            {/* Tech pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary group inline-flex items-center justify-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-bold text-white">
                Start a Project
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/services" className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                View Our Work
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} delay={i * 120} />
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────────── */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute inset-y-0 left-0 w-32 z-10" style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-32 z-10" style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }} />
          <div className="marquee-track gap-8">
            {[...techStack, ...techStack, ...techStack, ...techStack].map((t, i) => (
              <span key={i} className="tech-pill mx-3 whitespace-nowrap">{t}</span>
            ))}
          </div>
        </div>

        {/* ── WHY ECOBRIDGES ───────────────────────────────────── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4">
              <Badge color="emerald">Why Choose Us</Badge>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Orbitron', monospace" }}>
                Why EcoBridges?
              </h2>
              <p className="max-w-2xl text-lg text-zinc-400">
                Practical, scalable, and maintainable systems — built by people who care about real results.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChoose.map((item, idx) => (
              <Reveal key={item.text} delay={idx * 80}>
                <div data-hover className="card-glass group relative overflow-hidden rounded-2xl p-6">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/15 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:from-emerald-500/25" />
                  <div className="relative flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                      style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-bold text-emerald-500/60 tracking-widest">0{idx + 1}</div>
                      <p className="text-sm leading-relaxed text-zinc-300">{item.text}</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── WHAT WE BUILD ────────────────────────────────────── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4">
              <Badge color="cyan">Core Expertise</Badge>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Orbitron', monospace" }}>
                What We Build
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {highlights.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div data-hover className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_0_60px_rgba(52,211,153,0.12)]`}
                  style={{ background: `linear-gradient(135deg, rgba(10,10,10,0.9), rgba(10,10,10,0.6))`, border: "1px solid rgba(255,255,255,0.08)" }}>

                  {/* Big icon bg */}
                  <div className="absolute -right-8 -top-8 text-[8rem] opacity-[0.06] transition-all duration-500 group-hover:opacity-[0.12] group-hover:scale-110 select-none">
                    {item.icon}
                  </div>

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                      {item.icon}
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700 group-hover:w-full rounded-b-3xl" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SYSTEM FLOW ──────────────────────────────────────── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-14"
            style={{ background: "linear-gradient(135deg, rgba(10,26,20,0.9), rgba(10,10,10,0.95), rgba(10,21,32,0.9))", border: "1px solid rgba(52,211,153,0.15)" }}>

            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/8 blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px]" />
            </div>

            <div className="relative space-y-3 text-center">
              <Badge color="emerald">Full-Stack Integration</Badge>
              <h3 className="text-3xl font-bold text-white" style={{ fontFamily: "'Orbitron', monospace" }}>
                From Device to Dashboard
              </h3>
              <p className="text-sm text-zinc-500 tracking-widest">HARDWARE • FIRMWARE • API • CLOUD • UI</p>
            </div>

            <div className="relative mt-12 grid gap-4 sm:grid-cols-5">
              {[
                { label: "Device", icon: "📟", desc: "Sensor / MCU" },
                { label: "Gateway", icon: "📡", desc: "Edge / Bridge" },
                { label: "API", icon: "⚙️", desc: "REST / MQTT" },
                { label: "Cloud", icon: "☁️", desc: "Store / Process" },
                { label: "Dashboard", icon: "📊", desc: "Monitor / Control" },
              ].map((node, idx) => (
                <div key={node.label} className="node-item relative flex flex-col items-center gap-3 text-center">
                  <div className="node-circle relative flex h-20 w-20 flex-col items-center justify-center rounded-2xl"
                    style={{ background: "rgba(52,211,153,0.06)", border: "2px solid rgba(52,211,153,0.25)", backdropFilter: "blur(8px)" }}>
                    <span className="text-2xl">{node.icon}</span>
                    <span className="mt-0.5 text-xs font-bold text-emerald-400">{idx + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{node.label}</div>
                    <div className="text-xs text-zinc-500">{node.desc}</div>
                  </div>
                  {idx < 4 && (
                    <div className="absolute left-[calc(50%+42px)] top-10 hidden h-0.5 w-[calc(100%-20px)] sm:block"
                      style={{ background: "linear-gradient(to right, rgba(52,211,153,0.6), rgba(6,182,212,0.2))" }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-cyan-400/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── PROCESS ──────────────────────────────────────────── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4">
              <Badge color="cyan">Our Workflow</Badge>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "'Orbitron', monospace" }}>
                How We Work
              </h2>
              <p className="max-w-2xl text-lg text-zinc-400">
                A structured, transparent workflow for clarity, speed, and reliability.
              </p>
            </div>
          </Reveal>

          <div className="relative space-y-3">
            {/* Vertical line */}
            <div className="pointer-events-none absolute left-[39px] top-8 bottom-8 w-px hidden sm:block"
              style={{ background: "linear-gradient(to bottom, rgba(52,211,153,0.5), rgba(6,182,212,0.2), transparent)" }} />

            {processSteps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 100}>
                <div data-hover className="process-card group relative overflow-hidden rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-6">
                    {/* Step icon */}
                    <div className="relative flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                      style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                      <span className="text-2xl">{step.icon}</span>
                      <span className="text-xs font-bold text-emerald-400/60 mt-0.5">{step.num}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{step.desc}</p>
                    </div>
                    <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-600 transition-all duration-300 group-hover:border-emerald-500/40 group-hover:text-emerald-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PROVEN WORK ──────────────────────────────────────── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center"
            style={{ background: "radial-gradient(ellipse at top, rgba(52,211,153,0.08) 0%, transparent 70%), radial-gradient(ellipse at bottom, rgba(6,182,212,0.06) 0%, transparent 70%), #0d0d0d", border: "1px solid rgba(52,211,153,0.15)" }}>

            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px] animate-pulse" />
              <div className="absolute left-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            <div className="relative space-y-6">
              <Badge color="emerald">Track Record</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: "'Orbitron', monospace" }}>
                Proven Work, Real Results
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
                Over the past year, our team has successfully completed{" "}
                <span className="font-bold text-emerald-400 shimmer-text">5+ combined projects</span>{" "}
                across IoT, industrial monitoring, automation, and full-stack application development.
              </p>

              <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {["Real-time monitoring", "Hardware-cloud integration", "Scalable architecture", "Practical deployment"].map((focus, i) => (
                  <div key={focus} data-hover className="rounded-2xl p-4 text-xs font-medium text-zinc-300 transition-all duration-300 hover:border-emerald-500/40 hover:text-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="mb-2 text-lg">{["📡", "🔗", "📐", "🚀"][i]}</div>
                    {focus}
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/services" data-hover
                  className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-7 py-3.5 text-sm font-bold text-emerald-400 backdrop-blur-sm transition-all duration-300 hover:bg-emerald-500/20 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]">
                  View All Projects
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── WHO WE WORK WITH ─────────────────────────────────── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4 text-center">
              <Badge color="cyan">Our Clients</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl" style={{ fontFamily: "'Orbitron', monospace" }}>
                Who We Work With
              </h2>
              <p className="mx-auto max-w-xl text-lg text-zinc-400">
                Project-based services and product-oriented development for:
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientTypes.map((c, idx) => (
              <Reveal key={c.type} delay={idx * 80}>
                <div data-hover className="card-glass group relative overflow-hidden rounded-2xl p-7 text-center">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.1), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                      {c.icon}
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">{c.type}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-20 text-center"
            style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.98), rgba(10,26,20,0.9), rgba(10,21,32,0.95))", border: "1px solid rgba(52,211,153,0.2)" }}>

            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
              <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
              <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: "linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(to right, rgba(52,211,153,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            <div className="relative space-y-6">
              <h2 className="text-4xl font-bold text-white sm:text-6xl" style={{ fontFamily: "'Orbitron', monospace" }}>
                Have an Idea or<br />
                <span className="shimmer-text">Problem to Solve?</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
                Whether it's an IoT system, a web platform, a mobile app, or a complete end-to-end
                solution — <span className="font-bold text-emerald-400">EcoBridges is ready to build it with you.</span>
              </p>
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" data-hover
                  className="btn-primary inline-flex items-center justify-center gap-3 rounded-2xl px-10 py-5 text-base font-bold text-white">
                  Contact EcoBridges
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
                <Link href="/services" data-hover
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/25">
                  See Our Work
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

      </div>
    </>
  );
}