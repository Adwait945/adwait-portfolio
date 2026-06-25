export default function Education() {
  return (
    <section className="py-16 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Education</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <p className="font-bold text-white mb-1">Master of Science, Management Information Systems</p>
            <p className="text-sm text-slate-400">University of Houston–Clear Lake</p>
            <p className="text-sm text-slate-500 mt-1">2010</p>
          </div>

          <div>
            <p className="font-bold text-white mb-1">Bachelor of Engineering, Electronics</p>
            <p className="text-sm text-slate-400">University of Mumbai, India</p>
            <p className="text-sm text-slate-500 mt-1">2007</p>
          </div>
        </div>
      </div>
    </section>
  );
}
