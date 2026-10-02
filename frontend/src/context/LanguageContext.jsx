import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
    ca: {
        nav: { services: "Serveis", demos: "Demos", process: "Com funciona", faq: "FAQ", contact: "Contacta", projects: "Projectes" },
        language: "Idioma",
        languageLabel: "Canvia l'idioma",
        openDemo: "Obrir demo",
        viewProjects: "Veure projectes",
        realProjectsEyebrow: "Projectes que ja estan en línia",
        realProjectsTitle: "No només ho expliquem. Mira webs que ja treballen.",
        realProjectsCopy: "Una selecció de projectes desenvolupats per Webilo, amb la mateixa cura pel detall que veus en les nostres demos.",
        visitWebsite: "Visitar web",
        projects: {
            kuvings: { category: "E-commerce · Producte", title: "Kuvings España", description: "Una experiència de compra clara i enfocada a convertir interès en vendes." },
            cafeoca: { category: "Marca · Cafè", title: "Cafè Oca", description: "Una presència digital amb caràcter per explicar l'origen, el producte i la marca." },
        },
        demoNote: "Demos maquetades per ensenyar-te com podria funcionar la teva web.",
        demoDetail: "Interacciona amb cada exemple: navega, afegeix productes i prova els fluxos.",
    },
    es: {
        nav: { services: "Servicios", demos: "Demos", process: "Cómo funciona", faq: "FAQ", contact: "Contacta", projects: "Proyectos" },
        language: "Idioma",
        languageLabel: "Cambiar idioma",
        openDemo: "Abrir demo",
        viewProjects: "Ver proyectos",
        realProjectsEyebrow: "Proyectos que ya están online",
        realProjectsTitle: "No solo lo contamos. Mira webs que ya trabajan.",
        realProjectsCopy: "Una selección de proyectos desarrollados por Webilo, con el mismo cuidado por el detalle que ves en nuestras demos.",
        visitWebsite: "Visitar web",
        projects: {
            kuvings: { category: "E-commerce · Producto", title: "Kuvings España", description: "Una experiencia de compra clara y enfocada en convertir interés en ventas." },
            cafeoca: { category: "Marca · Café", title: "Cafè Oca", description: "Una presencia digital con carácter para explicar el origen, el producto y la marca." },
        },
        demoNote: "Demos maquetadas para enseñarte cómo podría funcionar tu web.",
        demoDetail: "Interactúa con cada ejemplo: navega, añade productos y prueba los flujos.",
    },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => localStorage.getItem("webilo-language") || "ca");

    useEffect(() => {
        localStorage.setItem("webilo-language", language);
        document.documentElement.lang = language;
    }, [language]);

    const value = useMemo(() => ({
        language,
        setLanguage,
        t: (key) => key.split(".").reduce((value, part) => value?.[part], translations[language]) || key,
    }), [language]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
