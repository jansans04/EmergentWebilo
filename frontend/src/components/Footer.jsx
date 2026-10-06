import { Mail, MapPin } from "lucide-react";
import { EMAIL, NAV_LINKS, waLink } from "@/data/content";
import { scrollToId } from "@/utils/scroll";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
    const { t } = useLanguage();
    const labels = {
        serveis: t("nav.services"),
        demos: t("nav.demos"),
        projectes: t("nav.projects"),
        "com-funciona": t("nav.process"),
    };
    return (
    <footer
        data-testid="main-footer"
        className="bg-ink text-white pt-16 pb-10 border-t border-white/10"
    >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid md:grid-cols-3 gap-12">
                <div>
                    <p className="font-display font-bold text-2xl flex items-center gap-1.5">
                        Webilo
                        <span className="w-2 h-2 rounded-full bg-turquoise inline-block" />
                    </p>
                    <p className="mt-4 text-mist leading-relaxed max-w-xs">
                        {t("footer.description")}
                    </p>
                </div>
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                        {t("footer.navigate")}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                        {NAV_LINKS.map((l) => (
                            <li key={l.id}>
                                <button
                                    data-testid={`footer-link-${l.id}`}
                                    onClick={() => scrollToId(l.id)}
                                    className="text-sm text-mist hover:text-turquoise transition-colors"
                                >
                                    {labels[l.id] || l.label}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                data-testid="footer-link-contacte"
                                onClick={() => scrollToId("contacte")}
                                className="text-sm text-mist hover:text-turquoise transition-colors"
                            >
                                {t("footer.contact")}
                            </button>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                        Contacte
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-mist">
                        <li>
                            <a
                                data-testid="footer-email"
                                href={`mailto:${EMAIL}`}
                                className="flex items-center gap-2.5 hover:text-turquoise transition-colors"
                            >
                                <Mail size={15} className="text-turquoise" />
                                {EMAIL}
                            </a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <MapPin size={15} className="text-turquoise" />
                            {t("footer.location")}
                        </li>
                        <li>
                            <a
                                data-testid="footer-whatsapp"
                                href={waLink("Hola Webilo!")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 hover:text-turquoise transition-colors"
                            >
                                <WhatsAppIcon size={15} className="text-turquoise" />
                                {t("footer.directWhatsapp")}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
                <p>{t("footer.legal")}</p>
                <p className="font-mono">{t("footer.made")}</p>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
