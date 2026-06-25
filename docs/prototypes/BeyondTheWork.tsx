import { motion } from "framer-motion";

export default function BeyondTheWork() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
          >
            Beyond the Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-300 leading-relaxed text-center"
          >
            Outside of work, I&apos;ve played guitar for 25 years — long enough to know that the gap between knowing something and being able to do it under pressure is where most of the real learning happens, and it takes a lot of patience to properly build a skill over time while also excelling at a day job.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
