import { motion } from "framer-motion";

const groups = [
  {
    heading: "Product Management",
    skills: "Product vision & roadmap · Customer & stakeholder discovery · Requirements decomposition · Acceptance criteria & testable contracts · Edge-case analysis · Prioritization (WSJF, RICE) · OKRs & success metrics · PRD authoring · GTM coordination"
  },
  {
    heading: "Technical Depth",
    skills: "REST & SOAP APIs · Microservices · Distributed systems · System design & scaling · SQL (complex querying) · Databricks Lakehouse · ETL pipelines · MongoDB / PostgreSQL · JSON / XML data contracts · React · Next.js · Java Spring Boot · Python · CI/CD"
  },
  {
    heading: "AI & GenAI Tooling",
    skills: "Multi-agent workflow design · Windsurf Cascade · Google Antigravity · Claude Code CLI · Replit · Databricks Genie · Mem0 MCP cross-IDE memory · Playwright MCP browser-agent E2E · RAG architecture · Prompt engineering · LLM integration"
  },
  {
    heading: "Delivery & Tools",
    skills: "Cross-functional leadership · Dependency & risk management · Agile / Scrum · SAFe at enterprise scale · JIRA · Confluence · Postman · Effective in both structured-program and autonomous-team models"
  }
];

export default function SkillsTools() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Tools</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {groups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">{group.heading}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {group.skills}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
