import { Link } from "wouter";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-bold text-white tracking-tight hover:text-primary transition-colors"
        >
          Adwait Mulye
        </Link>
      </div>
    </nav>
  );
}
