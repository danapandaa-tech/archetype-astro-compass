import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARCHETYPES, sunSign, type Archetype } from "@/lib/archetypes";
import { ArchetypeScanner } from "@/components/archetype-scanner";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/cosmic-shell";
import { ArrowLeftRight, Orbit } from "lucide-react";
import { CallingAssessment } from "@/components/calling-assessment";
import { type CallingResult } from "@/lib/assessment";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { view?: "compass" | undefined } => ({ view: search["view"] === "compass" ? "compass" : undefined }),
  head: () => ({
    meta: [
      { title: "The Archetype Compass — Astro-Psychology Companion" },
      { name: "description", content: "Discover which of the book’s twelve archetypes is calling you now, and what its zodiac mirror reflects." },
      { property: "og:title", content: "The Archetype Compass" },
      { property: "og:description", content: "Which archetype is guiding you right now? A reflective book companion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "landing" | "compass" | "mirror" | "card" | "scanner" | "assessment";

function Index() {
  const { view } = Route.useSearch();
  const [stage, setStage] = useState<Stage>(view === "compass" ? "compass" : "landing");
  const [active, setActive] = useState<Archetype | null>(null);
  const [calling, setCalling] = useState<CallingResult | null>(null);
  const [assessmentOrigin, setAssessmentOrigin] = useState<"landing" | "compass">("landing");
  const startAssessment = (origin: "landing" | "compass") => { setAssessmentOrigin(origin); setStage("assessment"); };
  return (
    <main className="relative min-h-screen overflow-hidden bg-cosmic text-foreground">
      <Stars />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 py-12">
        {stage !== "landing" && stage !== "assessment" && <nav className="mb-8 flex flex-wrap justify-center gap-3" aria-label="Reflection rituals">
          <Button asChild variant="outline"><Link to="/oracle"><Orbit />Today’s Mirror</Link></Button>
          <Button asChild variant="outline"><Link to="/polarity" search={{ calling: active?.id }}><ArrowLeftRight />Polarity & Integration</Link></Button>
        </nav>}
        {stage === "landing" && <Landing onBegin={() => setStage("compass")} onAssess={() => startAssessment("landing")} />}
        {stage === "assessment" && <CallingAssessment onBack={() => setStage(assessmentOrigin)} onComplete={result => { setCalling(result); setActive(result.primary); setStage("mirror"); window.scrollTo({ top: 0, behavior: "instant" }); }} />}
        {stage === "scanner" && <ArchetypeScanner onBack={() => setStage("compass")} />}
        {stage === "compass" && <Button variant="outline" className="mb-8" onClick={() => setStage("scanner")}>Discover my birth profile</Button>}
        {stage === "compass" && <Button variant="outline" className="mb-8 h-auto whitespace-normal text-center" onClick={() => startAssessment("compass")}>Discover which archetype is calling me</Button>}
        {stage === "compass" && <Compass active={active} setActive={setActive} onChoose={(a) => { setCalling(null); setActive(a); setStage("mirror"); }} />}
        {stage === "mirror" && active && <Mirror a={active} calling={calling} onBack={() => setStage("compass")} onCard={() => setStage("card")} onScan={() => setStage("scanner")} />}
        {stage === "card" && active && <ShareCard a={active} calling={calling} onBack={() => setStage("mirror")} onRestart={() => { setCalling(null); setActive(null); setStage("compass"); }} onScan={() => setStage("scanner")} />}
      </div>
    </main>
  );
}

function Landing({ onBegin, onAssess }: { onBegin: () => void; onAssess: () => void }) {
  return (
    <div className="fade-in text-center">
      <p className="mb-6 text-xs uppercase tracking-[0.4em] text-teal">The Archetype Compass</p>
      <h1 className="font-display text-4xl leading-tight md:text-6xl">
        Which archetype is <span className="text-gradient italic">guiding you</span> right now?
      </h1>
      <p className="mx-auto mt-6 max-w-md text-muted-foreground">
        Twelve patterns of the psyche, twelve signs of the sky. Not a prediction — a mirror.
      </p>
      <div className="mt-10 flex justify-center"><Button onClick={onBegin} className="btn-glow h-auto whitespace-normal">Begin</Button></div>
      <div className="mt-4 flex justify-center"><Button variant="ghost" onClick={onAssess} className="h-auto max-w-full whitespace-normal py-3 text-teal">Discover which archetype is calling me</Button></div>
    </div>
  );
}

function Compass({ active, setActive, onChoose }: { active: Archetype | null; setActive: (a: Archetype) => void; onChoose: (a: Archetype) => void }) {
  const [birth, setBirth] = useState("");
  const hint = useMemo(() => {
    if (!birth) return null;
    const [, m, d] = birth.split("-").map(Number);
    const s = sunSign(m ?? 1, d ?? 1);
    return ARCHETYPES.find((a) => a.sign === s) ?? null;
  }, [birth]);
  const R = 200, r = 78, C = 220;
  const seg = (i: number) => {
    const a0 = ((i * 30 - 90 - 15) * Math.PI) / 180, a1 = ((i * 30 - 90 + 15) * Math.PI) / 180;
    const p = (rad: number, a: number) => `${C + rad * Math.cos(a)} ${C + rad * Math.sin(a)}`;
    return `M ${p(r, a0)} L ${p(R, a0)} A ${R} ${R} 0 0 1 ${p(R, a1)} L ${p(r, a1)} A ${r} ${r} 0 0 0 ${p(r, a0)} Z`;
  };
  return (
    <div className="fade-in grid w-full items-center gap-10 md:grid-cols-[1.2fr_1fr]">
      <div>
        <svg viewBox="0 0 440 440" className="mx-auto w-full max-w-[480px] drop-shadow-glow">
          <defs>
            <linearGradient id="segGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--purple)" /><stop offset="100%" stopColor="var(--teal)" />
            </linearGradient>
            <radialGradient id="core"><stop offset="0%" stopColor="var(--electric)" /><stop offset="100%" stopColor="var(--background)" /></radialGradient>
          </defs>
          <circle cx={C} cy={C} r={212} fill="none" stroke="url(#segGrad)" strokeOpacity="0.5" />
          {ARCHETYPES.map((a, i) => {
            const ang = ((i * 30 - 90) * Math.PI) / 180, tr = 140;
            const on = active?.id === a.id, hinted = hint?.id === a.id;
            return (
              <g key={a.id} className="cursor-pointer" onClick={() => setActive(a)} role="button" aria-label={`${a.name} · ${a.sign}`}>
                <path d={seg(i)} className={`segment ${on ? "segment-on" : ""} ${hinted ? "segment-hint" : ""}`} style={{ animationDelay: `${i * 0.25}s` }} />
                <text x={C + tr * Math.cos(ang)} y={C + tr * Math.sin(ang) - 6} textAnchor="middle" className="fill-foreground text-[20px]">{a.glyph}</text>
                <text x={C + tr * Math.cos(ang)} y={C + tr * Math.sin(ang) + 12} textAnchor="middle" className="fill-muted-foreground text-[9px] uppercase tracking-widest">{a.name.replace("The ", "")}</text>
              </g>
            );
          })}
          <circle cx={C} cy={C} r={r - 6} fill="url(#core)" opacity="0.7" />
          <text x={C} y={C + 6} textAnchor="middle" className="fill-foreground font-display text-[16px]">{active ? active.sign : "Choose"}</text>
        </svg>
        <div className="mx-auto mt-4 flex max-w-sm flex-col items-center gap-2 text-sm">
          <label htmlFor="birth" className="text-muted-foreground">Optional: your birth date lights up your sun-sign archetype</label>
          <input id="birth" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="rounded-md border border-border bg-card/60 px-3 py-2 text-foreground" />
          {hint && <button className="text-teal underline" onClick={() => setActive(hint)}>Sun in {hint.sign} → {hint.name}</button>}
        </div>
      </div>
      <div className="glass min-h-[280px] rounded-2xl p-7">
        {active ? (
          <div key={active.id} className="fade-in">
            <p className="text-xs uppercase tracking-[0.3em] text-teal">{active.glyph} {active.sign} · {active.dateRange}</p>
            <h2 className="mt-2 font-display text-3xl text-gradient">{active.name}</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-muted-foreground">Gift</dt><dd className="text-base">{active.gift}</dd></div>
              <div><dt className="text-muted-foreground">Shadow side</dt><dd className="text-base">{active.shadow}</dd></div>
              <div><dt className="text-muted-foreground">Developmental task</dt><dd className="font-display text-lg italic">“{active.developmentalTask}”</dd></div>
            </dl>
            <button onClick={() => onChoose(active)} className="btn-glow mt-6 w-full">This one is calling me</button>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center text-muted-foreground">
            <h2 className="font-display text-2xl text-foreground">Browse the wheel</h2>
            <p className="mt-3">Tap any segment to read its pattern. Take your time — notice which one makes you pause.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CallingInvitation({ calling }: { calling: CallingResult }) {
  return <section className="mt-8 border-y border-border py-6">
    <p className="text-sm text-gold">Your guided calling · {calling.primaryScore} of 5 choices</p>
    {calling.tied && <p className="mt-2 text-sm text-muted-foreground">More than one pattern resonated equally; your later answers brought this one forward.</p>}
    <h3 className="mt-3 font-display text-2xl">Shadow invitation · {calling.shadow.name}</h3>
    <p className="mt-3 leading-relaxed">{calling.invitation}</p>
    <p className="mt-3 text-xs text-muted-foreground">{calling.shadowSource === "secondary" ? "This second voice also appeared in your answers; it is an invitation, not a label." : "With one pattern throughout, this complementary voice offers a balancing invitation."}</p>
  </section>;
}

function Mirror({ a, calling, onBack, onCard, onScan }: { a: Archetype; calling: CallingResult | null; onBack: () => void; onCard: () => void; onScan: () => void }) {
  const parts = [
    ["Gift", a.gift, "from-purple"],
    ["Shadow", a.shadow, "from-electric"],
    ["Developmental task", a.developmentalTask, "from-teal"],
  ] as const;
  return (
    <div className="fade-in w-full max-w-2xl">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-teal">{a.glyph} {a.sign} · The Mirror</p>
      <h2 className="mt-2 text-center font-display text-4xl md:text-5xl text-gradient">{a.name}</h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">You are not {a.name.toLowerCase()}. This pattern is calling you right now.</p>
      <div className="mt-10 space-y-5">
        {parts.map(([t, body, c], i) => (
          <section key={t} className="glass fade-in relative overflow-hidden rounded-2xl p-6" style={{ animationDelay: `${0.2 + i * 0.25}s` }}>
            <span className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${c} to-transparent`} />
            <h3 className="text-xs uppercase tracking-[0.25em] text-teal">{t}</h3>
            <p className={`mt-3 leading-relaxed ${i === 2 ? "font-display text-xl italic" : "text-lg"}`}>{body}</p>
          </section>
        ))}
      </div>
      {calling && <CallingInvitation calling={calling} />}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={onBack} className="btn-ghost">Back to the wheel</button>
        <button onClick={onCard} className="btn-glow">Create my card</button>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">Want to go deeper?</p>
      <div className="mt-3 flex justify-center"><button onClick={onScan} className="btn-ghost">Discover your full birth profile</button></div>
    </div>
  );
}

function ShareCard({ a, calling, onBack, onRestart, onScan }: { a: Archetype; calling: CallingResult | null; onBack: () => void; onRestart: () => void; onScan: () => void }) {
  const download = () => {
    const W = 1080, H = 1350, cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const x = cv.getContext("2d");
    if (!x) return;
    const css = getComputedStyle(document.documentElement);
    const v = (n: string) => css.getPropertyValue(n).trim();
    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, v("--card-a")); g.addColorStop(0.55, v("--card-b")); g.addColorStop(1, v("--card-c"));
    x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.strokeStyle = v("--gold"); x.lineWidth = 2; x.strokeRect(50, 50, W - 100, H - 100);
    x.fillStyle = v("--gold"); x.textAlign = "center";
    x.font = "120px serif"; x.fillText(a.glyph, W / 2, 330);
    x.font = "34px sans-serif"; x.fillText(a.sign.toUpperCase(), W / 2, 420);
    x.font = "italic 88px Georgia, serif"; x.fillText(a.name, W / 2, 540);
    let y = 640;
    for (const [label, body] of [["GIFT", a.gift], ["SHADOW", a.shadow], ["DEVELOPMENTAL TASK", a.developmentalTask]]) {
      x.font = "24px sans-serif"; x.fillText(label ?? "", W / 2, y); y += 42;
      x.font = "34px Georgia, serif";
      let line = "";
      for (const word of (body ?? "").split(" ")) {
        const next = `${line}${word} `;
        if (x.measureText(next).width > 820) { x.fillText(line, W / 2, y); y += 44; line = `${word} `; } else line = next;
      }
      x.fillText(line, W / 2, y); y += 80;
    }
    const l = document.createElement("a"); l.download = `${a.id}-archetype.png`; l.href = cv.toDataURL("image/png"); l.click();
  };
  return (
    <div className="fade-in flex flex-col items-center">
      <div className="share-card flex min-h-[500px] w-[min(88vw,400px)] flex-col items-center justify-center rounded-lg p-6 text-center text-gold">
        <div className="text-6xl">{a.glyph}</div>
        <p className="mt-3 text-xs uppercase tracking-[0.4em]">{a.sign}</p>
        <h2 className="mt-4 font-display text-4xl italic">{a.name}</h2>
        <dl className="mt-5 space-y-4 text-sm">{[["Gift", a.gift], ["Shadow", a.shadow], ["Developmental task", a.developmentalTask]].map(([label, body]) => <div key={label}><dt className="text-xs uppercase opacity-75">{label}</dt><dd className="mt-1 font-display text-base">{body}</dd></div>)}</dl>
      </div>
      {calling && <div className="w-full max-w-2xl"><CallingInvitation calling={calling} /></div>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={onBack} className="btn-ghost">Back</button>
        <button onClick={download} className="btn-glow">Download card</button>
        <button onClick={onRestart} className="btn-ghost">Start again</button>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">Want to go deeper?</p>
      <div className="mt-3 flex justify-center"><button onClick={onScan} className="btn-ghost">Discover your full birth profile</button></div>
    </div>
  );
}
