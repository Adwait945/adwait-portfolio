import { motion } from "framer-motion";

export default function TheBridge() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
          >
            The Bridge
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-slate-300 leading-relaxed">
              Fourteen years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare have taught me one thing repeatedly: the gap between what business leaders want and what engineering ships is almost always a translation gap, not an effort gap. Most of my career has been spent closing it — turning ambiguous executive intent into testable contracts, dependencies into delivery plans, and architecture decisions into roadmaps a business can stand behind.
            </p>

            <p className="text-slate-300 leading-relaxed">
              What&apos;s changed in the last two years is how I work. I now operate as a <span className="font-bold text-white">AI-native PM</span> — running a self-designed six-persona agentic workflow (PRODUCT · ARCHITECT · TEST · DEV · PROFESSOR · REVIEWER) across Claude Code, Windsurf, and Antigravity, with cross-IDE memory bridging via MCP. I don&apos;t talk about AI as a product feature. I use it as my operating layer. I take concepts from whiteboard to working prototype in a weekend, ship 5,000+ lines of tested production code in three, and replace slide-only stakeholder reviews with functioning demos.
            </p>

            <p className="text-slate-300 leading-relaxed">
              The Product Owner foundation has been built. The technical depth is where I&apos;ve been heading the entire time. This site is a working artifact of both.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
