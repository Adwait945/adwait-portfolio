import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";

const metrics = [
  { value: "5,055", label: "lines of production TypeScript" },
  { value: "87/87", label: "Jest tests passing" },
  { value: "44", label: "Playwright E2E test cases" },
  { value: "~20\u201330hrs", label: "across three weekends" }
];

export default function TeamsRetro() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Nav />
      {/* Back nav */}
      <div className="container mx-auto px-4 md:px-6 pt-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to home
        </Link>
      </div>

      {/* Section 1 — Hero */}
      <section className="pt-16 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold mb-6 block"
            >
              Case Study · Product · AI-Native Build
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-8"
            >
              Teams Retro
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              A real-time team retrospective app built end-to-end with a six-persona agentic workflow in three weekends.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section 2 — Metric strip */}
      <section className="py-16 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary font-display tracking-tight mb-2">
                  {m.value}
                </p>
                <p className="text-sm text-slate-400">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What it is</h2>
            <p className="text-slate-400 text-lg italic">
              [Full product overview — coming in Sprint 2]
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Build story */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How it was built</h2>
            <p className="text-slate-400 text-lg italic">
              [MAW workflow walkthrough — coming in Sprint 2]
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — System design */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">System Design</h2>
            <p className="text-slate-400 text-lg italic">
              [Architecture, data models, API contracts — coming in Sprint 2]
            </p>
          </div>
        </div>
      </section>

      {/* Section 6 — Demo */}
      <section className="py-24 bg-black/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">See it live</h2>
            <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 flex items-center justify-center">
              <p className="text-slate-400 text-lg italic">
                Live seeded demo + Loom walkthrough — coming in Sprint 2
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Links row */}
      <section className="py-24 pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center text-sm font-medium text-white hover:text-primary transition-colors border border-white/10 rounded-xl px-8 py-4 flex-1"
            >
              View on GitHub <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center text-sm font-medium text-white hover:text-primary transition-colors border border-white/10 rounded-xl px-8 py-4 flex-1"
            >
              Watch Loom <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 transition-opacity rounded-xl px-8 py-4 flex-1 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              Live Demo <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
