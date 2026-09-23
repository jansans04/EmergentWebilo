import { Asterisk } from "lucide-react";
import { MARQUEE_ITEMS } from "@/data/content";

export const SocialProof = () => (
    <section
        data-testid="social-proof-strip"
        aria-label="Compromisos de Webilo"
        className="bg-white border-b border-slate-200/70 py-6 overflow-hidden"
    >
        <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
                <div key={copy} aria-hidden={copy === 1} className="flex items-center shrink-0">
                    {MARQUEE_ITEMS.map((item) => (
                        <span key={`${copy}-${item}`} className="flex items-center">
                            <span className="font-display text-sm sm:text-base font-semibold uppercase tracking-[0.18em] text-slateblue px-7 whitespace-nowrap">
                                {item}
                            </span>
                            <Asterisk
                                size={18}
                                className="text-turquoise shrink-0"
                                aria-hidden
                            />
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </section>
);

export default SocialProof;
