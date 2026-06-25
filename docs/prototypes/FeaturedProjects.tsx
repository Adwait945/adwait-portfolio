import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import teamsRetroImg from "@assets/image_1781298940848.png";

const metrics = [
  "5,055 lines of production TypeScript across 48 files",
  "87/87 Jest unit tests passing",
  "44 Playwright end-to-end test cases",
  "Zero @ts-nocheck escapes"
];

const stack = [
  "Next.js 14",
  "TypeScript",
  "MongoDB Atlas",
  "Jest",
  "Playwright",
  "Tailwind"
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Real shipped artifacts. No fabricated metrics.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 — Teams Retro */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col h-full"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <div className="absolute inset-0 bg-primary/5"></div>
              <img
                src={teamsRetroImg}
                alt="Teams Retro Dashboard"
                className="w-full h-full object-cover opacity-80 mix-blend-lighten"
              />
              <div className="absolute inset-0 border-b border-white/10 pointer-events-none z-10"></div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold mb-3">Product · AI-Native Build</span>
              <h3 className="text-2xl font-bold mb-3">Teams Retro</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                A real-time team retrospective app — feedback feed, gamification engine, time-window analytics, admin moderation — designed, built, tested, and deployed using my own six-persona agentic workflow.
              </p>

              {/* Metrics */}
              <div className="space-y-2 mb-4">
                {metrics.map((m, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary text-sm mt-[-1px]">&#9654;</span>
                    <span className="text-xs text-slate-300 font-medium">{m}</span>
                  </div>
                ))}
              </div>

              {/* Quote block */}
              <div className="p-3 glass rounded-xl border-l-2 border-l-primary mb-4">
                <p className="text-slate-200 italic text-xs leading-relaxed">
                  "A quarter of traditional solo development, compressed into ~20–30 hours across three focused weekends. Roughly 15–30× faster than the baseline a single PM/dev would need to ship the same scope."
                </p>
              </div>

              {/* Tech stack chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {stack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>

              <Link
                href="/teams-retro"
                className="inline-flex items-center text-sm font-medium text-white hover:text-primary transition-colors mt-auto"
              >
                Read the case study <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Card 2 — Functional & Technical Artifacts (placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card rounded-2xl overflow-hidden border border-dashed border-white/20 flex flex-col h-full opacity-60"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20"></div>
              </div>
              <div className="absolute inset-0 border-b border-dashed border-white/10 pointer-events-none z-10"></div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold mb-3">Artifacts · In Progress</span>
              <h3 className="text-2xl font-bold mb-3">Functional & Technical Artifacts</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">
                Sanitized artifacts from recent engagements — best-in-class acceptance criteria, system design doc, technical risk assessment, and a business translation framework.
              </p>

              <span className="inline-flex items-center text-sm font-medium text-slate-500 mt-auto">
                Coming in Sprint 3 <ArrowUpRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </motion.div>

          {/* Card 3 — Code & Workflows (placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-2xl overflow-hidden border border-dashed border-white/20 flex flex-col h-full opacity-60"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20"></div>
              </div>
              <div className="absolute inset-0 border-b border-dashed border-white/10 pointer-events-none z-10"></div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <span className="text-primary font-mono text-xs uppercase tracking-[0.2em] font-bold mb-3">Git · In Progress</span>
              <h3 className="text-2xl font-bold mb-3">Code & Workflows</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-grow">
                GitHub walkthrough, annotated forks and stars, and the six-persona Multi-Agent Workflow (MAW) — the agentic pipeline behind everything on this site.
              </p>

              <span className="inline-flex items-center text-sm font-medium text-slate-500 mt-auto">
                Coming in Sprint 3 <ArrowUpRight className="ml-2 w-4 h-4" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
