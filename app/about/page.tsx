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
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cx - 20}px, ${cy - 20}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onEnter = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,[data-hover]")) setHovered(true); };
    const onLeave = (e: Event) => { if ((e.target as HTMLElement).closest("a,button,[data-hover]")) setHovered(false); };
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
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ willChange: "transform" }}>
        <div className="relative h-10 w-10 rounded-full border border-emerald-400/60 transition-all duration-200"
          style={{ transform: hovered ? "scale(1.8)" : "scale(1)", background: hovered ? "rgba(52,211,153,0.08)" : "transparent", mixBlendMode: "difference" }} />
      </div>
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ willChange: "transform" }}>
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
    </>
  );
}

/* ─── Particles ─────────────────────────────────────────── */
function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="absolute block rounded-full"
          style={{
            width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "rgba(52,211,153,0.5)" : i % 3 === 1 ? "rgba(34,211,238,0.4)" : "rgba(255,255,255,0.2)",
            animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 8}s`,
          }} />
      ))}
    </div>
  );
}

/* ─── Reveal ─────────────────────────────────────────────── */
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

/* ─── Badge ──────────────────────────────────────────────── */
function Badge({ color, children }: { color: "emerald" | "cyan"; children: React.ReactNode }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm
      ${color === "emerald" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.2)]"
        : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.2)]"}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full animate-pulse ${color === "emerald" ? "bg-emerald-400" : "bg-cyan-400"}`} />
      {children}
    </div>
  );
}

