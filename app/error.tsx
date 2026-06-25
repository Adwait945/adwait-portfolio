"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background text-foreground px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold">Something went wrong</h1>
      <p className="text-slate-400 max-w-md">
        An unexpected error occurred while rendering this page.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:opacity-90 font-bold px-8 rounded-xl h-12 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Try again
      </button>
    </main>
  );
}
