import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import { ArrowDown, ImageIcon, RotateCcw } from "lucide-react";
import { waLink } from "@/data/content";
import { scrollToId } from "@/utils/scroll";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "@/components/BrandLogo";

const LINES = ["Dissenyem webs", "que fan feina,", "no només boniques."];

const PIECE_ORDER = ["nav", "titol", "imatge", "boto"];

const SLOTS = {
    nav: {
        label: "<nav/>",
        fx: 0.5,
        fy: 33,
        style: { top: 20, left: 20, right: 20, height: 26 },
    },
    titol: {
        label: "<h1/>",
        fx: 0.34,
        fy: 81,
        style: { top: 64, left: 20, width: "56%", height: 34 },
    },
    imatge: {
        label: "hero.jpg",
        fx: 0.5,
        fy: 170,
        style: { top: 122, left: 20, right: 20, height: 96 },
    },
    boto: {
        label: "cta",
        fx: 0.18,
        fy: 249,
        style: { top: 234, left: 20, width: 96, height: 30 },
    },
};

const PieceVisual = ({ id }) => {
    if (id === "nav")
        return (
            <div className="w-full h-full rounded-lg bg-white/10 border border-white/15 flex items-center gap-2 px-2.5">
                <span className="w-2 h-2 rounded-full bg-turquoise" />
                <span className="h-1.5 w-8 rounded-full bg-white/30" />
                <span className="h-1.5 w-6 rounded-full bg-white/15" />
                <span className="h-1.5 w-6 rounded-full bg-white/15" />
            </div>
        );
    if (id === "titol")
        return (
            <div className="w-full h-full rounded-lg bg-white/10 border border-white/15 px-2.5 py-1.5 space-y-1.5 overflow-hidden">
                <span className="block h-2 w-3/4 rounded-full bg-white/35" />
                <span className="block h-2 w-1/2 rounded-full bg-white/20" />
            </div>
        );
    if (id === "imatge")
        return (
            <div className="w-full h-full rounded-lg bg-turquoise/15 border border-turquoise/40 flex items-center justify-center gap-2">
                <ImageIcon size={16} className="text-turquoise" />
                <span className="font-mono text-[10px] text-turquoise">
                    hero.jpg
                </span>
            </div>
        );
    return <div className="w-full h-full rounded-md bg-turquoise" />;
};

