import Link from "next/link";

export default function ProcessPage() {
    type ProcessStep = {
        number: string;
        title: string;
        subtitle: string;
        description: string;
        details: readonly string[];
        outcome: string;
        color: string;
        optional?: boolean;
    };

    const processSteps: ProcessStep[] = [
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
            color: "emerald",
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
            color: "cyan",
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
            color: "emerald",
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
            color: "cyan",
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
            color: "emerald",
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
            color: "cyan",
            optional: true,
        },
    ] as const;

    const whyItWorks = [
        "Clear communication at every stage",
        "Reduced development risk",
        "Faster delivery through parallel execution",
        "Practical, real-world testing",
        "Transparent progress and outcomes",
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
                        Our Process
                    </div>

                    <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                        A Structured Approach from{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Idea to Deployment
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                        At EcoBridges, we follow a clear, transparent, and systematic development process to
                        ensure that every project is delivered efficiently, reliably, and aligned with
                        real-world requirements.
                    </p>

                    <p className="mt-4 text-base font-medium text-emerald-400">
                        Our process bridges the gap between ideas, engineering, and deployment.
                    </p>
                </div>
            </section>

            {/* Process Steps - Detailed Timeline */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        The 6-Step Process
                    </h2>
                    <p className="mt-2 text-zinc-400">
                        From concept to reality, one step at a time
                    </p>
                </div>

                {/* Desktop Timeline View */}
                <div className="hidden lg:block">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-cyan-500 to-emerald-500"></div>

                        <div className="space-y-16">
                            {processSteps.map((step, idx) => (
                                <div key={step.number} className="relative">
                                    {/* Timeline Node */}
                                    <div className="absolute left-1/2 top-8 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-zinc-950 bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/30">
                                        {step.number}
                                    </div>

                                    {/* Content - Alternating sides */}
                                    <div className={`grid grid-cols-2 gap-8 ${idx % 2 === 0 ? "" : "direction-rtl"}`}>
                                        <div className={idx % 2 === 0 ? "pr-16" : "pl-16"}>
                                            {idx % 2 === 0 && (
                                                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/30">
                                                    {step.optional && (
                                                        <div className="absolute right-4 top-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-400">
                                                            Optional
                                                        </div>
                                                    )}

                                                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                                                    <p className="mt-2 text-sm font-medium text-emerald-400">{step.subtitle}</p>
                                                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">{step.description}</p>

                                                    <ul className="mt-6 space-y-2">
                                                        {step.details.map((detail) => (
                                                            <li key={detail} className="flex items-start gap-2 text-sm text-zinc-300">
                                                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                                                <span>{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                                        <p className="text-sm font-medium leading-relaxed text-zinc-300">
                                                            💡 {step.outcome}
                                                        </p>
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                                                </div>
                                            )}
                                        </div>

                                        <div className={idx % 2 === 1 ? "pr-16" : "pl-16"}>
                                            {idx % 2 === 1 && (
                                                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/30">
                                                    {step.optional && (
                                                        <div className="absolute right-4 top-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-400">
                                                            Optional
                                                        </div>
                                                    )}

                                                    <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                                                    <p className="mt-2 text-sm font-medium text-cyan-400">{step.subtitle}</p>
                                                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">{step.description}</p>

                                                    <ul className="mt-6 space-y-2">
                                                        {step.details.map((detail) => (
                                                            <li key={detail} className="flex items-start gap-2 text-sm text-zinc-300">
                                                                <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                                                                <span>{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                                                        <p className="text-sm font-medium leading-relaxed text-zinc-300">
                                                            💡 {step.outcome}
                                                        </p>
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet Stack View */}
                <div className="space-y-6 lg:hidden">
                    {processSteps.map((step) => (
                        <div
                            key={step.number}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm transition-all hover:border-emerald-500/30"
                        >
                            <div className="p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-xl font-bold text-emerald-400">
                                        {step.number}
                                    </div>
                                    <div className="flex-1">
                                        {step.optional && (
                                            <div className="mb-2 inline-block rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-400">
                                                Optional
                                            </div>
                                        )}
                                        <h3 className="text-xl font-bold text-white sm:text-2xl">{step.title}</h3>
                                        <p className="mt-1 text-sm font-medium text-emerald-400">{step.subtitle}</p>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm leading-relaxed text-zinc-400">{step.description}</p>

                                <ul className="mt-6 space-y-2">
                                    {step.details.map((detail) => (
                                        <li key={detail} className="flex items-start gap-2 text-sm text-zinc-300">
                                            <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                                    <p className="text-sm font-medium leading-relaxed text-zinc-300">
                                        💡 {step.outcome}
                                    </p>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Our Process Works */}
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-emerald-950/20 p-8 backdrop-blur-sm sm:p-12">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Why It Works
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                        Why Our Process Works
                    </h2>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {whyItWorks.map((reason, idx) => (
                        <div
                            key={reason}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-center backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.08]"
                        >
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
                            <div className="relative">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                                    <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-300">{reason}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Timeline Overview */}
            <section className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white">Quick Overview</h3>
                <p className="mt-2 text-sm text-zinc-400">
                    A clear, repeatable flow that keeps scope realistic and delivery predictable.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
                    {processSteps.map((step, idx) => (
                        <div key={step.number} className="relative">
                            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 text-xs font-bold text-emerald-400">
                                        {step.number}
                                    </span>
                                    <span className="text-xs font-semibold text-white">{step.title.split(" ")[0]}</span>
                                </div>
                            </div>
                            {idx < processSteps.length - 1 && (
                                <div className="absolute -right-1.5 top-1/2 hidden h-0.5 w-3 -translate-y-1/2 bg-gradient-to-r from-emerald-500/50 to-transparent lg:block" />
                            )}
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
                        Let's Start with a Discussion
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-300">
                        Every project begins with a conversation. Have an idea, requirement, or challenge?
                        Let's discuss it and design the right solution together.
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