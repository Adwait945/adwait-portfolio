import { Target, Code2, BrainCircuit } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

const iconMap = {
  Target,
  Code2,
  BrainCircuit,
} as const;

/**
 * "How I Work" — three pillar glass cards (Epic 2). Server Component; all copy
 * sourced from siteConfig.howIWork. scroll-mt offsets the fixed Nav anchor.
 */
export default function HowIWork() {
  const { howIWork } = siteConfig;

  return (
    <section id="how-i-work" className="scroll-mt-24 py-24">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {howIWork.heading}
          </h2>
          <p className="mt-4 text-slate-400">{howIWork.subhead}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {howIWork.pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon];
            return (
              <div
                key={pillar.title}
                className="glass-card flex h-full flex-col rounded-2xl p-8"
              >
                <div className="w-max rounded-xl bg-primary/10 p-4">
                  <Icon aria-hidden="true" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{pillar.title}</h3>
                <p className="mt-4 text-slate-400">{pillar.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300"
                    >
                      {tag.label}
                      {tag.subLabel ? (
                        <span className="mt-1 block text-[0.65rem] text-slate-500">
                          {tag.subLabel}
                        </span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
