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

export default function ServicesPage() {
  const mainServices = [
    {
      icon: "🔌",
      title: "IoT & Embedded Systems",
      subtitle: "Smart Hardware Integrated with Cloud Intelligence",
      description: "We design and develop complete IoT systems — from sensor-level integration to real-time cloud monitoring.",
      offerings: [
        "Sensor integration (temperature, vibration, energy, motion, etc.)",
        "Microcontroller-based systems (ESP32, ESP8266, Arduino, Raspberry Pi)",
        "Real-time data acquisition & control",
        "Wi-Fi, GSM, LoRa, MQTT-based communication",
        "Edge processing and local decision-making",
        "Secure cloud connectivity",
      ],
      useCases: ["Smart monitoring systems", "Automation & control solutions", "Industrial equipment monitoring", "Environmental & infrastructure monitoring"],
      color: "emerald",
      gradient: "from-emerald-500/20 to-teal-500/10",
    },
    {
      icon: "🌐",
      title: "Web & Cloud Development",
      subtitle: "Scalable Platforms for Monitoring, Control & Analytics",
      description: "We build secure and scalable web platforms that act as the control center for IoT systems and software applications.",
      offerings: [
        "Admin dashboards & control panels",
        "Real-time data visualization",
        "Cloud backend architecture",
        "Database design (Firebase, SQL-based systems)",
        "REST APIs & real-time communication",
        "User authentication & role management",
      ],
      useCases: ["IoT dashboards", "Monitoring portals", "Data logging & reporting systems", "Management interfaces"],
      color: "cyan",
      gradient: "from-cyan-500/20 to-blue-500/10",
    },
    {
      icon: "📱",
      title: "Mobile Application Development",
      subtitle: "Smart Apps That Connect Users to Systems",
      description: "We develop cross-platform mobile applications that allow users to monitor, control, and analyze systems in real time.",
      offerings: [
        "Flutter-based Android & iOS apps",
        "Real-time device control",
        "Live data monitoring & alerts",
        "Secure user authentication",
        "Integration with cloud & IoT backends",
        "Clean and intuitive UI/UX",
      ],
      useCases: ["IoT control apps", "Monitoring & alert systems", "Industrial companion apps", "Custom business applications"],
      color: "emerald",
      gradient: "from-violet-500/20 to-purple-500/10",
    },
    {
      icon: "🧠",
      title: "AI-Assisted & Data-Driven Solutions",
      subtitle: "Intelligent Insights from Real-Time Data",
      description: "We apply introductory AI/ML techniques to enhance monitoring systems with smarter insights and automation.",
      offerings: [
        "Data analysis & trend detection",
        "Predictive indicators (early fault signals)",
        "Rule-based & ML-assisted automation",
        "Basic forecasting models",
        "Intelligent alerts & recommendations",
      ],
      useCases: ["Predictive maintenance (basic)", "Anomaly detection", "Smart analytics dashboards", "Data-driven decision support"],
      color: "cyan",
      gradient: "from-amber-500/20 to-orange-500/10",
    },
  ] as const;

  const additionalServices = [
    {
      icon: "🧪",
      title: "Prototyping & POC Development",
      subtitle: "From Idea to Working Prototype",
      description: "We specialize in rapid prototyping and proof-of-concept (POC) development for validation, demos, and research.",
      offerings: ["Hackathon & competition prototypes", "Startup MVPs", "College & research projects", "Functional demos with documentation", "Hardware-software integration"],
      useCases: ["Idea validation", "Grant & funding demos", "Research & experimentation", "Early-stage product development"],
    },
    {
      icon: "🏭",
      title: "Industrial & Custom Solutions",
      subtitle: "Tailored Systems for Specific Requirements",
      description: "Every problem is different — we build custom solutions based on your exact needs.",
      offerings: ["Requirement-based system design", "Custom hardware-software architecture", "Industrial monitoring & automation", "Long-term scalability planning", "Documentation & deployment support"],
      useCases: [],
    },
  ] as const;

  const serviceApproach = [
    "Clear requirement discussion",
    "System architecture planning",
    "Parallel hardware & software development",
    "Real-world testing & optimization",
    "Deployment & knowledge transfer",
  ] as const;

  const deliverables = [
    "Architecture + data flow + threat model basics",
    "Device provisioning + telemetry + monitoring",
    "Admin dashboard + analytics + role-based access",
    "Deployment runbooks + handover documentation",
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
          <div className="relative">
            <Badge color="emerald">Our Services</Badge>
            <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <span style={{ color: "rgba(255,255,255,0.9)" }}>Technology Solutions Built for{" "}</span>
              <span className="shimmer-text">Real-World Use</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
              EcoBridges provides end-to-end project-based services and product-oriented development
              across IoT, software, and cloud technologies.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
              Our services are suitable for startups, institutions, industries, and innovators looking for practical and deployable solutions.
            </p>
          </div>
        </section>

        {/* ── MAIN SERVICES ── */}
        <section className="space-y-8">
          <Reveal>
            <div className="space-y-4">
              <Badge color="cyan">Core Services</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">What We Build</h2>
            </div>
          </Reveal>

          {mainServices.map((service, idx) => (
            <Reveal key={service.title} delay={idx * 80}>
              <div data-hover className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(52,211,153,0.08)]"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>

                {/* Icon bg watermark */}
                <div className="absolute -right-8 -top-8 text-[10rem] opacity-[0.04] transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110 select-none">
                  {service.icon}
                </div>

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative p-8 sm:p-12">
                  <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left - header */}
                    <div className="lg:col-span-1">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                        {service.icon}
                      </div>
                      <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl group-hover:text-emerald-300 transition-colors">{service.title}</h2>
                      <p className="mt-2 text-xs font-bold tracking-widest text-emerald-400 uppercase">{service.subtitle}</p>
                      <p className="mt-4 text-xs leading-relaxed text-zinc-400">{service.description}</p>
                    </div>

                    {/* Middle - offerings */}
                    <div className="lg:col-span-1">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-300">What we offer:</h3>
                      <ul className="space-y-2.5">
                        {service.offerings.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right - use cases */}
                    <div className="lg:col-span-1">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-300">Use cases:</h3>
                      <div className="space-y-2">
                        {service.useCases.map((uc) => (
                          <div key={uc} className="rounded-xl px-4 py-3 text-xs text-zinc-300 transition-all hover:text-emerald-300"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            {uc}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700 group-hover:w-full rounded-b-3xl" />
              </div>
            </Reveal>
          ))}
        </section>

        {/* ── ADDITIONAL SERVICES ── */}
        <section className="space-y-8">
          <Reveal>
            <div className="space-y-4">
              <Badge color="emerald">Specialized Offerings</Badge>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">Additional Services</h2>
              <p className="text-zinc-400">Specialized offerings for specific needs</p>
            </div>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {additionalServices.map((service, idx) => (
              <Reveal key={service.title} delay={idx * 100}>
                <div data-hover className="card-glass group relative overflow-hidden rounded-2xl p-8">
                  <div className="absolute -right-8 -top-8 text-8xl opacity-[0.04] transition-all group-hover:scale-110 group-hover:opacity-[0.08] select-none">
                    {service.icon}
                  </div>
                  <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-cyan-500/8 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/15 group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {service.icon}
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                    <p className="mt-1 text-xs font-bold tracking-widest text-cyan-400 uppercase">{service.subtitle}</p>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400">{service.description}</p>
                    <div className="mt-6">
                      <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-300">What we offer:</h4>
                      <ul className="space-y-2">
                        {service.offerings.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {service.useCases.length > 0 && (
                      <div className="mt-6">
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-300">Use cases:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.useCases.map((uc) => (
                            <div key={uc} className="rounded-lg px-3 py-1.5 text-[11px] text-zinc-400"
                              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                              {uc}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-700 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SERVICE APPROACH ── */}
        <Reveal>
          <section className="relative overflow-hidden rounded-3xl p-8 sm:p-14"
            style={{ background: "linear-gradient(135deg, rgba(10,26,20,0.9), rgba(10,10,10,0.95), rgba(10,21,32,0.9))", border: "1px solid rgba(52,211,153,0.15)" }}>
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/8 blur-[80px]" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px]" />
            </div>
            <div className="relative text-center space-y-4 mb-12">
              <Badge color="emerald">Our Process</Badge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Service Approach</h2>
              <p className="text-zinc-400">How We Deliver Value</p>
            </div>
            <div className="relative mt-8 grid gap-4 sm:grid-cols-5">
              {serviceApproach.map((step, idx) => (
                <div key={step} data-hover
                  className="group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/8 blur-2xl transition-all group-hover:bg-emerald-500/15 group-hover:scale-150" />
                  <div className="relative">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-emerald-400"
                      style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(6,182,212,0.1))", border: "1px solid rgba(52,211,153,0.2)" }}>
                      {idx + 1}
                    </div>
                    <p className="mt-4 text-xs font-medium leading-relaxed text-zinc-300 group-hover:text-white transition-colors">{step}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="relative mt-8 text-center text-xs text-zinc-500">
              We focus on clarity, communication, and reliability at every stage.
            </p>
          </section>
        </Reveal>

        {/* ── DELIVERABLES ── */}
        <Reveal>
          <section className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="space-y-2 mb-8">
              <Badge color="cyan">Deliverables</Badge>
              <h3 className="text-2xl font-bold text-white mt-4">Typical Deliverables</h3>
              <p className="text-xs text-zinc-500">What you can expect from our engagements</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {deliverables.map((item, idx) => (
                <div key={item} data-hover
                  className="group flex items-start gap-4 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.08)]"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-emerald-400"
                    style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(6,182,212,0.08))", border: "1px solid rgba(52,211,153,0.2)" }}>
                    {idx + 1}
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-300 group-hover:text-white transition-colors">{item}</p>
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
                Let's <span className="shimmer-text">Build Together</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
                Whether you need a complete IoT system, a software platform, or a working prototype,
                EcoBridges is ready to collaborate.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" data-hover
                  className="btn-primary inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold text-white">
                  Start a Project
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/process" data-hover
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                  See Our Process
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
