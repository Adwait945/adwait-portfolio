import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";
import BackLink from "@/components/shared/BackLink";

/**
 * Teams Retro case-study skeleton (AC-11.2). Locked metric strip with real
 * values; content sections are Sprint-2 placeholders. No fake chat UI.
 */
export default function TeamsRetroSkeleton() {
  const t = siteConfig.teamsRetro;

  return (
    <article className="pt-24">
      <Container>
        <div className="pt-8">
          <BackLink />
        </div>

        <header className="py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {t.eyebrow}
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
            {t.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">{t.subhead}</p>
        </header>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {t.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-display text-4xl font-bold tracking-tight text-primary md:text-5xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm text-slate-400">{m.label}</p>
            </div>
          ))}
        </div>
      </Container>

      {t.sections.map((section, idx) => (
        <section
          key={section.heading}
          className={idx % 2 === 1 ? "mt-16 bg-black/20 py-16" : "mt-16 py-16"}
        >
          <Container>
            <h2 className="text-3xl font-bold tracking-tight">{section.heading}</h2>
            <p className="mt-4 text-lg italic text-slate-400">{section.body}</p>
          </Container>
        </section>
      ))}

      <section className="py-16">
        <Container>
          <h2 className="mb-6 text-3xl font-bold tracking-tight">{t.demoHeading}</h2>
          <div className="rounded-2xl border-2 border-dashed border-white/20 p-12 text-center">
            <p className="text-lg italic text-slate-400">{t.demoText}</p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {t.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 glass px-6 py-3 font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
