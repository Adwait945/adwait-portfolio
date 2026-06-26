"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/layout/Container";
import ResumeDropdown from "@/components/layout/ResumeDropdown";
import MobileMenu from "@/components/layout/MobileMenu";

/**
 * Sticky top navigation (AC-1.1–1.5). Adds a glass backdrop after the user
 * scrolls past the hero; highlights the active route; exposes a resume
 * dropdown and a mobile menu. Only the interactive parts ship client JS.
 */
export default function Nav() {
  const { nav } = siteConfig;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? "glass border-b border-white/10" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <Link
          href={nav.brand.href}
          className="font-display text-xl font-bold tracking-tight text-white transition-colors hover:text-primary"
        >
          {nav.brand.label}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary underline underline-offset-8 decoration-primary"
                  : "text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ResumeDropdown label={nav.resumeLabel} resumes={nav.resumes} />
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="rounded-md p-2 text-slate-300 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </Container>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={nav.links}
        resumes={nav.resumes}
        pathname={pathname}
      />
    </nav>
  );
}
