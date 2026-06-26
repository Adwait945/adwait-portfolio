import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

/**
 * "Let's talk" — two body lines and three equal-width contact links (Epic 10).
 * Tab order: LinkedIn → GitHub → Email. Email is the primary filled button.
 */
export default function ContactCTA() {
  const { contact } = siteConfig;

  return (
    <section className="border-t border-white/5 py-24">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {contact.heading}
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-2 text-slate-300">
            <p>{contact.line1}</p>
            <p>{contact.line2}</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row">
          {contact.buttons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              {...(btn.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`inline-flex flex-1 items-center justify-center rounded-xl px-6 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                btn.primary
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:opacity-90"
                  : "border border-white/10 glass text-white hover:bg-white/10"
              }`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
