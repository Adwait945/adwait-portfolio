import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "Skills & Tools" — four group cards with dot-separated prose (Epic 5).
 * Verbatim §7 lists from siteConfig.skills.
 */
export default function Skills() {
  const { skills } = siteConfig;

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {skills.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {skills.groups.map((group) => (
            <div
              key={group.heading}
              className="glass-card rounded-2xl border border-white/10 p-8"
            >
              <h3 className="mb-4 text-xl font-bold">{group.heading}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{group.skills}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
