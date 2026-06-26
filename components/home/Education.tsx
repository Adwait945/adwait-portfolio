import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "Education" — lightweight two-entry plain-text block (Epic 7).
 * No glass-card, no icons, no logos.
 */
export default function Education() {
  const { education } = siteConfig;

  return (
    <section className="border-t border-white/5 py-16">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {education.heading}
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {education.entries.map((entry) => (
            <div key={entry.degree}>
              <p className="mb-1 font-bold text-white">{entry.degree}</p>
              <p className="text-sm text-slate-400">{entry.institution}</p>
              <p className="mt-1 text-sm text-slate-500">{entry.year}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
