import { Phone } from "lucide-react";
import { IMAGES } from "@/data/content";

const fakeLink = (e) => e.preventDefault();

export const FusteriaDemo = () => (
    <div data-testid="demo-fusteria" className="bg-[#22150B] text-[#F3E9DB]">
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10">
            <span className="font-display font-bold text-lg tracking-tight">
                Mas &amp; Fills
            </span>
            <nav className="hidden sm:flex items-center gap-6 text-sm text-[#F3E9DB]/70">
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">Inici</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">Projectes</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">El taller</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">Contacte</a>
            </nav>
            <a
                href="#"
                onClick={fakeLink}
                className="rounded-lg bg-[#D9A05B] text-[#22150B] text-sm font-semibold px-4 py-2"
            >
                Demana pressupost
            </a>
        </div>

        <div className="relative h-[420px] sm:h-[520px]">
            <img
                src={IMAGES.fusteriaHero}
                alt="Fuster artesà treballant una cadira al taller"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#22150B] via-[#22150B]/40 to-[#22150B]/20" />
            <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-12 max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#D9A05B]">
                    Fusteria artesanal · Vic, 1987
                </p>
                <h1 className="mt-3 font-display font-bold text-4xl sm:text-6xl leading-[1.05]">
                    Fusta que dura generacions.
                </h1>
                <p className="mt-4 text-[#F3E9DB]/75 text-lg">
                    Mobles, cuines i restauració a mida. Fet a mà, com abans.
                </p>
            </div>
        </div>

        <div className="border-y border-white/10 px-6 sm:px-10 py-8 grid grid-cols-3 gap-6 text-center">
            {[
                ["38", "anys d'ofici"],
                ["+600", "projectes lliurats"],
                ["100%", "fusta de proximitat"],
            ].map(([n, l]) => (
                <div key={l}>
                    <p className="font-display font-bold text-2xl sm:text-4xl text-[#D9A05B]">{n}</p>
                    <p className="mt-1 text-xs sm:text-sm text-[#F3E9DB]/60">{l}</p>
                </div>
            ))}
        </div>

        <div className="px-6 sm:px-10 py-14">
            <h2 className="font-display font-bold text-2xl sm:text-4xl">
                Projectes recents
            </h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
                {[
                    [IMAGES.fusteriaG1, "Cuina de roure massís"],
                    [IMAGES.fusteriaG2, "Restauració de baies"],
                    [IMAGES.fusteriaG3, "Taller a mida"],
                ].map(([img, cap]) => (
                    <figure key={cap} className="group">
                        <div className="overflow-hidden rounded-xl aspect-[4/3]">
                            <img
                                src={img}
                                alt={cap}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <figcaption className="mt-3 text-sm text-[#F3E9DB]/70">
                            {cap}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>

        <div className="px-6 sm:px-10 py-14 bg-[#2E1D10] grid sm:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <img
                    src={IMAGES.fusteriaTaller}
                    alt="Fuster liellant una superfície de fusta"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <h2 className="font-display font-bold text-2xl sm:text-4xl">
                    Del planol al muntatge
                </h2>
                <ul className="mt-6 space-y-3 text-[#F3E9DB]/75">
                    {[
                        "Disseny i planol a mida",
                        "Selecció de fusta al taller",
                        "Muntatge i acabat a casa teva",
                    ].map((s) => (
                        <li key={s} className="flex gap-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D9A05B] shrink-0" />
                            {s}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="px-6 sm:px-10 py-16 text-center border-t border-white/10">
            <h2 className="font-display font-bold text-2xl sm:text-4xl">
                Ens expliques què necessites i tens el pressupost en 48 h.
            </h2>
            <a
                href="#"
                onClick={fakeLink}
                className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-[#D9A05B] text-[#22150B] font-semibold px-7 py-3.5"            >
                <Phone size={17} />
                Truca'ns: 93 000 00 00
            </a>
            <p className="mt-8 text-xs text-[#F3E9DB]/40 font-mono">
                © Mas &amp; Fills — demo maquetada per Webilo
            </p>
        </div>
    </div>
);

export default FusteriaDemo;
