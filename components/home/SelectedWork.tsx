import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "Selected Work" — one real card (Teams Retro) plus two dashed placeholders
 * (Epic 3). All copy from siteConfig.selectedWork; no fabricated strings.
 */
export default function SelectedWork() {
  const { selectedWork } = siteConfig;

  return (
    <section className="bg-black/20 py-24">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {selectedWork.heading}
          </h2>
          <p className="mt-4 text-slate-400">{selectedWork.subhead}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {selectedWork.cards.map((card) =>
            card.placeholder ? (
              <div
                key={card.title}
                className="flex h-full flex-col rounded-2xl border border-dashed border-white/20 p-8 opacity-60"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/20" />
                <span className="font-mono text-xs text-primary">{card.eyebrow}</span>
                <h3 className="mt-3 text-xl font-bold">{card.title}</h3>
                <p className="mt-4 text-slate-400">{card.description}</p>
                <span className="mt-auto pt-6 text-sm text-slate-500">
                  {card.cta.label}
                </span>
              </div>
            ) : (
              <div
                key={card.title}
                className="flex h-full flex-col rounded-2xl border border-white/10 glass-card p-8"
              >
                <div
                  className="mb-6 aspect-[16/10] w-full rounded-xl bg-primary/5"
                  role="img"
                  aria-label={card.imageAlt}
                />
                <span className="font-mono text-xs text-primary">{card.eyebrow}</span>
                <h3 className="mt-3 text-xl font-bold">{card.title}</h3>
                <p className="mt-4 text-slate-400">{card.description}</p>

                {card.metrics ? (
                  <ul className="mt-6 space-y-2">
                    {card.metrics.map((m) => (
                      <li key={m} className="flex gap-2 text-sm text-slate-300">
                        <span className="text-primary" aria-hidden="true">
                          •
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {card.quote ? (
                  <blockquote className="mt-6 rounded-xl border-l-2 border-l-primary glass p-4 text-sm italic text-slate-300">
                    {card.quote}
                  </blockquote>
                ) : null}

                {card.stack ? (
                  <p className="mt-6 font-mono text-xs text-slate-400">
                    {card.stack.join("")}
                  </p>
                ) : null}

                {card.cta.href ? (
                  <Link
                    href={card.cta.href}
                    className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-primary transition-colors hover:opacity-80"
                  >
                    {card.cta.label}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            )
          )}
        </div>
      </Container>
    </section>
  );
}
