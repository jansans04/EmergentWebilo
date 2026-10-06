import { Phone } from "lucide-react";
import { IMAGES } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";

const fakeLink = (e) => e.preventDefault();

export const FusteriaDemo = () => {
    const { language } = useLanguage();
    const copy = language === "es" ? {
        home: "Inicio", projects: "Proyectos", workshop: "El taller", contact: "Contacto", quote: "Pide presupuesto",
        eyebrow: "Carpintería artesanal · Vic, 1987", title: "Madera que dura generaciones.", intro: "Muebles, cocinas y restauración a medida. Hecho a mano, como antes.",
        stats: ["años de oficio", "proyectos entregados", "madera de proximidad"], recent: "Proyectos recientes", gallery: ["Cocina de roble macizo", "Restauración de balcones", "Taller a medida"],
        process: "Del plano al montaje", bullets: ["Diseño y plano a medida", "Selección de madera en el taller", "Montaje y acabado en tu casa"], cta: "Nos explicas qué necesitas y tienes presupuesto en 48 h.", call: "Llámanos: 93 000 00 00",
    } : {
        home: "Inici", projects: "Projectes", workshop: "El taller", contact: "Contacte", quote: "Demana pressupost",
        eyebrow: "Fusteria artesanal · Vic, 1987", title: "Fusta que dura generacions.", intro: "Mobles, cuines i restauració a mida. Fet a mà, com abans.",
        stats: ["anys d'ofici", "projectes lliurats", "fusta de proximitat"], recent: "Projectes recents", gallery: ["Cuina de roure massís", "Restauració de baies", "Taller a mida"],
        process: "Del planol al muntatge", bullets: ["Disseny i planol a mida", "Selecció de fusta al taller", "Muntatge i acabat a casa teva"], cta: "Ens expliques què necessites i tens el pressupost en 48 h.", call: "Truca'ns: 93 000 00 00",
    };
    return (
    <div data-testid="demo-fusteria" className="bg-[#22150B] text-[#F3E9DB]">
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10">
            <span className="font-display font-bold text-lg tracking-tight">
                Mas &amp; Fills
            </span>
            <nav className="hidden sm:flex items-center gap-6 text-sm text-[#F3E9DB]/70">
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">{copy.home}</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">{copy.projects}</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">{copy.workshop}</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#D9A05B]">{copy.contact}</a>
            </nav>
            <a
                href="#"
                onClick={fakeLink}
                className="rounded-lg bg-[#D9A05B] text-[#22150B] text-sm font-semibold px-4 py-2"
            >
                {copy.quote}
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
                    {copy.eyebrow}
                </p>
                <h1 className="mt-3 font-display font-bold text-4xl sm:text-6xl leading-[1.05]">
                    {copy.title}
                </h1>
                <p className="mt-4 text-[#F3E9DB]/75 text-lg">
                    {copy.intro}
                </p>
            </div>
        </div>

        <div className="border-y border-white/10 px-6 sm:px-10 py-8 grid grid-cols-3 gap-6 text-center">
            {[
                ["38", copy.stats[0]],
                ["+600", copy.stats[1]],
                ["100%", copy.stats[2]],
            ].map(([n, l]) => (
                <div key={l}>
                    <p className="font-display font-bold text-2xl sm:text-4xl text-[#D9A05B]">{n}</p>
                    <p className="mt-1 text-xs sm:text-sm text-[#F3E9DB]/60">{l}</p>
                </div>
            ))}
        </div>

        <div className="px-6 sm:px-10 py-14">
            <h2 className="font-display font-bold text-2xl sm:text-4xl">
                {copy.recent}
            </h2>
            <div className="mt-8 grid sm:grid-cols-3 gap-5">
                {[
                    [IMAGES.fusteriaG1, copy.gallery[0]],
                    [IMAGES.fusteriaG2, copy.gallery[1]],
                    [IMAGES.fusteriaG3, copy.gallery[2]],
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
                    {copy.process}
                </h2>
                <ul className="mt-6 space-y-3 text-[#F3E9DB]/75">
                    {[
                        ...copy.bullets,
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
                {copy.cta}
            </h2>
            <a
                href="#"
                onClick={fakeLink}
                className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-[#D9A05B] text-[#22150B] font-semibold px-7 py-3.5"            >
                <Phone size={17} />
                {copy.call}
            </a>
            <p className="mt-8 text-xs text-[#F3E9DB]/40 font-mono">
                © Mas &amp; Fills — demo maquetada per Webilo
            </p>
        </div>
    </div>
    );
};

export default FusteriaDemo;
