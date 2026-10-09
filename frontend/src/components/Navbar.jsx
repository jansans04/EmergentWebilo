import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, waLink } from "@/data/content";
import { scrollToId } from "@/utils/scroll";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import BrandLogo from "@/components/BrandLogo";

export const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();
    const [overDark, setOverDark] = useState(true);
    const [open, setOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.4,
    });

    useEffect(() => {
        const onScroll = () => {
            setOverDark(window.scrollY < window.innerHeight - 120);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (open) {
            window.__lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            window.__lenis?.start();
            document.body.style.overflow = "";
        }
        return () => {
            window.__lenis?.start();
            document.body.style.overflow = "";
        };
    }, [open]);

    const go = (id) => {
        setOpen(false);
        setTimeout(() => scrollToId(id), 60);
    };

    return (
        <>
            <motion.div
                data-testid="scroll-progress-bar"
                style={{ scaleX: progress }}
                className="fixed top-0 left-0 right-0 h-[3px] bg-turquoise origin-left z-[70]"
            />
            <header
                data-testid="navbar-sticky"
                className={cn(
                    "fixed top-0 inset-x-0 z-[60] transition-colors duration-300",
                    overDark
                        ? "text-white"
                        : "text-navy bg-white/85 backdrop-blur-md border-b border-slate-200/70",
                    overDark && open && "text-white",
                )}
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
                    <button
                        data-testid="navbar-logo"
                        onClick={() => go("inici")}
                        className="font-display font-bold text-xl tracking-tight flex items-center gap-1.5"
                        aria-label="Webilo — tornar a l'inici"
                    >
                        <BrandLogo compact />
                    </button>

                    <nav className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((l) => (
                            <button
                                key={l.id}
                                data-testid={`nav-link-${l.id}`}
                                onClick={() => go(l.id)}
                                className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-turquoise transition-colors"
                            >
                                {t(`nav.${l.id === "serveis" ? "services" : l.id === "com-funciona" ? "process" : l.id === "projectes" ? "projects" : l.id}`)}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center rounded-lg border border-current/20 p-0.5" aria-label={t("languageLabel")}>
                            {["ca", "es"].map((code) => (
                                <button
                                    key={code}
                                    onClick={() => setLanguage(code)}
                                    aria-pressed={language === code}
                                    className={cn("rounded-md px-2 py-1 text-[11px] font-bold uppercase transition-colors", language === code ? "bg-turquoise text-navy" : "opacity-60 hover:opacity-100")}
                                >
                                    {code}
                                </button>
                            ))}
                        </div>
                        <a
                            data-testid="navbar-whatsapp"
                            href={waLink("Hola Webilo! Vull parlar d'una web.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Escriu-nos per WhatsApp"
                            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-current/20 hover:bg-turquoise hover:text-navy hover:border-turquoise transition-colors"
                        >
                            <WhatsAppIcon size={17} />
                        </a>
                        <button
                            data-testid="navbar-cta-contact"
                            onClick={() => go("contacte")}
                            className="hidden sm:flex items-center gap-2 rounded-lg bg-turquoise px-4 py-2 text-sm font-semibold text-navy hover:bg-turquoise-light active:scale-[0.98] transition-all"
                        >
                            {t("nav.contact")}
                            <ArrowRight size={15} />
                        </button>
                        <button
                            data-testid="navbar-mobile-menu-button"
                            onClick={() => setOpen(true)}
                            aria-label="Obrir menú"
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-current/20"
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        data-testid="navbar-mobile-fullscreen-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[80] bg-navy text-white flex flex-col"
                    >
                        <div className="h-16 px-5 flex items-center justify-between">
                            <BrandLogo compact />
                            <button
                                data-testid="navbar-mobile-close-button"
                                onClick={() => setOpen(false)}
                                aria-label="Tancar menú"
                                className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/20"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
                            {NAV_LINKS.map((l, i) => (
                                <motion.button
                                    key={l.id}
                                    initial={{ opacity: 0, x: -18 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 + i * 0.07 }}
                                    onClick={() => go(l.id)}
                                    className="text-left font-display font-bold text-4xl py-3 border-b border-white/10 hover:text-turquoise transition-colors"
                                >
                                    {t(`nav.${l.id === "serveis" ? "services" : l.id === "com-funciona" ? "process" : l.id === "projectes" ? "projects" : l.id}`)}
                                </motion.button>
                            ))}
                        </nav>
                        <div className="px-8 pb-10 flex flex-col gap-3">
                            <div className="flex gap-2">
                                {["ca", "es"].map((code) => (
                                    <button key={code} onClick={() => setLanguage(code)} className={cn("rounded-lg border px-4 py-2 text-sm font-bold uppercase", language === code ? "border-turquoise bg-turquoise text-navy" : "border-white/25 text-white")}>{code}</button>
                                ))}
                            </div>
                            <button
                                data-testid="navbar-mobile-cta-contact"
                                onClick={() => go("contacte")}
                                className="w-full h-14 rounded-xl bg-turquoise text-navy font-semibold text-lg flex items-center justify-center gap-2"
                            >
                                {t("nav.contact")}
                                <ArrowRight size={18} />
                            </button>
                            <a
                                data-testid="navbar-mobile-whatsapp"
                                href={waLink("Hola Webilo! Vull parlar d'una web.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-14 rounded-xl border border-white/25 font-semibold flex items-center justify-center gap-2"
                            >
                                <WhatsAppIcon size={18} />
                                Parlem per WhatsApp
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
