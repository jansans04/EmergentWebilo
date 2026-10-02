import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag, X } from "lucide-react";
import { IMAGES } from "@/data/content";

const fakeLink = (e) => e.preventDefault();

const PRODUCTS = [
    {
        id: "p1",
        img: IMAGES.modaP1,
        name: "Blàzer oversized de llana",
        price: 165,
        tag: "Nou",
        span: "sm:col-span-2",
    },
    { id: "p2", img: IMAGES.modaP2, name: "Trinxera de cotó", price: 189, tag: null },
    { id: "p3", img: IMAGES.modaP3, name: "Vestit de festa", price: 129, tag: null },
];

export const ModaDemo = () => {
    const [items, setItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [bump, setBump] = useState(0);
    const [justAdded, setJustAdded] = useState(null);
    const [ordered, setOrdered] = useState(false);

    const totalQty = items.reduce((n, it) => n + it.qty, 0);
    const total = items.reduce((n, it) => n + it.qty * it.price, 0);

    const addToCart = (p) => {
        setItems((prev) => {
            const found = prev.find((it) => it.id === p.id);
            if (found)
                return prev.map((it) =>
                    it.id === p.id ? { ...it, qty: it.qty + 1 } : it,
                );
            return [...prev, { id: p.id, name: p.name, img: p.img, price: p.price, qty: 1 }];
        });
        setBump((b) => b + 1);
        setJustAdded(p.id);
        setTimeout(() => setJustAdded((j) => (j === p.id ? null : j)), 1300);
    };

    const openCart = () => {
        setOrdered(false);
        setCartOpen(true);
    };

    return (
        <div
            data-testid="demo-moda"
            className="relative overflow-hidden bg-[#EFECE6] text-[#191919]"
        >
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
                    data-testid="demo-moda-cart"
                    onClick={openCart}
                    className="flex items-center gap-2 rounded-lg border border-[#191919]/25 text-sm font-semibold px-4 py-2 hover:bg-[#191919] hover:text-[#EFECE6] transition-colors"
                >
                    <motion.span
                        key={bump}
                        initial={bump ? { scale: 1.45 } : false}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="flex"
                    >
                        <ShoppingBag size={15} />
                    </motion.span>
                    Cistella ({totalQty})
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
                        <div key={p.id} className={`${p.span} group`}>
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
                                    <p className="text-sm text-[#191919]/50 mt-0.5">{p.price} €</p>
                                </div>
                                <button
                                    data-testid="demo-moda-add-button"
                                    onClick={() => addToCart(p)}
                                    className={`shrink-0 rounded-lg text-sm font-semibold px-3.5 py-2 active:scale-95 transition-all ${
                                        justAdded === p.id
                                            ? "bg-[#191919] text-[#EFECE6]"
                                            : "border border-[#191919]/25 hover:bg-[#191919] hover:text-[#EFECE6]"
                                    }`}
                                >
                                    {justAdded === p.id ? "Afegit ✓" : "Afegir"}
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

            <AnimatePresence>
                {justAdded && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.96 }}
                        className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#191919] px-4 py-2.5 text-sm font-semibold text-[#EFECE6] shadow-xl"
                    >
                        <Check size={15} className="text-[#B7D7C8]" />
                        Producte afegit a la cistella
                    </motion.div>
                )}
                {cartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCartOpen(false)}
                            className="fixed inset-0 bg-[#191919]/30 z-10"
                        />
                        <motion.aside
                            initial={{ x: "110%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "110%" }}
                            transition={{ type: "spring", stiffness: 260, damping: 28 }}
                            className="fixed top-0 right-0 bottom-0 z-20 w-[88%] max-w-sm bg-[#EFECE6] border-l border-[#191919]/10 p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between">
                                <p className="font-display font-bold text-xl">La teva cistella</p>
                                <button
                                    data-testid="demo-moda-close-cart"
                                    onClick={() => setCartOpen(false)}
                                    aria-label="Tancar cistella"
                                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#191919]/20 hover:bg-[#191919]/5"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {ordered ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                                    <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#191919] text-[#EFECE6]">
                                        <Check size={24} />
                                    </span>
                                    <p className="font-display font-bold text-xl">
                                        Comanda rebuda!
                                    </p>
                                    <p className="text-sm text-[#191919]/60">
                                        Aquesta és una demo: el pagament no està
                                        connectat, però ja veus com quedaria el
                                        teu procés de compra.
                                    </p>
                                    <button
                                        data-testid="demo-moda-continue"
                                        onClick={() => {
                                            setItems([]);
                                            setCartOpen(false);
                                        }}
                                        className="mt-2 rounded-lg bg-[#191919] text-[#EFECE6] text-sm font-semibold px-5 py-3"
                                    >
                                        Seguir comprant
                                    </button>
                                </div>
                            ) : items.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
                                    <ShoppingBag size={26} className="text-[#191919]/30" />
                                    <p className="text-sm text-[#191919]/60">
                                        La cistella és buida.
                                        <br />
                                        Afegeix alguna peça de la col·lecció.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <ul className="mt-6 flex-1 space-y-4 overflow-y-auto">
                                        {items.map((it) => (
                                            <li
                                                key={it.id}
                                                className="flex items-center justify-between gap-3 border-b border-[#191919]/10 pb-4"
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <img src={it.img} alt="" className="h-12 w-10 shrink-0 rounded object-cover" />
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold">{it.name}</p>
                                                    <p className="text-xs text-[#191919]/50">
                                                        {it.qty} × {it.price} €
                                                    </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        data-testid="demo-moda-decrease"
                                                        onClick={() =>
                                                            setItems((prev) =>
                                                                prev
                                                                    .map((x) =>
                                                                        x.id === it.id
                                                                            ? { ...x, qty: x.qty - 1 }
                                                                            : x,
                                                                    )
                                                                    .filter((x) => x.qty > 0),
                                                            )
                                                        }
                                                        aria-label="Reduir quantitat"
                                                        className="flex h-7 w-7 items-center justify-center rounded border border-[#191919]/25 text-sm leading-none hover:bg-[#191919]/5"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-4 text-center text-sm font-semibold">
                                                        {it.qty}
                                                    </span>
                                                    <button
                                                        data-testid="demo-moda-increase"
                                                        onClick={() => addToCart(PRODUCTS.find((p) => p.id === it.id))}
                                                        aria-label="Augmentar quantitat"
                                                        className="flex h-7 w-7 items-center justify-center rounded border border-[#191919]/25 text-sm leading-none hover:bg-[#191919]/5"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4 border-t border-[#191919]/10">
                                        <div className="flex justify-between text-sm font-semibold">
                                            <span>Total</span>
                                            <span data-testid="demo-moda-total">{total} €</span>
                                        </div>
                                        <button
                                            data-testid="demo-moda-checkout"
                                            onClick={() => setOrdered(true)}
                                            className="mt-4 w-full h-12 rounded-xl bg-[#191919] text-[#EFECE6] font-semibold hover:opacity-90 active:scale-[0.99] transition-all"
                                        >
                                            Tramet la comanda
                                        </button>
                                        <p className="mt-2.5 text-center font-mono text-[10px] text-[#191919]/40">
                                            Demo: el pagament no està connectat
                                        </p>
                                    </div>
                                </>
                            )}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModaDemo;
