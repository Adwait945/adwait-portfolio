import Container from "@/components/layout/Container";
import BackLink from "@/components/shared/BackLink";

type StubPageLayoutProps = {
  eyebrow: string;
  title: string;
  blurb: string;
  statusNote: string;
};

/**
 * Reusable stub page (AC-11.4): back link, eyebrow, title, blurb, status note.
 * Dark theme, centered, no construction imagery.
 */
export default function StubPageLayout({
  eyebrow,
  title,
  blurb,
  statusNote,
}: StubPageLayoutProps) {
  return (
    <div className="pt-24">
      <Container className="max-w-3xl">
        <div className="pt-8">
          <BackLink />
        </div>
        <div className="py-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-400">{blurb}</p>
          <p className="mt-8 text-sm font-medium text-slate-300">{statusNote}</p>
        </div>
      </Container>
    </div>
  );
}
