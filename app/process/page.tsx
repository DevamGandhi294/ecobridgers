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

type ProcessStep = {
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly details: readonly string[];
  readonly outcome: string;
  readonly icon: string;
  readonly color: "emerald" | "cyan";
  readonly optional: boolean;
};

export default function ProcessPage() {
  const processSteps = [
    {
      number: "01",
      title: "Discussion & Problem Understanding",
      subtitle: "Understanding Before Building",
      description: "Every successful system starts with clarity.",
      details: [
        "Detailed discussion of the idea or problem",
        "Understanding functional and technical requirements",
        "Identifying constraints (budget, timeline, environment)",
        "Defining success criteria and expectations",
      ],
      outcome: "This step ensures that we solve the right problem, not just build technology.",
      icon: "💬",
      color: "emerald",
      optional: false,
    },
    {
      number: "02",
      title: "System Architecture & Design",
      subtitle: "Planning the Complete System",
      description: "Before development begins, we design the complete system architecture.",
      details: [
        "Hardware block diagrams",
        "System flow & data flow diagrams",
        "Cloud architecture planning",
        "Technology and communication protocol selection",
        "Scalability and reliability considerations",
      ],
      outcome: "A strong design phase reduces rework and ensures smooth execution.",
      icon: "🏗️",
      color: "cyan",
      optional: false,
    },
    {
      number: "03",
      title: "Parallel Development",
      subtitle: "Hardware, Software & Cloud – Together",
      description: "To optimize timelines, we work in parallel:",
      details: [
        "Hardware development & sensor integration",
        "Cloud backend & database setup",
        "Web and mobile application development",
        "API and communication layer implementation",
      ],
      outcome: "This approach allows faster delivery while maintaining alignment across all components.",
      icon: "⚡",
      color: "emerald",
      optional: false,
    },
    {
      number: "04",
      title: "Integration & Testing",
      subtitle: "Making Everything Work Together",
      description: "Once development is complete, we focus on integration and testing.",
      details: [
        "End-to-end system integration",
        "Real-world environment testing",
        "Performance optimization",
        "Bug fixing and reliability checks",
        "Iterative improvements based on test results",
      ],
      outcome: "Testing ensures the system is stable, accurate, and ready for deployment.",
      icon: "🔬",
      color: "cyan",
      optional: false,
    },
    {
      number: "05",
      title: "Deployment & Handover",
      subtitle: "From Development to Real-World Use",
      description: "After successful testing, we move to deployment.",
      details: [
        "Final system deployment",
        "Configuration and setup",
        "Documentation and usage guidance",
        "Knowledge transfer and basic training (if required)",
      ],
      outcome: "Our goal is to deliver a solution that is easy to use and maintain.",
      icon: "🚀",
      color: "emerald",
      optional: false,
    },
    {
      number: "06",
      title: "Support & Iteration",
      subtitle: "Continuous Improvement",
      description: "For long-term or evolving projects, we provide:",
      details: [
        "Post-deployment support",
        "Feature enhancements",
        "Performance improvements",
        "System scaling and upgrades",
      ],
      outcome: "We believe good systems evolve over time.",
      icon: "🔄",
      color: "cyan",
      optional: true,
    },
  ] satisfies readonly ProcessStep[];

  const whyItWorks = [
    "Clear communication at every stage",
    "Reduced development risk",
    "Faster delivery through parallel execution",
    "Practical, real-world testing",
    "Transparent progress and outcomes",
  ] as const;

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
          {/* Decorative pulse rings */}
          <div className="pointer-events-none absolute right-16 top-16 h-48 w-48 rounded-full border border-emerald-500/10" style={{ animation: "pulseRing 4s ease-out infinite" }} />
          <div className="pointer-events-none absolute right-16 top-16 h-48 w-48 rounded-full border border-cyan-500/10" style={{ animation: "pulseRing 4s ease-out infinite", animationDelay: "2s" }} />

          <div className="relative">
            <Badge color="emerald">Our Process</Badge>
            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <span style={{ color: "rgba(255,255,255,0.9)" }}>A Structured Approach from{" "}</span>
              <span className="shimmer-text">Idea to Deployment</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
              At EcoBridges, we follow a clear, transparent, and systematic development process to ensure
              that every project is delivered efficiently, reliably, and aligned with real-world requirements.
            </p>
            <p className="mt-3 text-sm font-bold tracking-widest text-emerald-400 uppercase">
              Our process bridges the gap between ideas, engineering, and deployment.
            </p>
          </div>
        </section>

        {/* ── QUICK OVERVIEW ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-14"
            style={{ background: "linear-gradient(135deg, rgba(10,26,20,0.9), rgba(10,10,10,0.95), rgba(10,21,32,0.9))", border: "1px solid rgba(52,211,153,0.15)" }}>
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/8 blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px]" />
            </div>
            <div className="relative space-y-3 text-center mb-12">
              <Badge color="cyan">Overview</Badge>
              <h3 className="text-3xl font-bold text-white">The 6-Step Process</h3>
              <p className="text-sm text-zinc-500 tracking-widest">DISCUSS • DESIGN • BUILD • TEST • DEPLOY • SUPPORT</p>
            </div>
            <div className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {processSteps.map((step, idx) => (
                <div key={step.number} className="node-item relative flex flex-col items-center gap-3 text-center">
                  <div className="node-circle relative flex h-20 w-20 flex-col items-center justify-center rounded-2xl"
                    style={{ background: "rgba(52,211,153,0.06)", border: `2px solid rgba(${step.color === "emerald" ? "52,211,153" : "34,211,238"},0.25)`, backdropFilter: "blur(8px)" }}>
                    <span className="text-2xl">{step.icon}</span>
                    <span className="mt-0.5 text-xs font-bold text-emerald-400">{step.number}</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{step.title.split(" ")[0]}</div>
                    <div className="text-[11px] text-zinc-500">{step.subtitle.split(" ").slice(0, 2).join(" ")}</div>
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="absolute left-[calc(50%+42px)] top-10 hidden h-0.5 w-[calc(100%-20px)] lg:block"
                      style={{ background: "linear-gradient(to right, rgba(52,211,153,0.5), rgba(6,182,212,0.15))" }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-cyan-400/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── PROCESS STEPS ── */}
        <section className="space-y-8">
          <Reveal>
            <div className="space-y-4">
              <Badge color="emerald">Detailed Breakdown</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Step by Step</h2>
              <p className="text-zinc-400 text-lg">From concept to reality, one step at a time</p>
            </div>
          </Reveal>

          <div className="relative space-y-4">
            {/* Vertical line */}
            <div className="pointer-events-none absolute left-[39px] top-8 bottom-8 w-px hidden sm:block"
              style={{ background: "linear-gradient(to bottom, rgba(52,211,153,0.5), rgba(6,182,212,0.2), transparent)" }} />

            {processSteps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 60}>
                <div data-hover className="process-card group relative overflow-hidden rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>

                  {step.optional && (
                    <div className="absolute right-4 top-4 z-10 rounded-lg px-2 py-1 text-[11px] font-bold tracking-widest"
                      style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.25)", color: "#67e8f9" }}>
                      Optional
                    </div>
                  )}

                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color === "emerald" ? "from-emerald-500/5 to-transparent" : "from-cyan-500/5 to-transparent"} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:gap-8 sm:p-8">
                    {/* Icon */}
                    <div className="relative flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, rgba(${step.color === "emerald" ? "52,211,153" : "34,211,238"},0.12), rgba(6,182,212,0.08))`, border: `1px solid rgba(${step.color === "emerald" ? "52,211,153" : "34,211,238"},0.25)` }}>
                      <span className="text-2xl">{step.icon}</span>
                      <span className="mt-0.5 text-xs font-bold text-emerald-400/70">{step.number}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 grid gap-6 lg:grid-cols-3">
                      {/* Left */}
                      <div className="lg:col-span-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">{step.title}</h3>
                        <p className="mt-1 text-xs font-bold tracking-widest text-emerald-400/70 uppercase">{step.subtitle}</p>
                        <p className="mt-3 text-xs leading-relaxed text-zinc-400">{step.description}</p>
                      </div>

                      {/* Details */}
                      <div className="lg:col-span-1">
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400">Details:</h4>
                        <ul className="space-y-2">
                          {step.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-2 text-xs text-zinc-400">
                              <span className={`mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full ${step.color === "emerald" ? "bg-emerald-400" : "bg-cyan-400"}`} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcome */}
                      <div className="lg:col-span-1">
                        <div className="rounded-xl p-4"
                          style={{ background: `rgba(${step.color === "emerald" ? "52,211,153" : "34,211,238"},0.04)`, border: `1px solid rgba(${step.color === "emerald" ? "52,211,153" : "34,211,238"},0.15)` }}>
                          <p className="text-xs font-bold tracking-widest mb-2 uppercase"
                            style={{ color: step.color === "emerald" ? "#34d399" : "#22d3ee" }}>
                            Outcome
                          </p>
                          <p className="text-xs leading-relaxed text-zinc-300">💡 {step.outcome}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-700 group-hover:w-full ${step.color === "emerald" ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-gradient-to-r from-cyan-500 to-emerald-500"}`} />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── WHY IT WORKS ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-14"
            style={{ background: "radial-gradient(ellipse at top, rgba(52,211,153,0.07) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(6,182,212,0.05) 0%, transparent 60%), #0d0d0d", border: "1px solid rgba(52,211,153,0.15)" }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px] animate-pulse" />
              <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>
            <div className="relative text-center space-y-4 mb-12">
              <Badge color="emerald">Why It Works</Badge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Why Our Process Works</h2>
            </div>
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {whyItWorks.map((reason, idx) => (
                <div key={reason} data-hover
                  className="group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.12)]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/8 blur-2xl transition-all group-hover:bg-emerald-500/15 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                      <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium leading-relaxed text-zinc-300 group-hover:text-white transition-colors">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── CTA ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-20 text-center"
            style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.98), rgba(10,26,20,0.9), rgba(10,21,32,0.95))", border: "1px solid rgba(52,211,153,0.2)" }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute -left-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
              <div className="absolute -right-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
              <div className="absolute inset-0 opacity-[0.02]"
                style={{ backgroundImage: "linear-gradient(rgba(52,211,153,1) 1px, transparent 1px), linear-gradient(to right, rgba(52,211,153,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>
            <div className="relative space-y-6">
              <h2 className="text-4xl font-bold text-white sm:text-6xl">
                Let's Start with a{" "}
                <span className="shimmer-text">Discussion</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
                Every project begins with a conversation. Have an idea, requirement, or challenge?
                Let's discuss it and design the right solution together.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" data-hover
                  className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white">
                  Start a Project
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/services" data-hover
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                  View Our Services
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

      </div>
    </>
  );
}