export default function AboutPage() {
  const stats = [
    { value: "1+", label: "Year Experience" },
    { value: "5+", label: "Team Projects" },
    { value: "Multi", label: "Featured Works" },
    { value: "One", label: "Optimized Stack" },
  ] as const;

  const services = [
    "IoT & Embedded Systems",
    "Web & Cloud Platforms",
    "Mobile Applications",
    "Monitoring & Automation",
    "AI-assisted Data Insights",
  ] as const;

  const teamSkills = [
    "Embedded systems & IoT",
    "Cloud and backend development",
    "Web & mobile application development",
    "System architecture & integration",
  ] as const;

  const achievements = [
    "Completed 5+ combined team projects",
    "Delivered multiple solo and featured projects",
    "Worked on real-world monitoring, automation, and software systems",
    "Participated in hackathons, research, and innovation programs",
  ] as const;

  const differentiators = [
    { title: "System Design Focus", desc: "Strong emphasis on architecture and planning before development", icon: "🎯" },
    { title: "Optimized Tech Stack", desc: "One proven stack for faster and more stable development", icon: "⚡" },
    { title: "Parallel Development", desc: "Hardware and software built simultaneously to save time", icon: "🔄" },
    { title: "Transparent Communication", desc: "Clear documentation and regular progress updates", icon: "💬" },
    { title: "Budget-Conscious", desc: "Smart planning that delivers quality within budget constraints", icon: "💰" },
    { title: "Working Systems", desc: "We deliver complete, functional solutions, not just code", icon: "✅" },
  ] as const;

  const values = [
    { icon: "🎯", title: "Clarity", desc: "Clear requirements and communication at every step" },
    { icon: "🛡️", title: "Reliability", desc: "Systems that work as expected in real environments" },
    { icon: "⚡", title: "Efficiency", desc: "Smart use of time, tools, and resources" },
    { icon: "🤝", title: "Collaboration", desc: "Working closely with clients and partners" },
    { icon: "📈", title: "Growth", desc: "Continuous learning and improvement" },
  ] as const;

  const visionPoints = [
    "Solves real problems",
    "Works reliably in real environments",
    "Scales with future needs",
    "Remains budget-friendly and maintainable",
  ] as const;

  return (
    <>
      <CustomCursor />
      <Particles />

      {/* Scanline */}
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
            <Badge color="emerald">About Us</Badge>
            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Building the Bridge Between{" "}</span>
              <span className="shimmer-text">Ideas and Technology</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
              EcoBridges is a project-based technology team focused on designing and developing IoT systems,
              software platforms, and cloud-connected applications that solve real-world problems.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500">
              We work at the intersection of hardware, software, and data, helping ideas move from concept to functional, deployable solutions.
            </p>
            <div className="mt-8 rounded-2xl p-6"
              style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.2)" }}>
              <p className="text-sm leading-relaxed text-zinc-300">
                Our team believes that technology should be{" "}
                <span className="text-emerald-400 font-semibold">practical</span>,{" "}
                <span className="text-emerald-400 font-semibold">scalable</span>, and{" "}
                <span className="text-emerald-400 font-semibold">accessible</span> — not over-complicated or out of reach.
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div data-hover className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/20 group-hover:scale-150" />
                <div className="relative">
                  <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-xs font-medium text-zinc-400 sm:text-sm">{stat.label}</div>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </section>

        {/* ── WHY ECOBRIDGES ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-14"
            style={{ background: "linear-gradient(135deg, rgba(10,26,20,0.9), rgba(10,10,10,0.95), rgba(10,21,32,0.9))", border: "1px solid rgba(52,211,153,0.15)" }}>
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/8 blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px]" />
            </div>
            <div className="relative text-center space-y-3">
              <Badge color="emerald">The Name</Badge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Why EcoBridges?</h2>
              <p className="text-zinc-500 text-sm tracking-widest">THE IDEA BEHIND THE NAME</p>
            </div>
            <div className="relative mt-12 grid gap-6 lg:grid-cols-2">
              {[
                { emoji: "🌱", title: "Eco", color: "emerald", desc: "Smart, efficient, and sustainable use of technology" },
                { emoji: "🌉", title: "Bridges", color: "cyan", desc: "Connecting ideas, systems, and people through technology" },
              ].map((item) => (
                <div key={item.title} data-hover className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-500"
                  style={{ background: `rgba(${item.color === "emerald" ? "52,211,153" : "34,211,238"},0.04)`, border: `1px solid rgba(${item.color === "emerald" ? "52,211,153" : "34,211,238"},0.2)` }}>
                  <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150"
                    style={{ background: `rgba(${item.color === "emerald" ? "52,211,153" : "34,211,238"},0.08)` }} />
                  <div className="relative">
                    <div className="text-5xl">{item.emoji}</div>
                    <h3 className="mt-5 text-2xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
            <div className="relative mt-8 text-center">
              <p className="text-sm leading-relaxed text-zinc-300">
                We act as the{" "}
                <span className="text-emerald-400 font-semibold">bridge between vision and execution</span>,
                ensuring that every project moves smoothly from idea to reality.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ── OUR VISION ── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4">
              <Badge color="cyan">Our Vision</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Technology That Makes Sense</h2>
              <p className="text-zinc-400 text-lg">Our vision is to build technology that:</p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {visionPoints.map((point, idx) => (
              <Reveal key={point} delay={idx * 80}>
                <div data-hover className="group flex items-center gap-4 rounded-2xl p-6 transition-all duration-400"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                    <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300 group-hover:text-white transition-colors">{point}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.15)" }}>
              <p className="text-xs leading-relaxed text-zinc-400">
                We aim to contribute toward smarter systems, better monitoring, and efficient automation across industries and institutions.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── WHAT WE DO ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="space-y-4">
              <Badge color="emerald">What We Do</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Our Services</h2>
              <p className="text-zinc-400">We provide project-based services and product-oriented development in:</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <div key={service} data-hover
                  className="group relative overflow-hidden rounded-xl p-5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-emerald-300"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                  <span className="mr-2 text-emerald-500/60 font-bold text-xs">0{idx + 1}</span>
                  {service}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl p-6"
              style={{ background: "rgba(34,211,238,0.04)", border: "1px solid rgba(34,211,238,0.15)" }}>
              <p className="text-sm leading-relaxed text-zinc-300">
                💡 Our strength lies in{" "}
                <span className="text-cyan-400 font-semibold">end-to-end system development</span>,
                where hardware, software, and cloud components work together seamlessly.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ── OUR TEAM ── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4 text-center">
              <Badge color="cyan">The Team</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Our Team</h2>
              <p className="text-zinc-400 text-lg">A Collaborative, Multi-Disciplinary Team</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
              style={{ background: "linear-gradient(135deg, rgba(10,26,20,0.9), rgba(10,10,10,0.95))", border: "1px solid rgba(52,211,153,0.12)" }}>
              <p className="text-center text-sm leading-relaxed text-zinc-400">
                EcoBridges is powered by a team of recent graduates and final-year engineers with hands-on experience in:
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {teamSkills.map((skill, idx) => (
                  <div key={skill} data-hover className="group flex items-start gap-4 rounded-2xl p-5 transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                      <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-300 group-hover:text-white transition-colors">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── OUR EXPERIENCE ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
            style={{ background: "radial-gradient(ellipse at top, rgba(52,211,153,0.07) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(6,182,212,0.05) 0%, transparent 60%), #0d0d0d", border: "1px solid rgba(52,211,153,0.15)" }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px] animate-pulse" />
              <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>
            <div className="relative text-center space-y-3 mb-12">
              <Badge color="emerald">Track Record</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Our Experience</h2>
              <p className="text-emerald-400 text-sm tracking-widest font-semibold">LEARNING BY BUILDING</p>
              <p className="text-zinc-400 text-sm">Over the past year, our team has:</p>
            </div>
            <div className="relative grid gap-4 sm:grid-cols-2">
              {achievements.map((achievement, idx) => (
                <div key={achievement} data-hover
                  className="group flex items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-emerald-400"
                    style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                    {idx + 1}
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-300 group-hover:text-white transition-colors">{achievement}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-8 rounded-2xl p-6 text-center"
              style={{ background: "rgba(52,211,153,0.04)", border: "1px solid rgba(52,211,153,0.15)" }}>
              <p className="text-sm font-medium leading-relaxed text-zinc-300">
                Our experience comes from{" "}
                <span className="text-emerald-400 font-semibold">building, testing, and deploying real systems</span>,
                not just theoretical knowledge.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ── HOW WE DIFFER ── */}
        <section className="space-y-10">
          <Reveal>
            <div className="space-y-4">
              <Badge color="cyan">Differentiators</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">How We Differ</h2>
              <p className="text-zinc-400 text-lg">What Sets Us Apart</p>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 80}>
                <div data-hover className="card-glass group relative overflow-hidden rounded-2xl p-6">
                  <div className="absolute -right-8 -top-8 text-7xl opacity-[0.04] transition-all group-hover:scale-110 group-hover:opacity-[0.08] select-none">
                    {item.icon}
                  </div>
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/8 blur-2xl transition-all duration-500 group-hover:bg-emerald-500/15 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mb-1 text-xs font-bold text-emerald-500/50 tracking-widest">0{idx + 1}</div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl mb-4"
                      style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}>
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{item.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(34,211,238,0.04)", border: "1px solid rgba(34,211,238,0.2)" }}>
              <p className="text-base font-semibold text-white">
                We don't just deliver code —{" "}
                <span className="text-cyan-400">we deliver working systems</span>.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── OUR VALUES ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
            style={{ background: "linear-gradient(135deg, rgba(10,10,10,0.98), rgba(10,26,20,0.9), rgba(10,21,32,0.95))", border: "1px solid rgba(52,211,153,0.15)" }}>
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
              <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/8 blur-[100px] animate-pulse" />
              <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/6 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
            </div>
            <div className="relative text-center space-y-4 mb-12">
              <Badge color="emerald">Core Values</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Our Values</h2>
            </div>
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {values.map((value, idx) => (
                <div key={value.title} data-hover
                  className="group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.12)]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/8 blur-2xl transition-all group-hover:bg-emerald-500/15 group-hover:scale-150" />
                  <div className="relative">
                    <div className="text-4xl">{value.icon}</div>
                    <h3 className="mt-4 text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{value.title}</h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{value.desc}</p>
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
            </div>
            <div className="relative space-y-6">
              <h2 className="text-4xl font-bold text-white sm:text-6xl">
                Let's Build <span className="shimmer-text">Together</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
                Whether you are an innovator, startup, institution, or organization,
                EcoBridges is ready to collaborate and build meaningful technology solutions.
              </p>
              <p className="text-sm font-bold tracking-widest text-emerald-400 uppercase">From Idea to Impact</p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" data-hover
                  className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white">
                  Contact EcoBridges
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
                <Link href="/services" data-hover
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                  See Our Services
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
