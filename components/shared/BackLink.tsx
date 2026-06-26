import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type BackLinkProps = {
  className?: string;
};

/**
 * "← Back to home" link, reused by Teams Retro and stub pages.
 */
export default function BackLink({ className = "" }: BackLinkProps) {
  return (
    <Link
      href={siteConfig.routes.home}
      className={`inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-primary ${className}`.trim()}
    >
      <ArrowLeft aria-hidden="true" className="h-4 w-4" />
      Back to home
    </Link>
  );
}
