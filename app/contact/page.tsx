import Link from "next/link";

export default function ContactPage() {
    const contactMethods = [
        {
            icon: "📧",
            title: "Email",
            value: "ecobridges.tech@gmail.com",
            description: "For detailed project inquiries and discussions",
            action: "mailto:ecobridges.tech@gmail.com",
            actionText: "Send Email",
        },
        {
            icon: "📱",
            title: "WhatsApp",
            value: "Quick discussion and project inquiries",
            description: "Fast response for urgent queries",
            action: "https://wa.me/1234567890", // Replace with actual WhatsApp number
            actionText: "Chat on WhatsApp",
        },
        {
            icon: "🌍",
            title: "Location",
            value: "India",
            description: "We work remotely with clients across regions",
            action: null,
            actionText: null,
        },
    ] as const;

    const projectTypes = [
        "IoT System",
        "Web Application",
        "Mobile Application",
        "Prototype / POC",
        "Full-Stack Solution",
        "Other",
    ] as const;

    const nextSteps = [
        {
            number: "01",
            title: "We review your requirement",
            desc: "Analyze your project details and technical needs",
        },
        {
            number: "02",
            title: "Schedule a discussion if needed",
            desc: "Clarify requirements and understand constraints",
        },
        {
            number: "03",
            title: "Suggest a technical approach",
            desc: "Propose architecture and technology stack",
        },
        {
            number: "04",
            title: "Share a clear execution plan",
            desc: "Timeline, milestones, and budget estimate",
        },
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
                        Get in Touch
                    </div>

                    <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                        Let's Build Something{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Meaningful Together
                        </span>
                    </h1>

                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                        Have an idea, project, or problem you want to solve? We'd love to hear from you.
                    </p>

                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
                        Whether you're looking for an IoT solution, software platform, mobile app, or a complete
                        end-to-end system, EcoBridges is ready to collaborate.
                    </p>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        How to Reach Us
                    </h2>
                    <p className="mt-2 text-zinc-400">
                        Choose the method that works best for you
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {contactMethods.map((method) => (
                        <div
                            key={method.title}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/30"
                        >
                            <div className="absolute -right-8 -top-8 text-8xl opacity-5 transition-all group-hover:scale-110 group-hover:opacity-10">
                                {method.icon}
                            </div>

                            <div className="relative">
                                <div className="text-5xl">{method.icon}</div>
                                <h3 className="mt-4 text-xl font-bold text-white">{method.title}</h3>
                                <p className="mt-2 text-base font-medium text-emerald-400">{method.value}</p>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{method.description}</p>

                                {method.action && (
                                    <a
                                        href={method.action}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                                    >
                                        {method.actionText}
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Form Section */}
            <section className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - Guidelines */}
                <div className="space-y-6 lg:col-span-1">
                    {/* What to Include */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-white">What to Include</h3>
                        <p className="mt-2 text-sm text-zinc-400">
                            Help us understand your project better
                        </p>
                        <ul className="mt-4 space-y-2">
                            {whatToInclude.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <span className="mt-1.5 flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Response Time */}
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
                                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Response Time</h3>
                                <p className="text-xs text-zinc-400">Fast turnaround</p>
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                            You can expect a response within <span className="font-semibold text-emerald-400">24–48 hours</span> on weekdays.
                        </p>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="lg:col-span-2">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-8 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white">
                            Tell Us About Your Project
                        </h2>
                        <p className="mt-2 text-sm text-zinc-400">
                            Fill out the form below and we'll get back to you soon
                        </p>

                        <form className="mt-8 space-y-6">
                            {/* Name and Email Row */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <label className="grid gap-2">
                                    <span className="text-sm font-medium text-zinc-300">Full Name *</span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="Your name"
                                    />
                                </label>

                                <label className="grid gap-2">
                                    <span className="text-sm font-medium text-zinc-300">Email Address *</span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="you@company.com"
                                    />
                                </label>
                            </div>

                            {/* Contact Number */}
                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-zinc-300">Contact Number (Optional)</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="+91 1234567890"
                                />
                            </label>

                            {/* Project Type */}
                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-zinc-300">Project Type *</span>
                                <select
                                    name="projectType"
                                    required
                                    className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                >
                                    <option value="" className="bg-zinc-900">Select project type</option>
                                    {projectTypes.map((type) => (
                                        <option key={type} value={type} className="bg-zinc-900">
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            {/* Project Description */}
                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-zinc-300">Brief Project Description *</span>
                                <textarea
                                    name="description"
                                    rows={6}
                                    required
                                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="What are you building? What problems are you solving? What are your technical requirements and constraints?"
                                />
                            </label>

                            {/* Timeline and Budget Row */}
                            <div className="grid gap-6 sm:grid-cols-2">
                                <label className="grid gap-2">
                                    <span className="text-sm font-medium text-zinc-300">Expected Timeline (Optional)</span>
                                    <input
                                        type="text"
                                        name="timeline"
                                        className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="e.g., 2-3 months"
                                    />
                                </label>

                                <label className="grid gap-2">
                                    <span className="text-sm font-medium text-zinc-300">Budget Range (Optional)</span>
                                    <input
                                        type="text"
                                        name="budget"
                                        className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                        placeholder="e.g., $5,000 - $10,000"
                                    />
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs text-zinc-500">
                                    * Required fields. We respect your privacy and won't share your information.
                                </p>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                                >
                                    Send Inquiry
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* What Happens Next */}
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-emerald-950/20 p-8 backdrop-blur-sm sm:p-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        What Happens Next?
                    </h2>
                    <p className="mt-2 text-zinc-400">
                        Once you submit your inquiry:
                    </p>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {nextSteps.map((step) => (
                        <div
                            key={step.number}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.08]"
                        >
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
                            <div className="relative">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-lg font-bold text-emerald-400">
                                    {step.number}
                                </div>
                                <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Working with EcoBridges */}
            <section className="rounded-2xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white">Working with EcoBridges</h2>
                <p className="mt-2 text-sm text-zinc-400">
                    What you can expect when you partner with us
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {workingPoints.map((point) => (
                        <div
                            key={point}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]"
                        >
                            <svg className="h-5 w-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm font-medium text-zinc-300">{point}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 backdrop-blur-sm sm:p-16">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
                    <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
                </div>

                <div className="relative space-y-6 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Your Idea Deserves a Working Solution
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-300">
                        Let's discuss your project and build the right technology together.
                    </p>
                    <p className="text-base font-medium text-emerald-400">
                        Ready to Start?
                    </p>
                    <div className="pt-4">
                        <a
                            href="#form"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                        >
                            Start a Project
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}