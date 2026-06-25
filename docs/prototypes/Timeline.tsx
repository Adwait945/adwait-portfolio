import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    role: "Senior Product Owner | Technical Product Lead",
    company: "7-Eleven (via Kforce · Allen, TX)",
    period: "April 2024 – Present",
    description: "In-house Fuels Pricing & Sign-Push integration platform — the industry's only major retailer running this fully in-house. Inherited the pod as the 7th lead in five years; rebuilt product definition and delivery from the ground up. Shipped 70+ features across 8 program increments, hit a 10,000-store rollout target a full year ahead of schedule. Avoided ~$1M in headcount cost by modeling capacity and rejecting a proposed team expansion."
  },
  {
    role: "Senior Product Owner | Technical Product Manager",
    company: "Wells Fargo (via Kforce · Treasury Payments)",
    period: "June 2022 – April 2024",
    description: "First-wave implementer of the Federal Reserve's FedNow 24/7 instant-payment rail. Owned IRWS requirements and dependencies across 5+ integrating projects. Partnered with engineering on a monolith-to-microservices re-architecture that lifted efficiency 30%, cut API latency 50%, and raised throughput from 100 to 400 TPS."
  },
  {
    role: "Program Manager",
    company: "USAA (via Essential Technologies · Model Risk Management)",
    period: "2020 – 2022",
    description: "Coordinated cross-functional dependencies across Product Management, Model Owners, Developers, Implementers, Validators, and Data Warehouse for multiple Model Risk Management programs at a Fortune 100 financial services firm."
  },
  {
    role: "Product Owner",
    company: "Freeman Company (via Essential Technologies · Virtual Events Platform)",
    period: "2018 – 2020",
    description: "Led delivery during the pandemic-era pivot to virtual and hybrid events. Sustained ~175 user stories/month across 3–4 concurrent client engagements on a 12-week-per-client cycle."
  },
  {
    role: "Systems Analyst",
    company: "FedEx (via Essential Technologies · API Products)",
    period: "2016 – 2018",
    description: "Drove a REST and SOAP API platform for FedEx Office's e-commerce printing channel, including a public API portal enabling commercial customers to embed services in white-labeled apps."
  },
  {
    role: "Senior Business Analyst / Business Analyst",
    company: "Aperia Solutions · Techgene Solutions / MedAssets",
    period: "2011 – 2016",
    description: "Aperia Solutions (Senior Business Analyst, 2013–2016) · Techgene Solutions / MedAssets (Business Analyst, 2011–2013)"
  }
];

export default function Timeline() {
  return (
    <section className="py-24 bg-black/20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">14 years across Payments, Banking, Financial Risk, Retail, Logistics, and Healthcare.</p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-white/10"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                {/* Node */}
                <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)] z-10 border-2 border-black mb-4"></div>

                <div className="w-full md:w-2/3 text-center">
                  <div className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                    <span className="text-primary font-mono text-sm mb-2 block">{exp.period}</span>
                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <h4 className="text-slate-400 mb-4">{exp.company}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Full work history link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative flex flex-col items-center pt-4"
            >
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)] z-10 border-2 border-black mb-4"></div>
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-white hover:text-primary transition-colors"
              >
                Full work history <ArrowUpRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