const Wireframe = ({ reduce }) => {
    const { t } = useLanguage();
    const phases = [t("demo.build"), t("demo.content"), t("demo.images"), t("demo.details"), t("demo.published")];
    const [placed, setPlaced] = useState([]);
    const [manual, setManual] = useState(false);
    const canvasRef = useRef(null);
    const done = placed.length === PIECE_ORDER.length;

    useEffect(() => {
        if (reduce) {
            setPlaced(PIECE_ORDER);
            return;
        }
        if (manual || done) return;
        const id = setTimeout(
            () =>
                setPlaced((p) =>
                    p.length < PIECE_ORDER.length
                        ? [...p, PIECE_ORDER[p.length]]
                        : p,
                ),
            placed.length === 0 ? 600 : 850,
        );
        return () => clearTimeout(id);
    }, [placed, manual, reduce, done]);

    const replay = () => {
        if (manual || reduce) return;
        setPlaced([]);
    };

    const toggleMode = () => {
        setManual((m) => !m);
        setPlaced([]);
    };

    const handleDrop = (id, info) => {
        if (placed.includes(id)) return;
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + SLOTS[id].fx * rect.width;
        const cy = rect.top + SLOTS[id].fy;
        const dist = Math.hypot(info.point.x - cx, info.point.y - cy);
        if (dist < 95) setPlaced((p) => [...p, id]);
    };

    const phase = done
        ? phases[4]
        : manual
            ? `${t("demo.manual")} — ${t("demo.content")}`
            : phases[placed.length];

    return (
        <div className="relative rounded-2xl border border-white/10 bg-navy-surface/70 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <div className="flex-1 ml-3 flex items-center gap-2 font-mono text-[11px] text-white/60 bg-white/5 rounded-md px-3 py-1">
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${
                            done ? "bg-emerald-400" : "bg-turquoise animate-pulse"
                        }`}
                    />
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={done ? "done" : "building"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {done ? `lateva-web.cat — ${phases[4]}` : "muntant-teva-web.cat…"}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>

            <div
                ref={canvasRef}
                data-testid="hero-demo-canvas"
                className="relative h-[280px]"
            >
                {PIECE_ORDER.filter((id) => !placed.includes(id)).map((id) => (
                    <div
                        key={id}
                        className="absolute rounded-lg border-2 border-dashed border-white/15 flex items-center justify-center"
                        style={{ ...SLOTS[id].style, zIndex: 1 }}
                    >
                        <span className="font-mono text-[10px] text-white/25">
                            {SLOTS[id].label}
                        </span>
                    </div>
                ))}
                {PIECE_ORDER.filter((id) => placed.includes(id)).map((id) => (
                    <motion.div
                        key={id}
                        data-testid={`hero-demo-placed-${id}`}
                        className="absolute"
                        style={{ ...SLOTS[id].style, zIndex: 2 }}
                        initial={
                            reduce
                                ? { opacity: 1 }
                                : { opacity: 0, x: 150, y: 110, scale: 0.8 }
                        }
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    >
                        <PieceVisual id={id} />
                    </motion.div>
                ))}
                <motion.span
                    animate={
                        done
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                    }
                    className="absolute right-4 top-[246px] z-[3] font-mono text-[10px] text-emerald-300 bg-navy border border-emerald-400/30 rounded px-2 py-1"
                >
                    deploy ✓
                </motion.span>
            </div>

            {manual && !done && (
                <div className="flex items-center gap-2.5 px-5 pt-4 pb-1 border-t border-white/10 flex-wrap min-h-[52px]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 mr-1">
                        blocs:
                    </span>
                    {PIECE_ORDER.filter((id) => !placed.includes(id)).map((id) => (
                        <motion.div
                            key={id}
                            data-testid={`hero-demo-piece-${id}`}
                            drag
                            dragSnapToOrigin
                            dragMomentum={false}
                            onDragEnd={(e, info) => handleDrop(id, info)}
                            whileDrag={{ scale: 1.2 }}
                            className="cursor-grab active:cursor-grabbing rounded-lg bg-white/10 border border-turquoise/50 text-turquoise font-mono text-[11px] px-3 py-1.5 z-30"
                        >
                            {SLOTS[id].label}
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between px-5 py-3 gap-3">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={phase}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="font-mono text-[10px] uppercase tracking-widest text-turquoise/80"
                    >
                        {phase}
                    </motion.span>
                </AnimatePresence>
                <div className="flex items-center gap-2 shrink-0">
                    {!manual && !reduce && (
                        <button
                            data-testid="hero-demo-replay"
                            onClick={replay}
                            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-turquoise transition-colors"
                        >
                            <RotateCcw size={11} />
                            {t("demo.replay")}
                        </button>
                    )}
                    <button
                        data-testid="hero-demo-manual"
                        onClick={toggleMode}
                        className="flex items-center gap-1.5 rounded-md border border-turquoise/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-turquoise hover:bg-turquoise/10 transition-colors"
                    >
                        {manual ? t("demo.automatic") : t("demo.manual")}
                    </button>
                </div>
            </div>

            <div className="h-[3px] bg-white/5">
                <motion.div
                    className="h-full bg-turquoise"
                    animate={{
                        width: reduce
                            ? "100%"
                            : `${(placed.length / PIECE_ORDER.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

export const Hero = () => {
    const { t } = useLanguage();
    const lines = t("hero.lines");
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
                    <BrandLogo animated className="mb-8 text-white" />
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
                        {t("hero.availability")}
                    </motion.div>

                    <h1
                        data-testid="hero-headline"
                        className="mt-7 font-display font-bold tracking-[-0.02em] leading-[1.02] text-[clamp(2.7rem,6.4vw,5.7rem)]"
                    >
                        {lines.map((line, i) => (
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
                        {t("hero.description")} {" "}
                        <span className="text-white">
                            {t("hero.emphasis")}
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
                            {t("hero.services")}
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
                            {t("hero.whatsapp")}
                        </a>
                    </motion.div>

                    <motion.p
                        initial={reduce ? {} : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-7 font-mono text-[11px] tracking-wider uppercase text-white/40"
                    >
                        {t("hero.response")}
                    </motion.p>
                </div>

                <div className="lg:col-span-5 translate-y-8 lg:translate-y-16" data-testid="hero-wireframe-canvas">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                        <video
                            data-testid="hero-uploaded-video"
                            className="block aspect-video w-full object-cover"
                            src="/lumina.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                            aria-label="Animació de mostra de Webilo"
                        />
                    </div>
                    <div className="mt-8">
                        <Wireframe reduce={reduce} />
                    </div>
                </div>
            </div>

            <motion.div
                initial={reduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="relative mx-auto max-w-7xl w-full px-5 sm:px-8 pb-8 flex items-center gap-3 text-white/40"
            >
                <span className="font-mono text-[11px] uppercase tracking-widest">
                    {t("hero.scroll")}
                </span>
                <span className="block h-px w-16 bg-white/25" />
            </motion.div>
        </section>
    );
};

export default Hero;
