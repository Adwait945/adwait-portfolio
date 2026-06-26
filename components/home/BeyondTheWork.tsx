import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "Beyond the Work" — a single human paragraph (Epic 9). Heading + one
 * paragraph only; no card, icon, or tags.
 */
export default function BeyondTheWork() {
  const { beyondTheWork } = siteConfig;

  return (
    <section className="py-24">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {beyondTheWork.heading}
          </h2>
        </div>
        <p className="mx-auto max-w-4xl text-center leading-relaxed text-slate-300">
          {beyondTheWork.paragraph}
        </p>
      </Container>
    </section>
  );
}
