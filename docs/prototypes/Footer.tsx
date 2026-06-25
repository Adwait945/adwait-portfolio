import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="py-24 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Let&apos;s talk
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2 mb-10"
          >
            <p className="text-slate-300 leading-relaxed">
              Open to PM-Technical, Product TPM, Senior TPM, and Senior/Principal PM roles at companies investing in technical product leadership and AI-native delivery.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Plano-based; flexible on hybrid and remote.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <Button
              size="xl"
              variant="outline"
              className="glass border-white/10 hover:bg-white/10 text-white rounded-xl h-14 text-base flex-1"
              asChild
            >
              <a href="#">LinkedIn</a>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="glass border-white/10 hover:bg-white/10 text-white rounded-xl h-14 text-base flex-1"
              asChild
            >
              <a href="#">GitHub</a>
            </Button>
            <Button
              size="xl"
              className="bg-primary text-primary-foreground hover:opacity-90 font-bold rounded-xl h-14 text-base flex-1 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              asChild
            >
              <a href="mailto:adwaitmulye@gmail.com">Email</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
