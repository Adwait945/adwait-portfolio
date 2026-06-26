import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "Career Trajectory" — three lenses, an emphasis line, and two resume
 * downloads plus a SAFe note (Epic 4). All copy from siteConfig.
 */
export default function CareerTrajectory() {
  const c = siteConfig.careerTrajectory;

  return (
    <section className="bg-black/20 py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">{c.heading}</h2>
          <p className="mt-4 text-slate-400">{c.intro}</p>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          {c.blocks.map((block) => (
            <div
              key={block.label}
              className="glass-card grid grid-cols-1 gap-2 rounded-2xl border border-white/10 p-8 md:grid-cols-3"
            >
              <p className="font-bold text-white md:col-span-1">{block.label}</p>
              <p className="text-slate-300 md:col-span-2">{block.body}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center italic text-slate-300">
          {c.emphasisPre}
          <strong className="font-bold text-white">{c.emphasisBold}</strong>
          {c.emphasisPost}
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href={c.primaryResume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
            {c.primaryResume.label}
          </a>
          <a
            href={c.secondaryResume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 glass px-6 py-3 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ArrowDown aria-hidden="true" className="h-4 w-4" />
            {c.secondaryResume.label}
          </a>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-500">
          {c.safeNotePre}
          <a
            href={c.safeNoteHref}
            className="text-primary transition-colors hover:opacity-80"
          >
            {c.safeNoteLinkLabel}
          </a>
          {c.safeNotePost}
        </p>
      </Container>
    </section>
  );
}
