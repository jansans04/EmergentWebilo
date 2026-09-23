import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { IMAGES } from "@/data/content";

const fakeLink = (e) => e.preventDefault();

const PRODUCTS = [
    {
        img: IMAGES.modaP1,
        name: "Blàzer oversized de llana",
        price: "165 €",
        tag: "Nou",
        span: "sm:col-span-2",
    },
    { img: IMAGES.modaP2, name: "Trinxera de cotó", price: "189 €", tag: null },
    { img: IMAGES.modaP3, name: "Vestit de festa", price: "129 €", tag: null },
];

export const ModaDemo = () => {
    const [cart, setCart] = useState(0);

    return (
        <div data-testid="demo-moda" className="bg-[#EFECE6] text-[#191919]">
            <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#191919]/10">
                <span className="font-display font-black text-xl tracking-[0.2em]">
                    NUA
                </span>
                <nav className="hidden sm:flex items-center gap-6 text-sm text-[#191919]/60">
                    <a href="#" onClick={fakeLink} className="hover:text-[#191919]">Botiga</a>
                    <a href="#" onClick={fakeLink} className="hover:text-[#191919]">Col·leccions</a>
                    <a href="#" onClick={fakeLink} className="hover:text-[#191919]">Manifest</a>
                </nav>
                <button
                    className="flex items-center gap-2 rounded-lg border border-[#191919]/25 text-sm font-semibold px-4 py-2"
                    data-testid="demo-moda-cart"
                >
                    <ShoppingBag size={15} />
                    Cistella ({cart})
                </button>
            </div>

            <div className="relative h-[440px] sm:h-[560px]">
                <img
                    src={IMAGES.modaHero}
                    alt="Model amb americana negra ampla sobre fons blanc"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-10">
                    <h1 className="font-display font-black text-6xl sm:text-8xl tracking-tight text-[#191919]">
                        Vestir senzill.
                        <br />
                        Durar molt.
                    </h1>
                    <p className="mt-3 text-[#191919]/60 text-lg max-w-md">
                        Peces de lli i cotó produïdes al Mediterrani. Edicions
                        curtes, sense rotacions.
                    </p>
                </div>
            </div>

            <div className="border-y border-[#191919]/10 py-3 overflow-hidden">
                <div className="flex w-max animate-marquee" style={{ animationDuration: "30s" }}>
                    {[0, 1].map((c) => (
                        <div key={c} aria-hidden={c === 1} className="flex shrink-0">
                            {["Nova col·lecció", "Fet al Mediterrani", "Edicions limitades", "Enviament gratuït +80 €"].map(
                                (t) => (
                                    <span
                                        key={`${c}-${t}`}
                                        className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#191919]/50 px-6"
                                    >
                                        {t} ·
                                    </span>
                                ),
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-6 sm:px-10 py-14">
                <div className="flex items-end justify-between">
                    <h2 className="font-display font-bold text-2xl sm:text-4xl">
                        La col·lecció
                    </h2>
                    <span className="font-mono text-xs text-[#191919]/40">12 peces</span>
                </div>
                <div className="mt-8 grid sm:grid-cols-3 gap-5">
                    {PRODUCTS.map((p) => (
                        <div key={p.name} className={`${p.span} group`}>
                            <div className="overflow-hidden rounded-xl aspect-[3/4] bg-white">
                                <img
                                    src={p.img}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="mt-3 flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-semibold">
                                        {p.name}
                                        {p.tag && (
                                            <span className="ml-2 align-middle rounded bg-[#191919] text-[#EFECE6] text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5">
                                                {p.tag}
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-sm text-[#191919]/50 mt-0.5">{p.price}</p>
                                </div>
                                <button
                                    data-testid="demo-moda-add-button"
                                    onClick={() => setCart((c) => c + 1)}
                                    className="rounded-lg border border-[#191919]/25 text-sm font-semibold px-3.5 py-2 hover:bg-[#191919] hover:text-[#EFECE6] active:scale-95 transition-all"
                                >
                                    Afegir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-[#191919]/10 px-6 sm:px-10 py-12 flex flex-col sm:flex-row justify-between gap-6 text-sm">
                <div className="flex gap-8 text-[#191919]/60">
                    <span>Lli orgànic</span>
                    <span>Producció local</span>
                    <span>Tallers de barri</span>
                </div>
                <p className="font-mono text-xs text-[#191919]/40">
                    © Atelier Nua — demo maquetada per Webilo
                </p>
            </div>
        </div>
    );
};

export default ModaDemo;
