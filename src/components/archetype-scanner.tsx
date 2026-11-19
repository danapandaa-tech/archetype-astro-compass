import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole, Moon, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ARCH, DAYS, ELEMENTNOTE, ELEMENTS, LIFE, MODENOTE, MODES, MOON, SIGNNAME, SUNMOON, type Language } from "@/lib/scanner-copy";
import { calculateProfile, EXTENDED_READING_PRICE_GBP, type Profile } from "@/lib/scanner";

export function ArchetypeScanner({ onBack }: { onBack: () => void }) {
  const [lang, setLang] = useState<Language>("en");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [offset, setOffset] = useState(0);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");
  const fr = lang === "fr";
  function reveal(event: FormEvent) {
    event.preventDefault();
    try { setProfile(calculateProfile(dob, time, offset)); setError(""); }
    catch { setProfile(null); setError(fr ? "Vérifiez votre date et votre heure de naissance." : "Check your birth date and time."); }
  }
  const solar = profile ? ARCH[profile.sun.archetype] : null;
  const lunar = profile ? ARCH[profile.moon.archetype] : null;
  const day = profile ? DAYS[profile.dayIndex] : null;
  const SIGN_KEYS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] as const;
  const ELEMENT_KEYS = ["fire", "earth", "air", "water"] as const;
  const MODE_KEYS = ["cardinal", "fixed", "mutable"] as const;
  const sunIndex = profile ? SIGN_KEYS.indexOf(profile.sun.key) : 0;
  const moonIndex = profile ? SIGN_KEYS.indexOf(profile.moon.key) : 0;
  const sunElement = ELEMENT_KEYS[sunIndex % 4] ?? "fire";
  const sunMode = MODE_KEYS[sunIndex % 3] ?? "cardinal";
  const sunMoonTone = profile ? (sunIndex === moonIndex ? "same" : sunIndex % 4 === moonIndex % 4 ? "sameElement" : "different") : "different";
  return (
    <div className="fade-in w-full max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={onBack}><ArrowLeft />{fr ? "La boussole" : "The compass"}</Button>
        <Button variant="outline" onClick={() => setLang(fr ? "en" : "fr")}>{fr ? "English" : "Français"}</Button>
      </div>
      <header className="mt-8 text-center">
        <p className="text-sm text-teal">{fr ? "Compagnon du livre · Lecture gratuite" : "Book companion · Free reading"}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{fr ? "Votre profil d’archétypes" : "Your archetype profile"}</h1>
        <p className="mt-3 text-muted-foreground">{fr ? "Soleil, Lune et les nuances de votre chemin." : "Sun, Moon, and the nuances of your path."}</p>
      </header>
      <form onSubmit={reveal} className="mt-8 border-y border-border py-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm"><span className="block text-teal">{fr ? "Date de naissance" : "Date of birth"}</span><input required type="date" min="1900-01-01" value={dob} onChange={e => { setDob(e.target.value); setProfile(null); }} className="scanner-input" /></label>
          <label className="space-y-2 text-sm"><span className="block text-teal">{fr ? "Heure de naissance · facultative" : "Time of birth · optional"}</span><input type="time" value={time} onChange={e => { setTime(e.target.value); setProfile(null); }} className="scanner-input" /></label>
          {time && <label className="space-y-2 text-sm sm:col-span-2"><span className="block text-teal">{fr ? "Décalage UTC à la naissance" : "UTC offset at birth"}</span><input type="number" min={-12} max={14} step={0.25} value={offset} onChange={e => { setOffset(Number(e.target.value)); setProfile(null); }} className="scanner-input" /><span className="block text-xs text-muted-foreground">{fr ? "Ex. Paris en hiver : +1, en été : +2. Incluez l’heure d’été de votre année de naissance." : "e.g. Paris in winter: +1, in summer: +2. Include daylight saving for your birth year."}</span></label>}
        </div>
        <Button type="submit" size="lg" className="btn-glow mt-6 h-auto w-full whitespace-normal"><Sparkles />{fr ? "Révéler mon profil" : "Reveal my profile"}</Button>
        {error && <p role="alert" className="mt-3 text-destructive">{error}</p>}
      </form>
      {profile && solar && lunar && day && <div className="fade-in mt-8 space-y-7" aria-live="polite">
        <section className="border-b border-border pb-7">
          <p className="flex items-center gap-2 text-sm text-teal"><Sun size={18} />{fr ? "Archétype solaire" : "Solar archetype"} · {SIGNNAME[lang][profile.sun.key]}</p>
          <h2 className="mt-3 font-display text-3xl">{solar.name}</h2>
          
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-muted-foreground">{fr ? "Tâche développementale" : "Developmental task"}</dt><dd className="mt-1">{solar.developmentalTask[lang]}</dd></div><div><dt className="text-muted-foreground">{fr ? "Ombre à surveiller" : "Shadow to watch"}</dt><dd className="mt-1">{solar.shadow[lang]}</dd></div><div className="sm:col-span-2"><dt className="text-muted-foreground">{fr ? "Votre don" : "Your gift"}</dt><dd className="mt-1">{solar.gift[lang]}</dd></div></dl>
          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div><p className="text-muted-foreground">{fr ? "Élément" : "Element"} · {ELEMENTS[lang][sunElement]}</p><p className="mt-1 leading-relaxed">{ELEMENTNOTE[sunElement][lang]}</p></div>
            <div><p className="text-muted-foreground">{fr ? "Mode" : "Mode"} · {MODES[lang][sunMode]}</p><p className="mt-1 leading-relaxed">{MODENOTE[sunMode][lang]}</p></div>
          </div>
        </section>
        <section className="border-b border-border pb-7">
          <p className="flex items-center gap-2 text-sm text-teal"><Moon size={18} />{fr ? "Archétype lunaire" : "Moon archetype"} · {SIGNNAME[lang][profile.moon.key]}</p>
          <h2 className="mt-3 font-display text-3xl">{lunar.name}</h2>
          <p className="mt-3 leading-relaxed">{MOON[lang][profile.moon.key]}</p>
          <p className="mt-3 text-sm text-muted-foreground">{fr ? "Votre monde intérieur, vos besoins émotionnels et vos réactions spontanées." : "Your inner world, emotional needs, and spontaneous reactions."}</p>
          <div className="mt-4 border-l-2 border-teal pl-4">
            <p className="text-sm text-teal">{fr ? "Le dialogue Soleil–Lune" : "The Sun–Moon dialogue"}</p>
            <p className="mt-2 text-sm leading-relaxed">{SUNMOON[sunMoonTone][lang]}</p>
          </div>
        </section>
        <div className="grid gap-6 sm:grid-cols-2">
          <section><h2 className="text-sm text-teal">{fr ? "Décan" : "Decan blend"} · {profile.blend.decan}/3</h2><p className="mt-3 font-display text-2xl">{ARCH[profile.blend.sign.archetype]?.name}</p><p className="mt-2 text-sm text-muted-foreground">{fr ? "Une seconde teinte de" : "A second hue from"} {SIGNNAME[lang][profile.blend.sign.key]}{fr ? " colore votre archétype solaire." : " colours your solar archetype."}</p><p className="mt-2 text-sm leading-relaxed">{fr ? "Dans la tradition des décans, chaque signe se partage en trois tiers de dix degrés. Le vôtre emprunte les couleurs de" : "In the decan tradition, each sign divides into three ten-degree thirds. Yours borrows the colours of"} {SIGNNAME[lang][profile.blend.sign.key]}{fr ? ", ce qui ajoute la note «" : ", adding the note of “"}{ARCH[profile.blend.sign.archetype]?.gift[lang]}{fr ? "» à votre manière d’incarner" : "” to how you embody"} {solar.name}.</p></section>
          <section><h2 className="text-sm text-teal">{fr ? "Maître planétaire du jour" : "Planetary day ruler"}</h2><p className="mt-3 font-display text-2xl">{day.ruler[lang]} · {day[lang]}</p><p className="mt-2 text-sm text-muted-foreground">{day.note[lang]}</p></section>
          <section className="sm:col-span-2"><h2 className="text-sm text-teal">{fr ? "Sentier de vie" : "Life Path numerology"}</h2><p className="mt-3 font-display text-4xl text-gold">{profile.lifePath}</p><p className="mt-2 text-sm text-muted-foreground">{LIFE[lang][profile.lifePath as keyof typeof LIFE.en]}</p><p className="mt-2 text-sm leading-relaxed">{fr ? "Ce nombre se lit comme la trame de fond de votre parcours : il ne dit pas ce qui arrivera, mais ce qui revient — les leçons, les forces et les tentations qui rythment votre route." : "Read this number as the undercurrent of your journey: it does not say what will happen, but what returns — the lessons, strengths and temptations that pace your road."}</p></section>
        </div>
        <section className="border border-border bg-card/40 px-6 py-7">
          <div className="flex items-start justify-between gap-5"><div><p className="text-sm text-gold">{fr ? "Pour aller plus loin" : "A deeper reflection"}</p><h2 className="mt-2 font-display text-3xl">{fr ? "Votre lecture approfondie" : "Your extended reading"}</h2></div><span className="shrink-0 font-display text-4xl text-gold">£{EXTENDED_READING_PRICE_GBP}</span></div>
          <p className="mt-4 leading-relaxed text-muted-foreground">{fr ? "Explorez le dialogue entre votre Soleil et votre Lune, les nuances de votre décan et les thèmes de votre sentier de vie, avec des pistes de réflexion et de journal pour aller plus loin." : "Explore the dialogue between your Sun and Moon, the nuances of your decan, and your Life Path themes, with deeper reflections and personal journaling prompts."}</p>
          <p className="mt-3 text-sm text-muted-foreground">{fr ? "Paiement unique · Sans abonnement" : "One-time payment · No subscription"}</p>
          <Button disabled size="lg" className="mt-5 h-auto whitespace-normal py-3"><LockKeyhole />{fr ? "Lecture approfondie · Bientôt disponible" : "Extended reading · Coming soon"}<ArrowRight /></Button>
        </section>
        <p className="border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">{fr ? "Lecture symbolique, non prédictive. Sans heure de naissance, calcul à midi UTC : le signe lunaire peut changer dans la journée. Les décans suivent la tradition des signes de même élément. La numérologie réduit les chiffres à 1–9. Ce profil n’est pas un thème natal complet." : "A symbolic reflection, not a prediction. Sun signs follow the book’s fixed date ranges. Without a birth time, Moon and decan positions use noon UTC: the Moon sign may change during the day. Decans use the same-element sign tradition. Numerology reduces birth-date digits to 1–9. This is not a full natal chart."}</p>
      </div>}
    </div>
  );
}