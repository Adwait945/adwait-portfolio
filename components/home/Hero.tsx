import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  const { hero, subheadline } = siteConfig;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-card to-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="px-6 py-2 text-xs font-mono tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full glass mb-12 inline-block">
            {hero.eyebrow}
          </span>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 leading-[1.1] text-white">
            {hero.headlineLead}
            <span className="text-slate-500">{hero.headlineMuted}</span>
            {hero.headlineTrailing}
            <span className="text-primary">{hero.headlineAccent}</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-16 leading-relaxed">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-bold px-12 rounded-xl h-16 text-lg shadow-[0_0_20px_rgba(0,229,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {hero.primaryCta.label}
              <ArrowRight aria-hidden="true" className="ml-2 w-5 h-5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center glass border border-white/10 hover:bg-white/10 text-white px-12 rounded-xl h-16 text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
