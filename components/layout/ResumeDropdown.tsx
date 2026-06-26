"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type ResumeDropdownProps = {
  label: string;
  resumes: { label: string; href: string }[];
};

/**
 * "Resume" button revealing two PDF links (PM-Technical, TPM).
 * Click-outside and Escape close the menu. Items stay in the DOM so they are
 * reachable; visibility is toggled via Tailwind utilities only (no inline style).
 */
export default function ResumeDropdown({ label, resumes }: ResumeDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {label}
        <ChevronDown aria-hidden="true" className="h-4 w-4" />
      </button>
      <div
        className={`absolute right-0 mt-2 w-44 rounded-lg border border-white/10 glass p-1 ${
          open ? "block" : "hidden"
        }`}
      >
        {resumes.map((r) => (
          <a
            key={r.label}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {r.label}
          </a>
        ))}
      </div>
    </div>
  );
}
