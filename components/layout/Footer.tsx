import Link from "next/link";
import { Briefcase, Code2, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";

// lucide-react dropped its brand glyphs (Linkedin/Github); use semantic
// generic icons. The accessible name comes from each link's aria-label.
const iconMap = {
  LinkedIn: Briefcase,
  GitHub: Code2,
  Email: Mail,
} as const;

/**
 * Three-column footer (AC-1.6–1.8): colophon, site map, social icon links,
 * plus a full-width bottom line.
 */
export default function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="border-t border-white/5 py-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          <p className="text-sm text-slate-500">{footer.colophon}</p>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footer.siteMap.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex justify-center gap-6 md:justify-end">
            {footer.social.map((s) => {
              const Icon = iconMap[s.label as keyof typeof iconMap];
              const isExternal = s.href.startsWith("http");
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.ariaLabel}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-slate-400 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">{footer.bottomLine}</p>
      </Container>
    </footer>
  );
}
