import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { MessagesSquare, Wallet, KeyRound, ArrowRight } from "lucide-react";
import { waLink } from "@/data/content";
import { scrollToId } from "@/utils/scroll";
import Reveal from "@/components/Reveal";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";

const STEPS = [
    {
        n: "01",
        title: "Briefing sense tecnicismes",
        copy: "Ens expliques què fas i què vols aconseguir. Un cafè, una hora, i sortim amb objectius clars i pressupost tancat.",
    },
    {
        n: "02",
        title: "Prototip en viu",
        copy: "En uns 5 dies veus el disseny real, dins del navegador. Pots clickar-hi, no imaginar-ho sobre un PDF.",
    },
    {
        n: "03",
        title: "Producció i continguts",
        copy: "Codi net, textos revisats i velocitat extrema. Va veient l'avanç per camí, sense posts de sorpresa.",
    },
    {
        n: "04",
        title: "Llançament i formació",
        copy: "Publiquem la web, te'n donem les claus i t'ensenyem a fer-hi canvis. Després, si cal, hi som.",
    },
];

const Counter = ({ to, prefix = "", suffix = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const [val, setVal] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (!inView || reduce) return;
        const controls = animate(0, to, {
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, to, reduce]);

    return (
        <span ref={ref}>
            {prefix}
            {reduce ? to : val}
            {suffix}
        </span>
    );
};

const STATS = [
    { value: <Counter to={1} prefix="<\u00A0" suffix="\u00A0s" />, label: "Temps mitjà de càrrega" },
    { value: "10-15 dies", label: "Termini mig d'entrega" },
    { value: <Counter to={100} suffix="%" />, label: "Codi propi, sense plantilles" },
    { value: "0 €", label: "Comissions per cada venda" },
];

const WHY = [
    {
        icon: MessagesSquare,
        text: "Parles directament amb qui dissenya i programa el teu projecte. Cap gestor de comptes al mig.",
    },
    {
        icon: Wallet,
        text: "Preu tancat per escrit abans de començar. El que signes és el que pagues.",
    },
    {
        icon: KeyRound,
        text: "La web és teva: codi, domini i continguts. Sense captivitat ni lletigosis.",
    },
];

export const HowItWorks = () => {
    const { t } = useLanguage();
    const steps = t("how.steps");
    const stats = t("how.stats");
    const why = t("how.why");
    return (
    <section
        id="com-funciona"
        data-testid="how-it-works-section"
        className="bg-navy text-white py-24 lg:py-32"
    >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl">
                <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-turquoise-light">
                    {t("how.eyebrow")}
                </p>
                <h2 className="mt-4 font-display font-bold tracking-tight text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06]">
                    {t("how.title")}
                </h2>
            </div>

            <div className="mt-14">
                {steps.map(([title, copy], i) => {
                    const number = String(i + 1).padStart(2, "0");
                    return (
                    <Reveal key={number} delay={i * 0.05}>
                        <div
                            data-testid={`step-card-${number}`}
                            className="grid md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1.4fr)] gap-4 md:gap-10 items-start border-t border-white/10 py-9"
                        >
                            <span className="ghost-number font-display font-black text-6xl md:text-7xl leading-none">
                                {number}
                            </span>
                            <h3 className="font-display font-bold text-2xl tracking-tight">
                                {title}
                            </h3>
                            <p className="text-mist leading-relaxed">{copy}</p>
                        </div>
                    </Reveal>
                    );
                })}
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
                {stats.map((label, i) => (
                    <Reveal key={label} delay={i * 0.06}>
                        <div data-testid={`stat-counter-${i}`}>
                            <p className="font-display font-bold text-4xl sm:text-5xl text-turquoise-light tracking-tight">
                                {STATS[i].value}
                            </p>
                            <p className="mt-2 text-sm text-mist">{label}</p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <div className="mt-14 grid sm:grid-cols-3 gap-6">
                {why.map((text, i) => {
                    const Icon = [MessagesSquare, Wallet, KeyRound][i];
                    return (
                        <Reveal key={text} delay={i * 0.06}>
                            <div className="rounded-2xl border border-white/10 bg-navy-surface/50 p-6 h-full">
                                <Icon size={22} className="text-turquoise" />
                                <p className="mt-4 text-sm leading-relaxed text-mist">
                                    {text}
                                </p>
                            </div>
                        </Reveal>
                    );
                })}
            </div>

            <Reveal className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    data-testid="how-works-cta"
                    onClick={() => scrollToId("contacte")}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-turquoise px-8 h-14 font-semibold text-navy hover:bg-turquoise-light active:scale-[0.98] transition-all"
                >
                    {t("how.cta")}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <a
                    href={waLink("Hola Webilo! Vull parlar d'una web.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-white/25 px-8 h-14 font-semibold hover:bg-white/5 transition-all"
                >
                    <WhatsAppIcon size={18} />
                    WhatsApp
                </a>
            </Reveal>
        </div>
    </section>
    );
};

export default HowItWorks;
