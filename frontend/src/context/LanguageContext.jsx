import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const LOCALE_OPTIONS = [
    { code: "ca", label: "CA", ready: true },
    { code: "es", label: "ES", ready: true },
    { code: "en", label: "EN", ready: false },
];

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
        services: {
            eyebrow: "Els tres serveis",
            title: "Tres maneres de tenir la teva web treballant per tu.",
            copy: "Canvia de servei i mira la demo de debò, sense sortir d'aquí. Cada exemple està maquetat com si fos d'un client nostre.",
            popular: "Més escollit",
            from: "Des de",
            delivery: "Entrega en",
            forWhom: "Per a qui:",
            want: "Ho vull",
            details: "Demo i detalls a sota ↓",
            indicative: "preu orientatiu",
        },
        contact: {
            faqTitle: "Les preguntes de sempre, respostes sense embuts.",
            faqEyebrow: "Preguntes freqüents",
            formTitle: "Explica'ns el teu projecte",
            response: "Et contestem en menys de 24 hores laborables.",
            name: "Nom i cognoms *",
            email: "Email *",
            phone: "Telèfon o WhatsApp",
            service: "Servei que t'interessa",
            unknown: "Encara no ho sé",
            other: "Altre / no ho tinc clar",
            urgency: "Quan ho necessites?",
            soon: "Com més aviat millor",
            weeks: "En 2-3 setmanes",
            planning: "Estic planejant",
            message: "El teu projecte, en dues línies *",
            submit: "Envia la consulta",
            sending: "Enviant…",
            or: "o si ho tens clar",
            whatsapp: "Escriu-nos per WhatsApp",
        },
        hero: {
            lines: ["Dissenyem webs", "que fan feina,", "no només boniques."],
            availability: "Disponibilitat per a nous projectes — 2 places aquest mes",
            description: "Webilo és un estudi petit on cada web es fa a mà: aparadors, webs professionals i botigues en línia.",
            emphasis: "Aquesta pàgina que estàs veient? També és nostra.",
            services: "Veure serveis",
            whatsapp: "Parlem per WhatsApp",
            response: "Resposta en < 24 h · Barcelona & Girona · Sense compromís",
            scroll: "scroll",
        },
        how: {
            eyebrow: "Com funciona",
            title: "Del primer cafè al llançament en quatre passes.",
            steps: [
                ["Briefing sense tecnicismes", "Ens expliques què fas i què vols aconseguir. Un cafè, una hora, i sortim amb objectius clars i pressupost tancat."],
                ["Prototip en viu", "En uns 5 dies veus el disseny real, dins del navegador. Pots clickar-hi, no imaginar-ho sobre un PDF."],
                ["Producció i continguts", "Codi net, textos revisats i velocitat extrema. Va veient l'avanç per camí, sense posts de sorpresa."],
                ["Llançament i formació", "Publiquem la web, te'n donem les claus i t'ensenyem a fer-hi canvis. Després, si cal, hi som."],
            ],
            stats: ["Temps mitjà de càrrega", "Termini mig d'entrega", "Codi propi, sense plantilles", "Comissions per cada venda"],
            why: ["Parles directament amb qui dissenya i programa el teu projecte. Cap gestor de comptes al mig.", "Preu tancat per escrit abans de començar. El que signes és el que pagues.", "La web és teva: codi, domini i continguts. Sense captivitat ni lletigosis."],
            cta: "Vull la meva web",
        },
        quiz: { title: "No saps què necessites?", subtitle: "Tres preguntes, trenta segons, cap registre.", question: "Pregunta", previous: "Pregunta anterior", result: "El teu resultat", quote: "Demana pressupost", restart: "Torna a començar" },
        footer: { description: "L'estudi de disseny i desenvolupament web per a qui valora els detalls i els resultats.", navigate: "Navega", contact: "Contacte", directWhatsapp: "WhatsApp directe", location: "Barcelona & Girona", legal: "© Webilo — [s'ha d'afegir: dades legals i registre]", made: "Fet a Catalunya amb React, FastAPI i molt de cafè." },
        faq: { items: [["Quant trigareu a tenir la web a punt?", "Un Aparador triga entre 7 i 10 dies; una Web Professional, unes 2 setmanes; una Botiga, unes 3. Les dates es tanquen per escrit abans de començar."], ["He de pagar quotes mensuals obligatòries?", "No. Pagues el disseny i el desenvolupament i prou. Després només té el cost real del domini i l'allotjament."], ["Puc editar jo mateix els continguts?", "Sí. Les webs inclouen un panell senzill per canviar textos i imatges, i t'ensenyem a fer-lo servir."], ["Com funciona el pagament?", "50% per començar i 50% en lliurar. Sense quotes sorpresa ni renovacions automàtiques."], ["Ja tinc el domini comprat, hi ha cap problema?", "Cap. Hi connectem la nova web o traslladem la gestió al teu compte."]] },
        demo: { build: "muntant l'estructura…", content: "afegint el contingut…", images: "posant-hi imatges…", details: "últims detalls…", published: "publicada ✓", replay: "torna a muntar-la", manual: "munta-la tu", automatic: "que la munti sola" },
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
        services: {
            eyebrow: "Los tres servicios",
            title: "Tres maneras de tener tu web trabajando para ti.",
            copy: "Cambia de servicio y mira la demo de verdad, sin salir de aquí. Cada ejemplo está maquetado como si fuera de un cliente nuestro.",
            popular: "Más elegido",
            from: "Desde",
            delivery: "Entrega en",
            forWhom: "Para quién:",
            want: "Lo quiero",
            details: "Demo y detalles debajo ↓",
            indicative: "precio orientativo",
        },
        contact: {
            faqTitle: "Las preguntas de siempre, respondidas sin rodeos.",
            faqEyebrow: "Preguntas frecuentes",
            formTitle: "Cuéntanos tu proyecto",
            response: "Te respondemos en menos de 24 horas laborables.",
            name: "Nombre y apellidos *",
            email: "Email *",
            phone: "Teléfono o WhatsApp",
            service: "Servicio que te interesa",
            unknown: "Todavía no lo sé",
            other: "Otro / no lo tengo claro",
            urgency: "¿Cuándo lo necesitas?",
            soon: "Cuanto antes mejor",
            weeks: "En 2-3 semanas",
            planning: "Lo estoy planificando",
            message: "Tu proyecto, en dos líneas *",
            submit: "Enviar consulta",
            sending: "Enviando…",
            or: "o si ya lo tienes claro",
            whatsapp: "Escríbenos por WhatsApp",
        },
        hero: {
            lines: ["Diseñamos webs", "que trabajan,", "no solo bonitas."],
            availability: "Disponibilidad para nuevos proyectos — 2 plazas este mes",
            description: "Webilo es un estudio pequeño donde cada web se hace a mano: escaparates, webs profesionales y tiendas online.",
            emphasis: "¿Esta página que estás viendo? También es nuestra.",
            services: "Ver servicios",
            whatsapp: "Hablemos por WhatsApp",
            response: "Respuesta en < 24 h · Barcelona & Girona · Sin compromiso",
            scroll: "scroll",
        },
        how: {
            eyebrow: "Cómo funciona",
            title: "Del primer café al lanzamiento en cuatro pasos.",
            steps: [["Briefing sin tecnicismos", "Nos explicas qué haces y qué quieres conseguir. Un café, una hora, y salimos con objetivos claros y presupuesto cerrado."], ["Prototipo en vivo", "En unos 5 días ves el diseño real, dentro del navegador. Puedes hacer clic, no imaginarlo sobre un PDF."], ["Producción y contenidos", "Código limpio, textos revisados y velocidad extrema. Ves el avance de camino, sin sorpresas."], ["Lanzamiento y formación", "Publicamos la web, te damos las llaves y te enseñamos a hacer cambios. Después, si hace falta, seguimos ahí."]],
            stats: ["Tiempo medio de carga", "Plazo medio de entrega", "Código propio, sin plantillas", "Comisiones por cada venta"],
            why: ["Hablas directamente con quien diseña y programa tu proyecto. Sin gestores de cuentas de por medio.", "Precio cerrado por escrito antes de empezar. Lo que firmas es lo que pagas.", "La web es tuya: código, dominio y contenidos. Sin cautividad ni letra pequeña."],
            cta: "Quiero mi web",
        },
        quiz: { title: "¿No sabes qué necesitas?", subtitle: "Tres preguntas, treinta segundos, sin registros.", question: "Pregunta", previous: "Pregunta anterior", result: "Tu resultado", quote: "Pedir presupuesto", restart: "Empezar de nuevo" },
        footer: { description: "El estudio de diseño y desarrollo web para quien valora los detalles y los resultados.", navigate: "Navega", contact: "Contacto", directWhatsapp: "WhatsApp directo", location: "Barcelona & Girona", legal: "© Webilo — [añadir: datos legales y registro]", made: "Hecho en Cataluña con React, FastAPI y mucho café." },
        faq: { items: [["¿Cuánto tardaréis en tener la web lista?", "Un escaparate tarda entre 7 y 10 días; una web profesional, unas 2 semanas; una tienda, unas 3. Las fechas se cierran por escrito antes de empezar."], ["¿Tengo que pagar cuotas mensuales obligatorias?", "No. Pagas el diseño y el desarrollo. Después solo existe el coste real del dominio y el alojamiento."], ["¿Puedo editar yo mismo los contenidos?", "Sí. Las webs incluyen un panel sencillo para cambiar textos e imágenes, y te enseñamos a utilizarlo."], ["¿Cómo funciona el pago?", "50% al empezar y 50% al entregar. Sin cuotas sorpresa ni renovaciones automáticas."], ["Ya tengo el dominio comprado, ¿hay algún problema?", "Ninguno. Conectamos la nueva web o trasladamos la gestión a tu cuenta."]] },
        demo: { build: "montando la estructura…", content: "añadiendo el contenido…", images: "poniendo imágenes…", details: "últimos detalles…", published: "publicada ✓", replay: "volver a montarla", manual: "móntala tú", automatic: "que la monte sola" },
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
