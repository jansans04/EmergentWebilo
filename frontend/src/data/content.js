export const WHATSAPP_NUMBER = "34600000000"; // [s'ha d'afegir] número real de WhatsApp
export const EMAIL = "hola@webilo.cat"; // [s'ha d'afegir] email real de destí

export const waLink = (msg) =>
    `https://wa.me/${WHATSAPP_NUMBER}${
        msg ? `?text=${encodeURIComponent(msg)}` : ""
    }`;

export const IMAGES = {
    fusteriaHero:
        "https://images.unsplash.com/photo-1631396326646-c06a935ff3a6?crop=entropy&cs=srgb&fm=jpg&q=85",
    fusteriaG1: "https://images.pexels.com/photos/7480729/pexels-photo-7480729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    fusteriaG2:
        "https://images.unsplash.com/photo-1547609434-b732edfee020?crop=entropy&cs=srgb&fm=jpg&q=85",
    fusteriaG3:
        "https://images.unsplash.com/photo-1631396326838-de37e5f8bcbc?crop=entropy&cs=srgb&fm=jpg&q=85",
    fusteriaTaller:
        "https://images.pexels.com/photos/33005110/pexels-photo-33005110.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    dentalHero:
        "https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=srgb&fm=jpg&q=85",
    dentalInterior:
        "https://images.pexels.com/photos/9062527/pexels-photo-9062527.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    modaHero:
        "https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=srgb&fm=jpg&q=85",
    modaP1: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?crop=entropy&cs=srgb&fm=jpg&q=85",
    modaP2: "https://images.pexels.com/photos/36624450/pexels-photo-36624450.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    modaP3:
        "https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?crop=entropy&cs=srgb&fm=jpg&q=85",
};

export const SERVICES = [
    {
        id: "aparador",
        index: "01",
        name: "Aparador",
        badge: "Llançament ràpid",
        badgeFeatured: false,
        tagline: "Presència professional immediata per a negocis locals i autònoms.",
        price: "650",
        priceNote: "preu orientatiu — el pressupost es tanca per escrit abans de començar",
        timeframe: "7-10 dies",
        target:
            "Professionals autònoms, petits tallers i negocis locals que necessiten credibilitat ràpida.",
        features: [
            "One-page ultraràpida pensada per convertir",
            "WhatsApp i trucada amb un sol clic",
            "SEO local i Google Business configurats",
            "Allotjament ràpid i certificat SSL inclòs",
        ],
        demoId: "fusteria",
        demoUrl: "fusteria-mas.webilo.cat",
        demoTitle: "Fusteria Mas & Fills",
        previewImg: IMAGES.fusteriaHero,
    },
    {
        id: "professional",
        index: "02",
        name: "Web Professional",
        badge: "La més completa",
        badgeFeatured: false,
        tagline: "La web corporativa completa per captar clients i transmetre autoritat.",
        price: "1.250",
        priceNote: "preu orientatiu — el pressupost es tanca per escrit abans de començar",
        timeframe: "≈ 2 setmanes",
        target:
            "Clíniques, despatxos, enginyeries i empreses de serveis en creixement.",
        features: [
            "Fins a 5 pàgines d'alt impacte",
            "Reserva de cites o formulari de leads",
            "Càrrega en menys d'1 segon",
            "Panell per editar textos i imatges",
        ],
        demoId: "dentista",
        demoUrl: "dental-ramoneda.webilo.cat",
        demoTitle: "Clínica Dental Ramoneda",
        previewImg: IMAGES.dentalHero,
    },
    {
        id: "botiga",
        index: "03",
        name: "Botiga Online",
        badge: "Més escollit",
        badgeFeatured: true,
        tagline: "Venc els teus productes amb una experiència de compra fluida.",
        price: "1.950",
        priceNote: "preu orientatiu — el pressupost es tanca per escrit abans de començar",
        timeframe: "≈ 3 setmanes",
        target:
            "Marques de moda, artesans i productors locals que volen vendre arreu.",
        features: [
            "Catàleg amb variants, fotos i stock",
            "Pagament segur: targeta, Bizum, Apple Pay",
            "Cistella optimitzada, zero comissions nostres",
            "Gestió de comandes i enviaments",
        ],
        demoId: "moda",
        demoUrl: "atelier-nua.webilo.cat",
        demoTitle: "Atelier Nua — Moda",
        previewImg: IMAGES.modaHero,
    },
];

