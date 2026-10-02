import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PROJECTS = [
    {
        id: "kuvings",
        url: "https://www.kuvings.es",
        className: "bg-[#dce8e5]",
        image: "https://images.unsplash.com/photo-1606914469633-bd3928f0e8a5?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: "cafeoca",
        url: "https://cafeocafe.com",
        className: "bg-[#efe0ce]",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
    },
];

export const ProjectShowcase = () => {
    const { t } = useLanguage();

    return (
        <section id="projectes" className="bg-white py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="max-w-3xl">
                    <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-turquoise-dark">{t("realProjectsEyebrow")}</p>
                    <h2 className="mt-4 font-display font-bold tracking-tight text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06] text-navy">{t("realProjectsTitle")}</h2>
                    <p className="mt-5 text-lg text-slateblue max-w-2xl">{t("realProjectsCopy")}</p>
                </div>
                <div className="mt-12 grid lg:grid-cols-2 gap-6">
                    {PROJECTS.map((project) => {
                        const copy = t(`projects.${project.id}`);
                        return (
                            <article key={project.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
                                <div className={`relative aspect-[16/10] overflow-hidden ${project.className}`}>
                                    <img src={project.image} alt={copy.title} className="h-full w-full object-cover mix-blend-multiply opacity-80 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                                    <span className="absolute left-5 bottom-5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-navy">{copy.category}</span>
                                </div>
                                <div className="flex items-end justify-between gap-5 p-5 sm:p-7">
                                    <div>
                                        <h3 className="font-display text-2xl font-bold text-navy">{copy.title}</h3>
                                        <p className="mt-2 max-w-md text-sm leading-relaxed text-slateblue">{copy.description}</p>
                                    </div>
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${t("visitWebsite")}: ${copy.title}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-turquoise hover:text-navy"><ArrowUpRight size={18} /></a>
                                </div>
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-t border-slate-200 px-5 py-3.5 text-sm font-semibold text-navy transition-colors hover:text-turquoise-dark sm:px-7"><ExternalLink size={15} />{t("visitWebsite")}</a>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProjectShowcase;
