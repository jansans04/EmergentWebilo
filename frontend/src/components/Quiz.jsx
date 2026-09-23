import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronDown, HelpCircle, RotateCcw } from "lucide-react";
import { QUIZ, QUIZ_RATIONALE, SERVICES } from "@/data/content";
import { cn } from "@/lib/utils";

const PRIORITY = ["professional", "botiga", "aparador"];

const scoreAnswers = (answers) => {
    const totals = { aparador: 0, professional: 0, botiga: 0 };
    QUIZ.forEach((step, i) => {
        const opt = step.options[answers[i]];
        if (!opt) return;
        Object.entries(opt.score).forEach(([k, v]) => (totals[k] += v));
    });
    return PRIORITY.reduce(
        (best, id) => (totals[id] > totals[best] ? id : best),
        "professional",
    );
};

export const Quiz = ({ onWant }) => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const done = step >= QUIZ.length;
    const resultId = useMemo(() => (done ? scoreAnswers(answers) : null), [done, answers]);
    const result = SERVICES.find((s) => s.id === resultId);

    const pick = (optIndex) => {
        setAnswers((a) => ({ ...a, [step]: optIndex }));
        setStep((s) => s + 1);
    };
    const reset = () => {
        setAnswers({});
        setStep(0);
    };

    return (
        <section
            id="quiz"
            data-testid="service-quiz-section"
            className="bg-azure/60 px-5 pb-24 lg:pb-32"
        >
            <div className="mx-auto max-w-4xl rounded-3xl bg-white border border-slate-200 shadow-soft p-6 sm:p-10">                <button
                    data-testid="quiz-toggle-button"
                    onClick={() => setOpen((o) => !o)}
                    className="w-full flex items-center justify-between gap-6 text-left group"
                >
                    <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-turquoise-tint text-turquoise-dark shrink-0">
                            <HelpCircle size={22} />
                        </span>
                        <div>
                            <h2 className="font-display font-bold text-2xl tracking-tight text-navy">
                                No saps què necessites?
                            </h2>
                            <p className="text-sm text-slateblue mt-0.5">
                                Tres preguntes, trenta segons, cap registre.
                            </p>
                        </div>
                    </div>
                    <ChevronDown
                        size={22}
                        className={cn(
                            "text-turquoise-dark transition-transform duration-300 shrink-0",
                            open && "rotate-180",
                        )}
                    />
                </button>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            data-testid="quiz-step-container"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="pt-8">
                                {!done ? (
                                    <div>
                                        <p className="font-mono text-[11px] uppercase tracking-widest text-turquoise-dark">
                                            Pregunta {step + 1} / {QUIZ.length}
                                        </p>
                                        <div className="mt-3 flex gap-1.5">
                                            {QUIZ.map((_, i) => (
                                                <span
                                                    key={i}
                                                    className={cn(
                                                        "h-1.5 rounded-full transition-all duration-300",
                                                        i <= step ? "w-10 bg-turquoise" : "w-10 bg-navy/10",
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <h3 className="mt-6 font-display font-bold text-2xl text-navy">
                                            {QUIZ[step].q}
                                        </h3>
                                        <div className="mt-5 grid sm:grid-cols-2 gap-3">
                                            {QUIZ[step].options.map((opt, i) => (
                                                <button
                                                    key={opt.label}
                                                    data-testid={`quiz-option-${step}-${i}`}
                                                    onClick={() => pick(i)}
                                                    className="rounded-xl border border-slate-200 p-4 text-left text-sm font-medium text-navy hover:border-turquoise hover:bg-turquoise-tint active:scale-[0.99] transition-all"
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                        {step > 0 && (
                                            <button
                                                data-testid="quiz-back-button"
                                                onClick={() => setStep((s) => s - 1)}
                                                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slateblue hover:text-navy"
                                            >
                                                <ArrowLeft size={15} />
                                                Pregunta anterior
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        data-testid="quiz-result-card"
                                        className="rounded-2xl bg-navy text-white p-8 sm:p-10"
                                    >
                                        <p className="font-mono text-[11px] uppercase tracking-widest text-turquoise-light">
                                            El teu resultat
                                        </p>
                                        <h3 className="mt-3 font-display font-bold text-3xl text-turquoise-light">
                                            {result.name}
                                        </h3>
                                        <p className="mt-4 text-mist leading-relaxed max-w-2xl">
                                            {QUIZ_RATIONALE[resultId]}
                                        </p>
                                        <p className="mt-4 font-mono text-xs text-white/50">
                                            Des de {result.price} € · entrega en {result.timeframe}
                                        </p>
                                        <div className="mt-7 flex flex-wrap gap-3">
                                            <button
                                                data-testid="quiz-cta-want"
                                                onClick={() => onWant(resultId)}
                                                className="rounded-xl bg-turquoise text-navy font-semibold px-6 py-3.5 hover:bg-turquoise-light active:scale-[0.98] transition-all"
                                            >
                                                Demana pressupost
                                            </button>
                                            <button
                                                data-testid="quiz-restart-button"
                                                onClick={reset}
                                                className="inline-flex items-center gap-2 rounded-xl border border-white/25 font-semibold px-6 py-3.5 hover:bg-white/5 transition-all"
                                            >
                                                <RotateCcw size={15} />
                                                Torna a començar
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Quiz;
