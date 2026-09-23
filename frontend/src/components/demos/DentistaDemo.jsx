import { CalendarCheck, Sparkles, Smile, Stethoscope } from "lucide-react";
import { IMAGES } from "@/data/content";

const fakeLink = (e) => e.preventDefault();

export const DentistaDemo = () => (
    <div data-testid="demo-dentista" className="bg-white text-[#12314F]">
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#EBF3FA]">
            <span className="font-display font-bold text-lg text-[#0F4C81]">
                Clínica Ramoneda
            </span>
            <nav className="hidden sm:flex items-center gap-6 text-sm text-[#12314F]/70">
                <a href="#" onClick={fakeLink} className="hover:text-[#0F4C81]">Tractaments</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#0F4C81]">Equip</a>
                <a href="#" onClick={fakeLink} className="hover:text-[#0F4C81]">La clínica</a>
            </nav>
            <a
                href="#"
                onClick={fakeLink}
                className="rounded-lg bg-[#0F4C81] text-white text-sm font-semibold px-4 py-2"
            >
                Demana cita
            </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-10 items-center px-6 sm:px-10 py-14">
            <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#0F4C81]/70">
                    Odontologia a Barcelona
                </p>
                <h1 className="mt-3 font-display font-bold text-4xl sm:text-5xl leading-[1.08] text-[#0F2A47]">
                    Somriures que parlen per tu.
                </h1>
                <p className="mt-4 text-[#12314F]/70 text-lg">
                    Primera visita gratuïta, radiografia digital inclosa i cap
                    sorpresa al pressupost.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                    <a
                        href="#"
                        onClick={fakeLink}
                        className="rounded-xl bg-[#0F4C81] text-white font-semibold px-6 py-3.5"
                    >
                        Primera visita gratuïta
                    </a>
                    <a
                        href="#"
                        onClick={fakeLink}
                        className="rounded-xl border border-[#0F4C81]/30 text-[#0F4C81] font-semibold px-6 py-3.5"
                    >
                        Veure tractaments
                    </a>
                </div>
            </div>
            <div className="overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                    src={IMAGES.dentalHero}
                    alt="Sala d'espera moderna de la clínica"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

        <div className="bg-[#EBF3FA] px-6 sm:px-10 py-14">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#0F2A47]">
                Tractaments
            </h2>
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    [Stethoscope, "Odontologia general"],
                    [Sparkles, "Estètica dental"],
                    [Smile, "Ortodòncia invisible"],
                    [CalendarCheck, "Implantologia"],
                ].map(([Icon, label]) => (
                    <div
                        key={label}
                        className="rounded-2xl bg-white p-6 border border-[#0F4C81]/10"
                    >
                        <Icon size={26} className="text-[#0F4C81]" />
                        <p className="mt-4 font-semibold text-[#0F2A47]">{label}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="px-6 sm:px-10 py-14 grid sm:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden rounded-2xl aspect-[4/3] order-2 sm:order-1">
                <img
                    src={IMAGES.dentalInterior}
                    alt="Gabinet dental amb equip modern"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="order-1 sm:order-2">
                <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#0F2A47]">
                    L'equip que et rebrà
                </h2>
                <div className="mt-6 space-y-4">
                    {[
                        ["DR", "Dr. Ramoneda", "Odontòleg · col·legiat 4.821"],
                        ["MC", "Dra. Costa", "Ortodòncia invisible"],
                        ["JM", "Marsal", "Higienista dental"],
                    ].map(([ini, nom, rol]) => (
                        <div
                            key={nom}
                            className="flex items-center gap-4 rounded-xl border border-[#EBF3FA] bg-[#F7FAFD] p-4"
                        >
                            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0F4C81] text-white font-display font-bold text-sm shrink-0">
                                {ini}
                            </span>
                            <div>
                                <p className="font-semibold text-[#0F2A47]">{nom}</p>
                                <p className="text-sm text-[#12314F]/60">{rol}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="px-6 sm:px-10 pb-16">
            <div className="rounded-2xl bg-[#0F4C81] text-white p-8 sm:p-12 grid sm:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="font-display font-bold text-2xl sm:text-3xl">
                        Demana la teva primera visita
                    </h2>
                    <p className="mt-3 text-white/75">
                        Truca'ns o deixa'ns les teves dades i et tornem a dir
                        hora el mateix dia.
                    </p>
                    <p className="mt-6 font-mono text-sm text-white/70">
                        ☎ 93 000 00 00
                    </p>
                </div>
                <div className="rounded-xl bg-white/10 p-5 space-y-3">
                    {["Nom i cognoms", "Telèfon", "Dia preferit"].map((ph) => (
                        <div
                            key={ph}
                            className="rounded-lg bg-white/90 text-[#12314F]/40 text-sm px-4 py-3"
                        >
                            {ph}
                        </div>
                    ))}
                    <div className="rounded-lg bg-[#7FD1F5] text-[#0F2A47] text-sm font-semibold px-4 py-3 text-center cursor-default">
                        Sol·licita dia
                    </div>
                </div>
            </div>
            <p className="mt-10 text-center text-xs text-[#12314F]/40 font-mono">
                © Clínica Dental Ramoneda — demo maquetada per Webilo
            </p>
        </div>
    </div>
);

export default DentistaDemo;
