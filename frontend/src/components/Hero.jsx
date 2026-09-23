import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { ArrowDown, ImageIcon } from "lucide-react";
import { waLink } from "@/data/content";
import { scrollToId } from "@/utils/scroll";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const LINES = ["Dissenyem webs", "que fan feina,", "no només boniques."];

const wireContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.85 } },
};
const wireItem = {
    hidden: { opacity: 0, y: 14, scale: 0.97 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const Wireframe = ({ reduce }) => (
    <motion.div
        variants={wireContainer}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="relative rounded-2xl border border-white/10 bg-navy-surface/70 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] overflow-hidden"
    >
        <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <motion.div
                variants={wireItem}
                className="flex-1 ml-3 flex items-center gap-2 font-mono text-[11px] text-white/60 bg-white/5 rounded-md px-3 py-1"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-turquoise animate-pulse" />
                montem-teva-web.cat
            </motion.div>
        </div>

        <div className="p-5 space-y-4 relative">
            <motion.div variants={wireItem} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-turquoise" />
                <span className="h-2 w-10 rounded-full bg-white/20" />
                <span className="h-2 w-8 rounded-full bg-white/10" />
                <span className="h-2 w-8 rounded-full bg-white/10" />
            </motion.div>

            <div className="space-y-2 pt-2">
                <motion.span variants={wireItem} className="block h-3.5 w-3/4 rounded-full bg-white/25" />
                <motion.span variants={wireItem} className="block h-3.5 w-1/2 rounded-full bg-white/15" />
            </div>

            <motion.div variants={wireItem}>
                <motion.span
                    className="inline-block h-7 w-24 rounded-md bg-turquoise"
                    animate={reduce ? {} : { scale: [1, 1.06, 1] }}
                    transition={{ delay: 2.3, duration: 0.6 }}
                />
            </motion.div>

            <div className="relative">
                <motion.div
                    variants={wireItem}
                    className="h-32 rounded-xl border-2 border-dashed border-turquoise/50 relative overflow-hidden"
                >
                    <motion.div
                        initial={reduce ? {} : { clipPath: "inset(0 100% 0 0)" }}
                        animate={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 bg-turquoise/10 flex items-center justify-center gap-2"
                    >
                        <ImageIcon size={18} className="text-turquoise" />
                        <span className="font-mono text-[11px] text-turquoise">
                            hero.jpg
                        </span>
                    </motion.div>
                </motion.div>
                <motion.span
                    initial={reduce ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="absolute -right-2 -top-3 font-mono text-[10px] text-turquoise/90 bg-navy border border-navy-border rounded px-1.5 py-0.5"
                >
                    {"<header />"}
                </motion.span>
                <motion.span
                    initial={reduce ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.7 }}
                    className="absolute -left-3 -bottom-3 font-mono text-[10px] text-turquoise/90 bg-navy border border-navy-border rounded px-1.5 py-0.5"
                >
                    cta → /contacte
                </motion.span>
            </div>

            <motion.div variants={wireItem} className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        className="h-12 rounded-lg bg-white/5 border border-white/10"
                    />
                ))}
            </motion.div>
        </div>
    </motion.div>
);

export const Hero = () => {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const yDeco1 = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const yDeco2 = useTransform(scrollYProgress, [0, 1], [0, 70]);

    return (
        <section
            id="inici"
            ref={ref}
            data-testid="hero-section"
            className="relative min-h-[100svh] bg-navy text-white overflow-hidden flex flex-col"
        >
            <div
                aria-hidden
                className="absolute inset-0 opacity-100"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                }}
            />
            <motion.div aria-hidden style={{ y: yDeco1 }} className="absolute top-32 right-[8%] text-turquoise/40">
                <span className="font-mono text-2xl">+</span>
            </motion.div>
            <motion.div aria-hidden style={{ y: yDeco2 }} className="absolute bottom-40 left-[6%]">
                <span className="block w-32 h-32 rounded-full border border-white/10" />
            </motion.div>
            <motion.p aria-hidden style={{ y: yDeco1 }} className="hidden lg:block absolute bottom-24 right-10 font-mono text-[11px] text-white/30">
                41.3874° N — 2.1686° E
            </motion.p>

            <div className="relative mx-auto max-w-7xl w-full px-5 sm:px-8 pt-32 pb-20 lg:pt-36 lg:pb-24 grid lg:grid-cols-12 gap-14 items-center flex-1">
                <div className="lg:col-span-7">
                    <motion.div
                        initial={reduce ? {} : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/85"
                    >
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inline-flex w-full h-full rounded-full bg-turquoise opacity-60 animate-ping" />
                            <span className="relative inline-flex w-2 h-2 rounded-full bg-turquoise" />
                        </span>
                        Disponibilitat per a nous projectes — 2 places aquest mes
                    </motion.div>

                    <h1
                        data-testid="hero-headline"
                        className="mt-7 font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2.7rem,6.4vw,5.7rem)]"
                    >
                        {LINES.map((line, i) => (
                            <span key={line} className="block overflow-hidden pb-1">
                                <motion.span
                                    className={`block ${i === 1 ? "text-turquoise" : ""}`}
                                    initial={reduce ? {} : { y: "112%" }}
                                    animate={{ y: "0%" }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0.15 + i * 0.13,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {line}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={reduce ? {} : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.65 }}
                        className="mt-7 max-w-xl text-lg sm:text-xl leading-relaxed text-mist"
                    >
                        Webilo és un estudi petit on cada web es fa a mà:
                        aparadors, webs professionals i botigues en línia.{" "}
                        <span className="text-white">
                            Aquesta pàgina que estàs veient? També és nostra.
                        </span>
                    </motion.p>

                    <motion.div
                        initial={reduce ? {} : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-9 flex flex-col sm:flex-row gap-4"
                    >
                        <button
                            data-testid="hero-cta-services"
                            onClick={() => scrollToId("serveis")}
                            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-turquoise px-7 h-14 font-semibold text-navy hover:bg-turquoise-light active:scale-[0.98] transition-all"
                        >
                            Veure serveis
                            <ArrowDown
                                size={18}
                                className="transition-transform group-hover:translate-y-0.5"
                            />
                        </button>
                        <a
                            data-testid="hero-cta-whatsapp"
                            href={waLink("Hola Webilo! Vull parlar d'una web.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/25 px-7 h-14 font-semibold hover:bg-white/5 hover:border-white/40 active:scale-[0.98] transition-all"
                        >
                            <WhatsAppIcon size={18} />
                            Parlem per WhatsApp
                        </a>
                    </motion.div>

                    <motion.p
                        initial={reduce ? {} : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-7 font-mono text-[11px] tracking-wider uppercase text-white/40"
                    >
                        Resposta en &lt; 24 h · Barcelona &amp; Girona · Sense compromís
                    </motion.p>
                </div>

                <div className="lg:col-span-5" data-testid="hero-wireframe-canvas">
                    <Wireframe reduce={reduce} />
                </div>
            </div>

            <motion.div
                initial={reduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="relative mx-auto max-w-7xl w-full px-5 sm:px-8 pb-8 flex items-center gap-3 text-white/40"
            >
                <span className="font-mono text-[11px] uppercase tracking-widest">
                    scroll
                </span>
                <span className="block h-px w-16 bg-white/25" />
            </motion.div>
        </section>
    );
};

export default Hero;
