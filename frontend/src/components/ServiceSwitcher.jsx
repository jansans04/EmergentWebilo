import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { SERVICES } from "@/data/content";
import ServicePreview from "@/components/ServicePreview";
import DemoModal from "@/components/DemoModal";
import { cn } from "@/lib/utils";

const InfoPanel = ({ service, onWant }) => (
    <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 grid lg:grid-cols-[1fr_auto] gap-8 items-start"
    >
        <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="font-display font-bold text-3xl sm:text-4xl text-navy tracking-tight">
                    Des de {service.price} €
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-turquoise-tint text-turquoise-dark text-xs font-semibold px-3 py-1">
                    <Clock size={12} />
                    Entrega en {service.timeframe}
                </span>
            </div>
            <p className="mt-1.5 font-mono text-[11px] text-slateblue/70">
                {service.priceNote}
            </p>
            <p className="mt-4 text-sm sm:text-base text-slateblue max-w-2xl">
                <span className="font-semibold text-navy">Per a qui:</span>{" "}
                {service.target}
            </p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slateblue">
                        <Check size={16} className="text-turquoise mt-0.5 shrink-0" />
                        {f}
                    </li>
                ))}
            </ul>
        </div>
        <button
            data-testid="service-cta-want"
            onClick={() => onWant(service.id)}
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-navy text-white px-8 h-14 font-semibold hover:bg-navy-surface active:scale-[0.98] transition-all shrink-0"
        >
            Ho vull
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
        </button>
    </motion.div>
);

const MobileCarousel = ({ onOpenDemo, onWant }) => {
    const containerRef = useRef(null);
    const [active, setActive] = useState(0);

    const onScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const slide = el.querySelector("[data-slide]");
        if (!slide) return;
        const w = slide.offsetWidth + 24;
        setActive(Math.round(el.scrollLeft / w));
    }, []);

    return (
        <div>
            <div
                ref={containerRef}
                onScroll={onScroll}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 sm:-mx-8 sm:px-8 [scrollbar-width:none]"
            >
                {SERVICES.map((s, i) => (
                    <div
                        key={s.id}
                        data-slide
                        className="min-w-[88%] snap-center"
                    >
                        <div className="relative">
                            {s.badgeFeatured && (
                                <span className="absolute -top-3 right-4 z-10 rounded-md bg-turquoise text-navy text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 shadow">
                                    Més escollit
                                </span>
                            )}
                            <ServicePreview service={s} onOpenDemo={onOpenDemo} />
                        </div>
                        <div className="mt-4">
                            <InfoPanel service={s} onWant={onWant} />
                        </div>
                        <p className="mt-2 font-mono text-[11px] text-slateblue/50">
                            {i + 1} / {SERVICES.length} — llisca per veure'n més
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-2">
                {SERVICES.map((s, i) => (
                    <button
                        key={s.id}
                        data-testid={`service-carousel-dot-${s.id}`}
                        aria-label={`Anar a ${s.name}`}
                        onClick={() => {
                            const el = containerRef.current;
                            const slide = el?.querySelectorAll("[data-slide]")?.[i];
                            if (el && slide)
                                el.scrollTo({ left: slide.offsetLeft - 20, behavior: "smooth" });
                        }}
                        className={cn(
                            "h-2 rounded-full transition-all duration-300",
                            active === i ? "w-7 bg-turquoise" : "w-2 bg-navy/20",
                        )}
                    />
                ))}
            </div>
        </div>
    );
};

export const ServiceSwitcher = ({ onWant }) => {
    const [activeId, setActiveId] = useState(SERVICES[0].id);
    const [demo, setDemo] = useState(null);
    const active = SERVICES.find((s) => s.id === activeId);

    useEffect(() => {
        if (!demo) return;
        window.__lenis?.stop();
        document.body.style.overflow = "hidden";
        return () => {
            window.__lenis?.start();
            document.body.style.overflow = "";
        };
    }, [demo]);

    return (
        <section
            id="serveis"
            data-testid="services-switcher-section"
            className="bg-azure/60 py-24 lg:py-32"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="max-w-3xl">
                    <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-turquoise-dark">
                        Els tres serveis
                    </p>
                    <h2 className="mt-4 font-display font-bold tracking-tight text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06] text-navy">
                        Tres maneres de tenir la teva web treballant per tu.
                    </h2>
                    <p className="mt-5 text-lg text-slateblue">
                        Canvia de servei i mira la demo de debò, sense sortir
                        d'aquí. Cap targeta genèrica: cada exemple està
                        maquetat com si fos d'un client nostre.
                    </p>
                </div>

                <div id="demos" className="mt-14 hidden lg:grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
                    <div role="tablist" aria-label="Serveis Webilo" className="flex flex-col gap-4">
                        {SERVICES.map((s) => (
                            <button
                                key={s.id}
                                role="tab"
                                aria-selected={activeId === s.id}
                                data-testid={`service-tab-${s.id}`}
                                onClick={() => setActiveId(s.id)}
                                className={cn(
                                    "relative text-left rounded-2xl border p-6 transition-all duration-300",
                                    activeId === s.id
                                        ? "bg-navy text-white border-navy shadow-lift"
                                        : "bg-white text-navy border-slate-200 hover:border-turquoise hover:shadow-soft",
                                )}
                            >
                                {s.badgeFeatured && (
                                    <span className="absolute top-5 right-5 rounded-md bg-turquoise text-navy text-[11px] font-bold uppercase tracking-wider px-2.5 py-1">
                                        Més escollit
                                    </span>
                                )}
                                <p className="font-mono text-[11px] tracking-widest opacity-60">
                                    {s.index}
                                </p>
                                <p className="mt-2 font-display font-bold text-2xl tracking-tight pr-24">
                                    {s.name}
                                </p>
                                <p
                                    className={cn(
                                        "mt-1.5 text-sm leading-relaxed pr-4",
                                        activeId === s.id ? "text-mist" : "text-slateblue",
                                    )}
                                >
                                    {s.tagline}
                                </p>
                                {!s.badgeFeatured && s.badge && (
                                    <span
                                        className={cn(
                                            "inline-block mt-3 rounded-md px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider border",
                                            activeId === s.id
                                                ? "border-white/25 text-white/70"
                                                : "border-slate-300 text-slateblue",
                                        )}
                                    >
                                        {s.badge}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, scale: 0.985 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.985 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ServicePreview
                                    service={active}
                                    onOpenDemo={(s) => setDemo(s)}
                                />
                                <InfoPanel service={active} onWant={onWant} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-10 lg:hidden">
                    <MobileCarousel onOpenDemo={setDemo} onWant={onWant} />
                </div>

                <div className="mt-12 flex items-center gap-3 text-sm text-slateblue">
                    <AlertTriangle size={16} className="text-turquoise-dark shrink-0" />
                    Les demos no són funcionals: són webs maquetades amb
                    contingut d'exemple perquè vegis l'estil que sabem fer.
                </div>
            </div>

            <AnimatePresence>
                {demo && (
                    <DemoModal
                        demoId={demo.demoId}
                        demoUrl={demo.demoUrl}
                        onClose={() => setDemo(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default ServiceSwitcher;
