import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#030A14]">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#030A14] via-[#050d1a] to-[#030A14]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-6 py-2 text-xs font-mono tracking-[0.2em] uppercase text-primary border border-primary/30 rounded-full glass mb-12 inline-block">
              Product Manager, Technical · Technical Program Manager
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 leading-[1.1] text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Bridging Product <br />
            Strategy <span className="text-slate-500">and</span> <br />
            <span className="text-primary">Technical Execution</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            14 years turning ambiguous business intent into shipped software — now building full-stack, AI-native products end to end.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Button size="xl" className="bg-primary text-primary-foreground hover:opacity-90 font-bold px-12 rounded-xl h-16 text-lg shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              View Featured Work <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="xl" variant="outline" className="glass border-white/10 hover:bg-white/10 text-white px-12 rounded-xl h-16 text-lg" onClick={() => {}}>
              How I Build
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}