export const MARQUEE_ITEMS = [
    "Codi net i propi",
    "Entrega en 10-15 dies",
    "100% responsive, mòbil inclòs",
    "Parles directament amb qui la programa",
    "Sense comissions de vendes",
    "Domini i allotjament gestionats",
    "Fet a Catalunya",
];

export const FAQS = [
    {
        q: "Quant trigareu a tenir la web a punt?",
        a: "Un Aparador triga entre 7 i 10 dies; una Web Professional, unes 2 setmanes; una Botiga, unes 3. Les dates es tanquen per escrit abans de començar.",
    },
    {
        q: "He de pagar quotes mensuals obligatòries?",
        a: "No. Pagues el disseny i el desenvolupament i prou. Després només té el cost real del domini i l'allotjament — si vols, els gestionem nosaltres sense marge amagat.",
    },
    {
        q: "Puc editar jo mateix els continguts?",
        a: "Sí. Les webs inclouen un panell senzill per canviar textos i imatges, i t'ensenyem a fer-lo servir. La formació va inclosa.",
    },
    {
        q: "Com funciona el pagament?",
        a: "50% per començar i 50% en lliurar. Per transferència o targeta. Sense quotes sorpresa ni renovacions automàtiques.",
    },
    {
        q: "Ja tinc el domini comprat, hi ha cap problema?",
        a: "Cap. Hi connectem la nova web o traslladem la gestió al teu compte. Tu decideixes on viu el teu domini.",
    },
];

export const QUIZ = [
    {
        id: "q1",
        q: "Què fas, a grans trets?",
        options: [
            {
                label: "Sóc autònom o tinc un petit taller",
                score: { aparador: 2 },
            },
            {
                label: "Ofereixo serveis professionals (clínica, despatx, enginyeria…)",
                score: { professional: 2 },
            },
            {
                label: "Venc productes físics",
                score: { botiga: 2 },
            },
            {
                label: "És una marca personal o un projecte nou",
                score: { aparador: 1, professional: 1 },
            },
        ],
    },
    {
        id: "q2",
        q: "Què vols que faci la web?",
        options: [
            {
                label: "Que em trobin a Google i em truquin",
                score: { aparador: 3 },
            },
            {
                label: "Captar clients i rebre reserves o pressupostos",
                score: { professional: 3 },
            },
            {
                label: "Vendre productes amb pagament en línia",
                score: { botiga: 3 },
            },
            {
                label: "Renovar una web que ja està verda",
                score: { professional: 1, aparador: 1 },
            },
        ],
    },
    {
        id: "q3",
        q: "Quan el necessites?",
        options: [
            {
                label: "Com més aviat, millor",
                score: { aparador: 1 },
            },
            {
                label: "En un parell de setmanes aniria bé",
                score: { professional: 1 },
            },
            {
                label: "Encara ho estic planejant amb calma",
                score: { botiga: 1 },
            },
        ],
    },
];

export const QUIZ_RATIONALE = {
    aparador:
        "Necessites presència sòlida i ràpida: que et trobin, et truquin i es creguin que ets de confiança. Un aparador ben fet ho resol.",
    professional:
        "El teu objectiu és captar clients qualificats i transmetre autoritat: una web professional amb contingut ben pensat i reserva de cites és l'eina.",
    botiga:
        "Vens producte: necessites una botiga que converteixi visites en comandes, amb pagament segur i sense comissions afegides.",
};

export const NAV_LINKS = [
    { id: "serveis", label: "Serveis" },
    { id: "demos", label: "Demos" },
    { id: "com-funciona", label: "Com funciona" },
    { id: "faq", label: "FAQ" },
];
