import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Responsive max-width wrapper (AC-1.9). Symmetric padding — no right-side gap
 * at 1440px. Callers may extend layout via `className` (e.g. py-* / bg-*).
 */
export default function Container({ children, className = "", id }: ContainerProps) {
  return (
    <div
      id={id}
      className={`max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
