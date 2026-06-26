import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "Experience" — centered vertical timeline of six roles plus a full work
 * history link (Epic 6). All copy verbatim from siteConfig.experience.
 */
export default function Experience() {
  const { experience } = siteConfig;

  return (
    <section className="bg-black/20 py-24">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {experience.heading}
          </h2>
          <p className="mt-4 text-slate-400">{experience.subhead}</p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experience.entries.map((entry) => (
              <div key={entry.period} className="relative flex flex-col items-center">
                <div
                  className="z-10 mb-4 h-3 w-3 rounded-full border-2 border-black bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                  aria-hidden="true"
                />
                <div className="w-full rounded-2xl border border-white/5 glass p-6 text-center transition-colors hover:border-primary/30 md:w-2/3">
                  <p className="font-mono text-sm text-primary">{entry.period}</p>
                  <h3 className="mt-2 text-lg font-bold">{entry.role}</h3>
                  {entry.company ? (
                    <p className="mt-1 text-sm text-slate-400">{entry.company}</p>
                  ) : null}
                  <p className="mt-3 text-sm text-slate-500">{entry.description}</p>
                </div>
              </div>
            ))}

            <div className="relative flex flex-col items-center">
              <div
                className="z-10 mb-4 h-3 w-3 rounded-full border-2 border-black bg-primary shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                aria-hidden="true"
              />
              <a
                href={experience.historyLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80"
              >
                {experience.historyLink.label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
