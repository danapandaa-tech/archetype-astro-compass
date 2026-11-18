import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_QUESTIONS, calculateCalling, type CallingId, type CallingResult } from "@/lib/assessment";

export function CallingAssessment({ onBack, onComplete }: { onBack: () => void; onComplete: (result: CallingResult) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(CallingId | undefined)[]>([]);
  const question = ASSESSMENT_QUESTIONS[step];
  if (!question) return null;
  const selected = answers[step];
  function next() {
    if (!selected) return;
    if (step < ASSESSMENT_QUESTIONS.length - 1) { setStep(step + 1); return; }
    onComplete(calculateCalling(answers.map(answer => answer ?? "")));
  }
  return <div className="w-full max-w-3xl">
    <Button variant="ghost" onClick={onBack}><ArrowLeft />Leave the inquiry</Button>
    <header className="mt-6 text-center">
      <p className="text-sm text-gold">The Guided Calling Assessment</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Which archetype is calling you?</h1>
      <p className="mt-3 text-sm text-muted-foreground">A reflection on this moment, not a fixed identity or a prediction.</p>
    </header>
    <div className="mt-8 flex items-center gap-4"><div role="progressbar" aria-label="Inquiry progress" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={5} className="flex flex-1 gap-2">{ASSESSMENT_QUESTIONS.map((_, i) => <span key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-teal" : "bg-border"}`} />)}</div><span className="text-sm text-gold">{step + 1} / 5</span></div>
    <fieldset key={step} className="fade-in mt-7 border-y border-border py-7">
      <legend className="sr-only">{question.question}</legend>
      <p className="text-xs uppercase tracking-widest text-teal">{question.dimension}</p>
      <h2 className="mt-3 font-display text-3xl" tabIndex={-1} ref={node => node?.focus()}>{question.question}</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">{question.options.map(option => <label key={option.archetype} className={`flex min-h-20 cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors focus-within:ring-2 focus-within:ring-ring ${selected === option.archetype ? "border-teal bg-accent/10" : "border-border bg-card/40"}`}>
        <input type="radio" name={`question-${step}`} value={option.archetype} checked={selected === option.archetype} onChange={() => setAnswers(previous => { const nextAnswers = [...previous]; nextAnswers[step] = option.archetype; return nextAnswers; })} className="sr-only" />
        <span className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${selected === option.archetype ? "border-teal text-teal" : "border-border"}`} aria-hidden="true">{selected === option.archetype && <Check size={13} />}</span>
        <span className="text-sm leading-relaxed">{option.text}</span>
      </label>)}</div>
    </fieldset>
    <div className="mt-6 flex items-center justify-between gap-3"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft />Previous</Button><Button disabled={!selected} onClick={next} className="h-auto whitespace-normal py-3">{step === 4 ? <Sparkles /> : null}{step === 4 ? "Reveal my calling" : "Continue"}<ArrowRight /></Button></div>
    <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Your answers stay private to this visit. Each choice has equal weight; if patterns tie, your later answers decide, beginning with the gift you want to embody.</p>
  </div>;
}