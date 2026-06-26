import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import StubPageLayout from "@/components/shared/StubPageLayout";

const m = siteConfig.meta.writing;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
  openGraph: {
    title: m.title,
    description: m.description,
    url: `${siteConfig.siteUrl}${m.path}`,
    type: "website",
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: m.title,
    description: m.description,
    images: [siteConfig.ogImage],
  },
};

export default function WritingPage() {
  return <StubPageLayout {...siteConfig.stubs.writing} />;
}
