import { motion } from "framer-motion";
import { Target, Code2, BrainCircuit } from "lucide-react";

const competencies = [
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Product Thinking",
    description: "Defining what to build, why it matters, and how to know it worked. Discovery, requirements decomposition, acceptance criteria that survive sprint 14, and the discipline to say no.",
    skills: ["Agile/Scrum", "GTM Strategy", "User Research", "Metrics & KPIs", "PRD Authoring", "WSJF / RICE"]
  },
  {
    icon: <Code2 className="w-8 h-8 text-primary" />,
    title: "Engineering Depth",
    description: "Designing systems, reasoning about tradeoffs, and writing production code. APIs and integration contracts, distributed systems, data pipelines, and modern web stacks.",
    skills: [
      "System Architecture (Tradeoffs · Scalability Milestones · Cross-functional Dependencies · Bottlenecks · Execution Risks & Mitigations)",
      "TypeScript",
      "REST/SOAP APIs",
      "React / Next.js",
      "Distributed Systems"
    ]
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "AI & Systems",
    description: "Treating AI as the operating layer, not a feature. A self-designed six-persona agentic workflow, cross-IDE memory, browser-agent E2E testing, and the discipline to make AI-generated code production-quality.",
    skills: ["Multi-Agent Workflows (MAW)", "Claude Code", "Windsurf", "Mem0 MCP", "Playwright MCP", "RAG Architecture"]
  }
];

export default function TechnicalDNA() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How I Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Three things a Big Tech PMT has to do well. Here&apos;s what I bring to each.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competencies.map((comp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl flex flex-col h-full"
            >
              <div className="mb-6 p-4 bg-primary/10 w-max rounded-xl">
                {comp.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{comp.title}</h3>
              <p className="text-muted-foreground mb-8 flex-grow">{comp.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {comp.skills.map((skill, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
