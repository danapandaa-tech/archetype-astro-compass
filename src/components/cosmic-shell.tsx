import { Link } from "@tanstack/react-router";
import { useMemo, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Stars() {
  const stars = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    x: (i * 73.13) % 100, y: (i * 41.7 + i * i * 0.37) % 100, s: (i % 3) + 1, d: (i % 7) * 0.6,
  })), []);
  return <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
    {stars.map((s, i) => <span key={i} className="star absolute rounded-full bg-foreground" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />)}
  </div>;
}

export function CosmicShell({ children }: { children: ReactNode }) {
  return <main className="relative min-h-screen bg-cosmic text-foreground">
    <Stars />
    <div className="relative z-10 mx-auto max-w-4xl px-5 py-8 md:py-12">
      <nav className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5" aria-label="Companion">
        <Button asChild variant="ghost"><Link to="/" search={{ view: "compass" }}><ArrowLeft />The compass</Link></Button>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="ghost"><Link to="/oracle">Today’s Mirror</Link></Button>
          <Button asChild variant="ghost"><Link to="/polarity">Polarity & Integration</Link></Button>
        </div>
      </nav>
      {children}
    </div>
  </main>;
}