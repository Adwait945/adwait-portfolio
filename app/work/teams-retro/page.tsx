import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import TeamsRetroSkeleton from "@/components/teams-retro/TeamsRetroSkeleton";

const m = siteConfig.meta.teamsRetro;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  openGraph: {
    title: m.title,
    description: m.description,
    url: `${siteConfig.siteUrl}${m.path}`,
    type: "article",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: m.title,
    description: m.description,
    images: [siteConfig.ogImage],
  },
};

export default function TeamsRetroPage() {
  return <TeamsRetroSkeleton />;
}
