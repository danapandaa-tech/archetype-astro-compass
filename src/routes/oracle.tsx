import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Shuffle, Sunrise, Sunset } from "lucide-react";
import { CosmicShell } from "@/components/cosmic-shell";
import { Button } from "@/components/ui/button";
import { ARCHETYPES } from "@/lib/archetypes";
import { dailyRuler, drawArchetype, REFLECTIONS } from "@/lib/reflections";

export const Route = createFileRoute("/oracle")({
  head: () => ({ meta: [
    { title: "Today’s Mirror — The Archetype Compass" },
    { name: "description", content: "A daily archetypal ritual with planetary weekday rulers, a card draw, and morning and evening reflections." },
    { property: "og:title", content: "Today’s Mirror — The Archetype Compass" },
    { property: "og:description", content: "Meet today’s guiding archetype and reflect with a private morning and evening journal." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Oracle,
});

function Oracle() {
  const [today, setToday] = useState<ReturnType<typeof dailyRuler> | null>(null);
  const [draw, setDraw] = useState<string | null>(null);
  const [mode, setMode] = useState("ruler");
  const [morning, setMorning] = useState("");
  const [evening, setEvening] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const next = dailyRuler(now, -now.getTimezoneOffset());
      setToday(next);
    };
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => { setDraw(null); setMorning(""); setEvening(""); }, [today?.date]);
  const archetype = ARCHETYPES.find(a => a.id === (mode === "draw" ? draw : today?.archetype));
  const reflection = archetype ? REFLECTIONS[archetype.id] : null;
  function download() {
    if (!today || !archetype) return;
    const blob = new Blob([`Today’s Mirror · ${today.date}\n${archetype.name}\n\nMorning\n${reflection?.morning}\n${morning}\n\nEvening\n${reflection?.evening}\n${evening}`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = `todays-mirror-${today.date}.txt`; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <CosmicShell>
    <header className="py-10 text-center">
      <p className="text-sm text-gold">Daily Oracle · Transit Draw</p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">Today’s Mirror</h1>
      <p className="mt-3 text-muted-foreground">{today ? `${today.day} · ${today.date}` : "Meeting the day…"}</p>
    </header>
    <div className="mb-8 flex justify-center gap-2" role="group" aria-label="Daily ritual">
      <Button variant={mode === "ruler" ? "default" : "outline"} aria-pressed={mode === "ruler"} onClick={() => setMode("ruler")}>Planetary day</Button>
      <Button variant={mode === "draw" ? "default" : "outline"} aria-pressed={mode === "draw"} onClick={() => setMode("draw")}>Card draw</Button>
    </div>
    {mode === "draw" && <div className="mb-7 text-center"><Button onClick={() => { setDraw(drawArchetype(Math.random())?.id ?? "hero"); }} className="btn-glow h-auto"><Shuffle />{draw ? "Draw again" : "Draw my card"}</Button></div>}
    {archetype && reflection && <div className="fade-in" aria-live="polite">
      <section className="oracle-card mx-auto flex max-w-sm flex-col items-center rounded-lg px-7 py-9 text-center">
        <span className="text-5xl text-gold" aria-hidden="true">{mode === "ruler" ? today?.symbol : archetype.glyph}</span>
        <p className="mt-4 text-xs uppercase tracking-widest text-gold">{mode === "ruler" ? `${today?.planet} · Day ruler` : "Your drawn archetype"}</p>
        <h2 className="mt-3 font-display text-4xl">{archetype.name}</h2>
        <p className="mt-4 font-display text-xl italic text-teal">{archetype.desire}</p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{archetype.calls}</p>
      </section>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section className="border-t border-border pt-6"><h2 className="flex items-center gap-2 font-display text-2xl text-gold"><Sunrise size={22} />Morning contemplation</h2><p className="mt-4 min-h-20 leading-relaxed">{reflection.morning}</p><label htmlFor="morning" className="mt-4 block text-sm text-teal">My intention</label><textarea id="morning" value={morning} onChange={e => setMorning(e.target.value)} rows={5} className="scanner-input mt-2 resize-y" /></section>
        <section className="border-t border-border pt-6"><h2 className="flex items-center gap-2 font-display text-2xl text-teal"><Sunset size={22} />Evening reflection</h2><p className="mt-4 min-h-20 leading-relaxed">{reflection.evening}</p><label htmlFor="evening" className="mt-4 block text-sm text-teal">What I noticed</label><textarea id="evening" value={evening} onChange={e => setEvening(e.target.value)} rows={5} className="scanner-input mt-2 resize-y" /></section>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><p className="max-w-md text-xs text-muted-foreground">Private to this open page. Notes disappear when you leave or refresh; download them to keep a copy.</p><Button variant="outline" onClick={download}><Download />Download reflections</Button></div>
    </div>}
    <p className="mt-10 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">A symbolic mirror, not a prediction. The planetary ritual follows your local weekday, not live planetary transits. Card draws are random and may repeat.</p>
  </CosmicShell>;
}