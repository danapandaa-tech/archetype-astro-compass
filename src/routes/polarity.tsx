import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeftRight, Sun } from "lucide-react";
import { CosmicShell } from "@/components/cosmic-shell";
import { Button } from "@/components/ui/button";
import { ARCHETYPES } from "@/lib/archetypes";
import { calculateProfile } from "@/lib/scanner";
import { CLASSIC_PAIRS, polarityReading } from "@/lib/reflections";

export const Route = createFileRoute("/polarity")({
  validateSearch: (search: Record<string, unknown>): { calling?: string | undefined } => ({ calling: typeof search["calling"] === "string" && ARCHETYPES.some(a => a.id === search["calling"]) ? search["calling"] : undefined }),
  head: () => ({ meta: [
    { title: "Polarity & Integration — The Archetype Compass" },
    { name: "description", content: "Explore creative tension, shadow, and integration between two archetypes or your birth Sun and current calling." },
    { property: "og:title", content: "Polarity & Integration — The Archetype Compass" },
    { property: "og:description", content: "Give two archetypal patterns a voice and find an everyday practice that honours both." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Polarity,
});

function Polarity() {
  const { calling } = Route.useSearch();
  const [mode, setMode] = useState("choose");
  const [first, setFirst] = useState("innocent");
  const [second, setSecond] = useState(calling ?? "lover");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [offset, setOffset] = useState(0);
  const [solar, setSolar] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [voiceA, setVoiceA] = useState("");
  const [voiceB, setVoiceB] = useState("");
  const [agreement, setAgreement] = useState("");
  const firstId = mode === "birth" ? solar : first;
  const reading = firstId ? polarityReading(firstId, second) : null;
  function reveal(event: FormEvent) {
    event.preventDefault();
    try { setSolar(calculateProfile(dob, time, offset).sun.archetype); setError(""); }
    catch { setSolar(null); setError("Check your birth date, time, and UTC offset."); }
  }
  function resetDialogue() { setVoiceA(""); setVoiceB(""); setAgreement(""); }
  return <CosmicShell>
    <header className="py-10 text-center"><p className="text-sm text-gold">Archetypal Polarities & Shadow Dialogue</p><h1 className="mt-3 font-display text-4xl md:text-5xl">Polarity & Integration</h1><p className="mt-4 font-display text-xl italic text-teal">Two patterns. Neither has to disappear.</p></header>
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pairing mode">
      <Button variant={mode === "choose" ? "default" : "outline"} aria-pressed={mode === "choose"} onClick={() => { setMode("choose"); resetDialogue(); }}>Choose two</Button>
      <Button variant={mode === "birth" ? "default" : "outline"} aria-pressed={mode === "birth"} onClick={() => { setMode("birth"); resetDialogue(); }}><Sun />Birth Sun & calling</Button>
    </div>
    {mode === "choose" && <section className="mt-8 border-y border-border py-6"><h2 className="text-sm text-gold">Classic polarities · Reflection wheel</h2><div className="mt-3 flex flex-wrap gap-2">{CLASSIC_PAIRS.map(pair => <Button key={pair.first} variant="outline" className="h-auto whitespace-normal py-3 text-left" onClick={() => { setFirst(pair.first); setSecond(pair.second); resetDialogue(); }}>{ARCHETYPES.find(a => a.id === pair.first)?.name.replace("The ", "")} & {ARCHETYPES.find(a => a.id === pair.second)?.name.replace("The ", "")}<span className="text-xs text-muted-foreground">{pair.axis}</span></Button>)}</div></section>}
    {mode === "birth" && <form onSubmit={reveal} className="mt-8 border-y border-border py-6"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm text-teal">Date of birth<input required type="date" min="1900-01-01" value={dob} onChange={e => { setDob(e.target.value); setSolar(null); resetDialogue(); }} className="scanner-input mt-2" /></label><label className="text-sm text-teal">Time of birth · optional<input type="time" value={time} onChange={e => { setTime(e.target.value); setSolar(null); resetDialogue(); }} className="scanner-input mt-2" /></label>{time && <label className="text-sm text-teal">UTC offset at birth<input type="number" min={-12} max={14} step={0.25} value={offset} onChange={e => { setOffset(Number(e.target.value)); setSolar(null); resetDialogue(); }} className="scanner-input mt-2" /><span className="mt-2 block text-xs text-muted-foreground">Include daylight saving for your birth year.</span></label>}</div><Button type="submit" className="mt-5"><Sun />Find my Sun archetype</Button>{error && <p role="alert" className="mt-3 text-destructive">{error}</p>}<p className="mt-4 text-xs leading-relaxed text-muted-foreground">The birth Sun uses the scanner’s book correspondence, separate from the reflection wheel’s zodiac pairs. Without a birth time, the calculation uses noon UTC; near a sign boundary the result may vary.</p></form>}
    <div className="mt-8 grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
      {mode === "choose" ? <label className="min-w-0 text-sm text-teal">First archetype<select value={first} onChange={e => { setFirst(e.target.value); resetDialogue(); }} className="scanner-input mt-2">{ARCHETYPES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label> : <div><p className="text-sm text-gold">Birth Sun archetype</p><p className="mt-3 font-display text-2xl">{ARCHETYPES.find(a => a.id === solar)?.name ?? "Awaiting your birth date"}</p></div>}
      <ArrowLeftRight className="mx-auto mb-3 text-gold" aria-hidden="true" />
      <label className="min-w-0 text-sm text-teal">{mode === "birth" ? "Current calling archetype" : "Second archetype"}<select aria-label={mode === "birth" ? "Current calling archetype" : "Second archetype"} value={second} onChange={e => { setSecond(e.target.value); resetDialogue(); }} className="scanner-input mt-2">{ARCHETYPES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></label>
    </div>
    {firstId === second && <p role="status" className="mt-5 text-gold">Both voices are the same pattern. Choose a different archetype to explore their creative tension.</p>}
    {reading && <div key={`${firstId}:${second}`} className="fade-in mt-10" aria-live="polite">
      <div className="polarity-band flex flex-wrap items-center justify-center gap-4 border-y border-border py-7 text-center"><h2 className="font-display text-3xl text-gold">{reading.first.name}</h2><ArrowLeftRight className="text-teal" /><h2 className="font-display text-3xl text-teal">{reading.second.name}</h2></div>
      {[ ["The creative tension", reading.tension], ["When a voice is denied", reading.shadow], ["An everyday integration", reading.integration] ].map(([title, text]) => <section key={title} className="border-b border-border py-6"><h3 className="font-display text-2xl text-gold">{title}</h3><p className="mt-3 leading-relaxed">{text}</p></section>)}
      <section className="mt-8"><h2 className="font-display text-3xl">Shadow dialogue</h2><div className="mt-5 grid gap-6 md:grid-cols-2"><div><p className="text-sm text-gold">{reading.first.name}</p><p className="mt-2 font-display text-xl italic">“{reading.firstVoice}”</p><label htmlFor="voice-a" className="mt-4 block text-sm text-teal">If this part could speak, what would it ask for?</label><textarea id="voice-a" rows={4} value={voiceA} onChange={e => setVoiceA(e.target.value)} className="scanner-input mt-2 resize-y" /></div><div><p className="text-sm text-teal">{reading.second.name}</p><p className="mt-2 font-display text-xl italic">“{reading.secondVoice}”</p><label htmlFor="voice-b" className="mt-4 block text-sm text-teal">What does this part fear losing?</label><textarea id="voice-b" rows={4} value={voiceB} onChange={e => setVoiceB(e.target.value)} className="scanner-input mt-2 resize-y" /></div></div><label htmlFor="agreement" className="mt-6 block text-sm text-gold">One agreement that honours both voices today</label><textarea id="agreement" rows={3} value={agreement} onChange={e => setAgreement(e.target.value)} className="scanner-input mt-2 resize-y" /></section>
    </div>}
    <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">Symbolic reflection, not a diagnosis. Birth details and dialogue stay private to this open page and are cleared when you leave or refresh.</p>
  </CosmicShell>;
}