import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, ArrowRight, AlertTriangle } from "lucide-react";
import { SERVICES } from "@/data/content";
import ServicePreview from "@/components/ServicePreview";
import DemoModal from "@/components/DemoModal";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const SPANISH_SERVICES = {
    aparador: { name: "Escaparate", tagline: "Presencia profesional inmediata para negocios locales y autónomos.", target: "Profesionales autónomos, pequeños talleres y negocios locales que necesitan credibilidad rápida.", features: ["One-page ultrarrápida pensada para convertir", "WhatsApp y llamada con un clic", "SEO local y Google Business configurados", "Alojamiento rápido y certificado SSL incluido"], priceNote: "precio orientativo — el presupuesto se cierra por escrito antes de empezar" },
    professional: { name: "Web Profesional", tagline: "La web corporativa completa para captar clientes y transmitir autoridad.", target: "Clínicas, despachos, ingenierías y empresas de servicios en crecimiento.", features: ["Hasta 5 páginas de alto impacto", "Reserva de citas o formulario de leads", "Carga en menos de 1 segundo", "Panel para editar textos e imágenes"], priceNote: "precio orientativo — el presupuesto se cierra por escrito antes de empezar" },
    botiga: { name: "Tienda Online", tagline: "Vende tus productos con una experiencia de compra fluida.", target: "Marcas de moda, artesanos y productores locales que quieren vender en cualquier lugar.", features: ["Catálogo con variantes, fotos y stock", "Pago seguro: tarjeta, Bizum, Apple Pay", "Cesta optimizada, cero comisiones nuestras", "Gestión de pedidos y envíos"], priceNote: "precio orientativo — el presupuesto se cierra por escrito antes de empezar" },
};

const localizeService = (service, language) => language === "es" ? { ...service, ...SPANISH_SERVICES[service.id] } : service;

const InfoPanel = ({ service, onWant }) => {
    const { t } = useLanguage();
    return (
    <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className=""
    >
        <div className="relative overflow-hidden rounded-2xl bg-navy text-white shadow-lift p-6 sm:p-8 h-full">
            {service.badgeFeatured && (
                <span className="absolute top-0 right-6 rounded-b-lg bg-turquoise px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-navy">
                    {t("services.popular")}
                </span>
            )}
            <div className="grid xl:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center">
                <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="font-display font-bold text-4xl sm:text-5xl text-turquoise-light tracking-tight">
                            {t("services.from")} {service.price} €
                        </p>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold px-3 py-1">
                            <Clock size={12} />
                            {t("services.delivery")} {service.timeframe}
                        </span>
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] text-white/40">
                        {service.priceNote}
                    </p>
                    <p className="mt-4 text-sm sm:text-base text-mist max-w-2xl">
                        <span className="font-semibold text-white">{t("services.forWhom")}</span>{" "}
                        {service.target}
                    </p>
                    <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                        {service.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-mist">
                                <Check size={16} className="text-turquoise mt-0.5 shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    data-testid="service-cta-want"
                    onClick={() => onWant(service.id)}
                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-turquoise text-navy px-9 h-16 text-lg font-bold hover:bg-turquoise-light active:scale-[0.98] transition-all shrink-0 w-full lg:w-auto"
                >
                    {t("services.want")}
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>
        </div>
    </motion.div>
    );
};

const ServiceCard = ({ s, active, onSelect }) => {
    const { t } = useLanguage();
    return (
    <button
        role="tab"
        aria-selected={active}
        data-testid={`service-card-${s.id}`}
        onClick={onSelect}
        className={cn(
            "relative h-full text-left rounded-2xl border p-6 transition-all duration-300",
            active
                ? "bg-navy text-white border-navy shadow-lift"
                : "bg-white text-navy border-slate-200 hover:border-turquoise hover:shadow-soft",
            s.badgeFeatured && active && "border-turquoise ring-2 ring-turquoise/40",
            s.badgeFeatured && !active && "border-turquoise/70 ring-1 ring-turquoise/40",
        )}
    >
        {s.badgeFeatured && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-turquoise px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy shadow whitespace-nowrap">
                {t("services.popular")}
            </span>
        )}
        <p className="font-mono text-[11px] tracking-widest opacity-60">{s.index}</p>
        <p className="mt-2 font-display font-bold text-xl tracking-tight">{s.name}</p>
        <p
            className={cn(
                "mt-1.5 text-sm leading-relaxed",
                active ? "text-mist" : "text-slateblue",
            )}
        >
            {s.tagline}
        </p>
        <p
            className={cn(
                "mt-4 font-display font-bold text-2xl tracking-tight",
                active ? "text-turquoise-light" : "text-navy",
            )}
        >
            {t("services.from")} {s.price} €
        </p>
        <p className="font-mono text-[10px] text-slateblue/70 mt-0.5">
            {t("services.indicative")} · {t("services.delivery")} {s.timeframe}
        </p>
        <ul className="mt-4 space-y-2">
            {s.features.slice(0, 2).map((f) => (
                <li
                    key={f}
                    className={cn(
                        "flex items-start gap-2 text-xs leading-relaxed",
                        active ? "text-mist" : "text-slateblue",
                    )}
                >
                    <Check size={13} className="text-turquoise mt-0.5 shrink-0" />
                    {f}
                </li>
            ))}
        </ul>
        <span
            className={cn(
                "mt-4 inline-block font-mono text-[10px] uppercase tracking-widest",
                active ? "text-turquoise-light" : "text-turquoise-dark",
            )}
        >
            {t("services.details")}
        </span>
    </button>
    );
};

export const ServiceSwitcher = ({ onWant }) => {
    const { language, t } = useLanguage();
    const [activeId, setActiveId] = useState(SERVICES[0].id);
    const [demo, setDemo] = useState(null);
    const active = localizeService(SERVICES.find((s) => s.id === activeId), language);

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
                        {t("services.eyebrow")}
                    </p>
                    <h2 className="mt-4 font-display font-bold tracking-tight text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06] text-navy">
                        {t("services.title")}
                    </h2>
                    <p className="mt-5 text-lg text-slateblue">
                        {t("services.copy")}
                    </p>
                </div>

                <div className="mt-12 grid sm:grid-cols-3 gap-5" role="tablist" aria-label="Serveis Webilo">
                    {SERVICES.map((s) => (
                        <ServiceCard
                            key={s.id}
                            s={localizeService(s, language)}
                            active={activeId === s.id}
                            onSelect={() => setActiveId(s.id)}
                        />
                    ))}
                </div>

                <div id="demos" className="mt-14">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 items-start">
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
                            </motion.div>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`info-${active.id}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <InfoPanel service={active} onWant={onWant} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-12 flex items-center gap-3 text-sm text-slateblue">
                    <AlertTriangle size={16} className="text-turquoise-dark shrink-0" />
                    {t("demoNote")} {t("demoDetail")}
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
