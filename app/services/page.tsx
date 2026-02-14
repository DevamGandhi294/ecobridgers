import Link from "next/link";

export default function ServicesPage() {
    const mainServices = [
        {
            icon: "🔌",
            title: "IoT & Embedded Systems",
            subtitle: "Smart Hardware Integrated with Cloud Intelligence",
            description:
                "We design and develop complete IoT systems — from sensor-level integration to real-time cloud monitoring.",
            offerings: [
                "Sensor integration (temperature, vibration, energy, motion, etc.)",
                "Microcontroller-based systems (ESP32, ESP8266, Arduino, Raspberry Pi)",
                "Real-time data acquisition & control",
                "Wi-Fi, GSM, LoRa, MQTT-based communication",
                "Edge processing and local decision-making",
                "Secure cloud connectivity",
            ],
            useCases: [
                "Smart monitoring systems",
                "Automation & control solutions",
                "Industrial equipment monitoring",
                "Environmental & infrastructure monitoring",
            ],
            color: "emerald",
        },
        {
            icon: "🌐",
            title: "Web & Cloud Development",
            subtitle: "Scalable Platforms for Monitoring, Control & Analytics",
            description:
                "We build secure and scalable web platforms that act as the control center for IoT systems and software applications.",
            offerings: [
                "Admin dashboards & control panels",
                "Real-time data visualization",
                "Cloud backend architecture",
                "Database design (Firebase, SQL-based systems)",
                "REST APIs & real-time communication",
                "User authentication & role management",
            ],
            useCases: [
                "IoT dashboards",
                "Monitoring portals",
                "Data logging & reporting systems",
                "Management interfaces",
            ],
            color: "cyan",
        },
        {
            icon: "📱",
            title: "Mobile Application Development",
            subtitle: "Smart Apps That Connect Users to Systems",
            description:
                "We develop cross-platform mobile applications that allow users to monitor, control, and analyze systems in real time.",
            offerings: [
                "Flutter-based Android & iOS apps",
                "Real-time device control",
                "Live data monitoring & alerts",
                "Secure user authentication",
                "Integration with cloud & IoT backends",
                "Clean and intuitive UI/UX",
            ],
            useCases: [
                "IoT control apps",
                "Monitoring & alert systems",
                "Industrial companion apps",
                "Custom business applications",
            ],
            color: "emerald",
        },
        {
            icon: "🧠",
            title: "AI-Assisted & Data-Driven Solutions",
            subtitle: "Intelligent Insights from Real-Time Data",
            description:
                "We apply introductory AI/ML techniques to enhance monitoring systems with smarter insights and automation.",
            offerings: [
                "Data analysis & trend detection",
                "Predictive indicators (early fault signals)",
                "Rule-based & ML-assisted automation",
                "Basic forecasting models",
                "Intelligent alerts & recommendations",
            ],
            useCases: [
                "Predictive maintenance (basic)",
                "Anomaly detection",
                "Smart analytics dashboards",
                "Data-driven decision support",
            ],
            color: "cyan",
        },
    ] as const;

    const additionalServices = [
        {
            icon: "🧪",
            title: "Prototyping & POC Development",
            subtitle: "From Idea to Working Prototype",
            description:
                "We specialize in rapid prototyping and proof-of-concept (POC) development for validation, demos, and research.",
            offerings: [
                "Hackathon & competition prototypes",
                "Startup MVPs",
                "College & research projects",
                "Functional demos with documentation",
                "Hardware-software integration",
            ],
            useCases: [
                "Idea validation",
                "Grant & funding demos",
                "Research & experimentation",
                "Early-stage product development",
            ],
        },
        {
            icon: "🏭",
            title: "Industrial & Custom Solutions",
            subtitle: "Tailored Systems for Specific Requirements",
            description:
                "Every problem is different — we build custom solutions based on your exact needs.",
            offerings: [
                "Requirement-based system design",
                "Custom hardware-software architecture",
                "Industrial monitoring & automation",
                "Long-term scalability planning",
                "Documentation & deployment support",
            ],
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
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/20 p-8 sm:p-16">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-emerald-500/10 blur-[100px]" />
                    <div className="absolute -right-20 bottom-0 h-72 w-72 animate-pulse rounded-full bg-cyan-500/10 blur-[100px] [animation-delay:1s]" />
                </div>

                <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Our Services
                    </div>

                    <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                        Technology Solutions Built for{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Real-World Use
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                        EcoBridges provides end-to-end project-based services and product-oriented development
                        across IoT, software, and cloud technologies. We focus on building systems that are
                        reliable, scalable, and easy to maintain.
                    </p>

                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
                        Our services are suitable for startups, institutions, industries, and innovators
                        looking for practical and deployable solutions.
                    </p>
                </div>
            </section>

            {/* Main Services - Large Cards */}
            <section className="space-y-8">
                {mainServices.map((service, idx) => (
                    <div
                        key={service.title}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm transition-all hover:border-emerald-500/30"
                    >
                        {/* Background decoration */}
                        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                            <div className={`absolute -right-32 -top-32 h-64 w-64 rounded-full bg-${service.color}-500/5 blur-[100px] transition-all group-hover:scale-150 group-hover:bg-${service.color}-500/10`} />
                        </div>

                        <div className="relative p-8 sm:p-12">
                            <div className="grid gap-8 lg:grid-cols-3">
                                {/* Left Column - Header & Description */}
                                <div className="lg:col-span-1">
                                    <div className="text-6xl">{service.icon}</div>
                                    <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                                        {service.title}
                                    </h2>
                                    <p className="mt-2 text-sm font-medium text-emerald-400">
                                        {service.subtitle}
                                    </p>
                                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Middle Column - What We Offer */}
                                <div className="lg:col-span-1">
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                                        What we offer:
                                    </h3>
                                    <ul className="space-y-2">
                                        {service.offerings.map((offering) => (
                                            <li key={offering} className="flex items-start gap-2 text-sm text-zinc-300">
                                                <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                                <span>{offering}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right Column - Use Cases */}
                                <div className="lg:col-span-1">
                                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
                                        Use cases:
                                    </h3>
                                    <div className="space-y-2">
                                        {service.useCases.map((useCase) => (
                                            <div
                                                key={useCase}
                                                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm"
                                            >
                                                {useCase}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom gradient line */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                        </div>
                    </div>
                ))}
            </section>

            {/* Additional Services - Compact Cards */}
            <section className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Additional Services
                    </h2>
                    <p className="mt-2 text-zinc-400">
                        Specialized offerings for specific needs
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {additionalServices.map((service) => (
                        <div
                            key={service.title}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-zinc-900/80"
                        >
                            <div className="absolute -right-8 -top-8 text-8xl opacity-5 transition-all group-hover:scale-110 group-hover:opacity-10">
                                {service.icon}
                            </div>

                            <div className="relative">
                                <div className="text-5xl">{service.icon}</div>
                                <h3 className="mt-4 text-xl font-bold text-white">{service.title}</h3>
                                <p className="mt-2 text-sm font-medium text-cyan-400">{service.subtitle}</p>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                    {service.description}
                                </p>

                                <div className="mt-6">
                                    <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                                        What we offer:
                                    </h4>
                                    <ul className="space-y-2">
                                        {service.offerings.map((offering) => (
                                            <li key={offering} className="flex items-start gap-2 text-sm text-zinc-300">
                                                <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                                                <span>{offering}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {service.useCases.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                                            Use cases:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {service.useCases.map((useCase) => (
                                                <div
                                                    key={useCase}
                                                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300"
                                                >
                                                    {useCase}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Service Approach */}
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-emerald-950/20 p-8 backdrop-blur-sm sm:p-12">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Our Process
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                        Our Service Approach
                    </h2>
                    <p className="mt-3 text-lg text-zinc-400">How We Deliver Value</p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {serviceApproach.map((step, idx) => (
                        <div
                            key={step}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-center backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.08]"
                        >
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
                            <div className="relative">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-lg font-bold text-emerald-400">
                                    {idx + 1}
                                </div>
                                <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-300">{step}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-center text-sm text-zinc-400">
                    We focus on clarity, communication, and reliability at every stage.
                </p>
            </section>

            {/* Typical Deliverables */}
            <section className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Typical Deliverables</h3>
                <p className="mt-2 text-sm text-zinc-400">
                    What you can expect from our engagements
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {deliverables.map((item, idx) => (
                        <div
                            key={item}
                            className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]"
                        >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 text-sm font-bold text-emerald-400">
                                {idx + 1}
                            </div>
                            <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 backdrop-blur-sm sm:p-16">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
                    <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
                </div>

                <div className="relative space-y-6 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Let's Build Together
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-300">
                        Whether you need a complete IoT system, a software platform, or a working prototype,
                        EcoBridges is ready to collaborate.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                        >
                            Start a Project
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}