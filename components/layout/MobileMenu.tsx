"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  resumes: { label: string; href: string }[];
  pathname: string;
};

/**
 * Full-screen mobile navigation overlay (NFR-1.A). Traps focus, closes on
 * Escape, restores focus to the trigger via parent, and locks body scroll.
 */
export default function MobileMenu({
  open,
  onClose,
  links,
  resumes,
  pathname,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a[href], button");
    firstLink?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 z-[55] flex flex-col bg-background/95 backdrop-blur-lg md:hidden"
    >
      <div className="flex justify-end p-4">
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="rounded-md p-2 text-slate-300 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X aria-hidden="true" className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-1 flex-col items-center justify-center gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`text-2xl font-display transition-colors hover:text-primary ${
              pathname === link.href ? "text-primary" : "text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="mt-4 flex gap-6">
          {resumes.map((r) => (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-300 transition-colors hover:text-primary"
            >
              {r.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
