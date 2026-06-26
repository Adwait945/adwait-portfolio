import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "The Bridge" — three plain-text paragraphs (Epic 8). Para 2 emphasizes
 * "AI-native PM". No card or background panel.
 */
export default function About() {
  const { about } = siteConfig;

  return (
    <section className="py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {about.heading}
          </h2>
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          <p className="leading-relaxed text-slate-300">{about.paragraph1}</p>
          <p className="leading-relaxed text-slate-300">
            {about.para2Pre}
            <strong className="font-bold text-white">{about.para2Bold}</strong>
            {about.para2Post}
          </p>
          <p className="leading-relaxed text-slate-300">{about.paragraph3}</p>
        </div>
      </Container>
    </section>
  );
}
