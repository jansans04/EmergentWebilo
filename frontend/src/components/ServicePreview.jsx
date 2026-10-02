import { motion } from "framer-motion";
import { Lock, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const BrowserChrome = ({ url }) => (
    <div className="flex items-center gap-2 px-4 h-10 bg-[#F1F5F8] border-b border-slate-200 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <div className="flex-1 flex justify-center px-4">
            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-slateblue bg-white border border-slate-200 rounded-md px-3 py-1 max-w-full overflow-hidden">
                <Lock size={10} className="text-turquoise shrink-0" />
                <span className="truncate">{url}</span>
            </div>
        </div>
        <span className="w-[54px] hidden sm:block" />
    </div>
);

export const ServicePreview = ({ service, onOpenDemo }) => {
    const { t } = useLanguage();
    return <div
        data-testid="service-preview-mockup"
        className="rounded-2xl border border-slate-200 bg-white shadow-lift overflow-hidden"
    >
        <BrowserChrome url={service.demoUrl} />
        <div className="relative aspect-[16/10] bg-navy overflow-hidden">
            <motion.img
                key={service.id}
                src={service.previewImg}
                alt={`Demo ${service.name}: ${service.demoTitle}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
            <button
                data-testid="service-btn-open-demo"
                onClick={() => onOpenDemo(service)}
                className="absolute top-4 right-4 flex items-center gap-1.5 rounded-lg bg-white/95 text-navy text-sm font-semibold px-3 py-2 hover:bg-white active:scale-[0.98] transition-all shadow"
            >
                <Play size={14} />
                {t("openDemo")}
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-turquoise-light">
                    {service.demoTitle} — demo maquetada
                </p>
                <div className="mt-2 flex items-end justify-between gap-4 flex-wrap">
                    <h3 className="font-display font-bold text-white text-xl sm:text-3xl tracking-tight">
                        {service.name}
                    </h3>
                    <div className="flex gap-2">
                        <span className="rounded-lg bg-turquoise text-navy text-xs sm:text-sm font-semibold px-3.5 py-2 cursor-default">
                            Demana pressupost
                        </span>
                        <span className="rounded-lg border border-white/40 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 cursor-default">
                            {t("viewProjects")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default ServicePreview;
