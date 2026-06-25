import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  {
    label: "SAFe Product Owner.",
    body: "Fourteen years grounding in turning ambiguous business intent into shipped software. Discovery loops, requirements quality, dependency management, and the discipline of finishing."
  },
  {
    label: "Technical Program Manager.",
    body: "The natural expansion: from owning one product to orchestrating delivery across many teams and systems. Architecture-level decisions, integration contracts, and scaling."
  },
  {
    label: "Product Manager, Technical.",
    body: "Owning a product end-to-end with the technical depth to make the right calls, not just relay them. Where I'm headed next."
  }
];

const initiatives = [
  {
    name: "Teams Retro",
    description: "Designed and shipped a real-time team retrospective web app with always-on feedback feed, gamification engine (points, badges, leaderboard), time-window analytics, and admin moderation. Built end-to-end in a self-authored six-persona agentic workflow. Next.js 14, MongoDB Atlas, Playwright E2E. 5,055 lines of production TypeScript, 87 passing Jest tests, in approximately 20\u201330 hours across three weekends."
  },
  {
    name: "Multi-Agent Workflow (MAW)",
    description: "Authored a reusable, role-prompted agentic workflow of six personas (PRODUCT, ARCHITECT, TEST, DEV, PROFESSOR, REVIEWER), each with its own rules file and dedicated git worktree. Runs in two environments: Claude Code on Mac with Mem0 MCP cross-IDE memory and Playwright browser-agent E2E; restricted corporate Windows with Carbon Black EDR constraints resolved via corepack. Hub-and-spoke methodology with GitHub as source of truth."
  },
  {
    name: "Claude Cowork Research Pipeline",
    description: "Used Claude Cowork with Python libraries for structure-preserving PDF-to-markdown conversion, achieving high-fidelity ingestion of regulatory and technical documents where naive PDF parsing failed."
  },
  {
    name: "CLI-Hosted Local Models",
    description: "Configured Claude Code CLI with locally-hosted Qwen models for research and code review, eliminating token spend on routine work while reserving cloud credits for high-complexity generation."
  }
];

export default function CareerTrajectory() {
  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Career Trajectory</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {roles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/10"
            >
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-white">{role.label}</span>{" "}
                {role.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center italic text-slate-300 mb-10 max-w-3xl mx-auto"
        >
          And increasingly: AI-Native PM — using agentic workflows as the operating layer, not as a feature. Already shipping this way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6"
        >
          <Button
            size="xl"
            className="bg-primary text-primary-foreground hover:opacity-90 font-bold px-8 rounded-xl h-14 text-base shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            asChild
          >
            <a href="#">
              <ArrowDown className="mr-2 w-5 h-5" /> Download PM-Technical Resume
            </a>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="glass border-white/10 hover:bg-white/10 text-white px-8 rounded-xl h-14 text-base"
            asChild
          >
            <a href="#">
              <ArrowDown className="mr-2 w-5 h-5" /> Download TPM Resume
            </a>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-slate-500 max-w-2xl mx-auto mb-16"
        >
          Looking for a SAFe Product Owner conversation? Email me — I keep a separate resume tailored for those engagements.
        </motion.p>

        {/* Selected AI-Augmented Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-6 text-center">Selected AI-Augmented Initiatives</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {initiatives.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-t border-white/5 pt-6"
              >
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-bold text-white">{item.name}</span>{" — "}{item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
