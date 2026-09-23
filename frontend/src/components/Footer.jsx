import { Mail, MapPin } from "lucide-react";
import { EMAIL, NAV_LINKS, waLink } from "@/data/content";
import { scrollToId } from "@/utils/scroll";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const Footer = () => (
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
                        L'estudi de disseny i desenvolupament web per a qui
                        valora els detalls i els resultats.
                    </p>
                </div>
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                        Navega
                    </p>
                    <ul className="mt-4 space-y-2.5">
                        {NAV_LINKS.map((l) => (
                            <li key={l.id}>
                                <button
                                    data-testid={`footer-link-${l.id}`}
                                    onClick={() => scrollToId(l.id)}
                                    className="text-sm text-mist hover:text-turquoise transition-colors"
                                >
                                    {l.label}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                data-testid="footer-link-contacte"
                                onClick={() => scrollToId("contacte")}
                                className="text-sm text-mist hover:text-turquoise transition-colors"
                            >
                                Contacte
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
                            Barcelona &amp; Girona
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
                                WhatsApp directe
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
                <p>© Webilo — [s'ha d'afegir: dades legals i registre]</p>
                <p className="font-mono">Fet a Catalunya amb React, FastAPI i molt de cafè.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
