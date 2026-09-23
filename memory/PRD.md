# PRD — Webilo Landing

## Problem statement original
Proposta d'arquitectura, UX/UI i direcció visual per a Webilo (agència de webs). Web app one-page dinàmica amb frontend React, backend FastAPI + MongoDB només per al formulari de contacte. L'usuari va aprovar implementar la proposta completa amb: copy en català, demos de fusteria + dentista + moda, placeholders clars per a preus/WhatsApp, tipografia Satoshi + Inter + JetBrains Mono.

## Decisions de disseny (direction)
- Paleta: turquesa #1FC8C0 (accent 10-15%), navy #0A2540, azure #E6F4F8, turquesa clar #7FE0DA, gris blavós #5B6B7A, ink #0B1220.
- Tipografia: Satoshi (display), Inter (body), JetBrains Mono (URLs/accents tècnics).
- Anti-patrons respectats: sense glassmorphism, sense blob gradients, sense aurora, sense animacions de loop constants, sense testimonials falsos, sense icon packs genèrics, sense emojis com a icones.
- Motion: Lenis smooth scroll, framer-motion (reveals 8-12px, crossfade+scale al switcher, hero constructiu amb wireframe que es munta, cursors magnètic, parallax lleuger, marquee editorial lent 46s). prefers-reduced-motion respectat a tot arreu.

## Arquitectura
- Frontend: React (CRA + craco), Tailwind, framer-motion, lenis, lucide-react, sonner. Sense router (one-page).
- Backend: FastAPI a /api (POST /api/contacte → MongoDB col·lecció contact_requests; validació Pydantic EmailStr; 422 si invàlid).
- Components: Navbar (sticky adaptativa + progress bar + menú fullscreen mòbil), Hero (revelat linial màscat + wireframe constructiu + parallax), SocialProof (marquee), ServiceSwitcher (tabs desktop + carrusel snap mòbil, previews en mockup de navegador, AnimatePresence), DemoModal (fullscreen, chrome de navegador, 3 demos maquetades: FusteriaDemo, DentistaDemo, ModaDemo), HowItWorks (4 passes numerades + counters + per què Webilo), Quiz (plegable, 3 preguntes, resultat recomanat), FaqContact (acordió + formulari amb preselecció de servei via "Ho vull"), Footer, WhatsAppFab (mòbil), MagneticCursor.

## Persones usuàries
- Negoci local / autònom que vol presència ràpida (Aparador).
- Empresa de serveis que vol captar clients/cites (Professional).
- Marca/artesà que vol vendre online (Botiga).

## Implementat (2026-09-21)
- Les 8 Blocs de la proposta: hero constructiu, prova social marquee, Service Switcher full-height amb 3 demos integrades en mockup de navegador, Com funciona + counters + microcopy, quiz plegable, FAQ + contacte, footer.
- Navegació: header sticky transparent→blur, progress bar turquesa, CTA sempre visible, menú mòbil fullscreen, FAB WhatsApp mòbil.
- Backend: POST /api/contacte funcional, guardat a MongoDB, toast Sonner d'èxit/error, preselecció de servei des de "Ho vull" i del quiz.
- Test IDs a tots els elements interactius.
- Poliment 2a ronda (2026-09-21): hero amb mini-demo de muntatge per fases amb replay, scroll amb ratolí dins les demos (data-lenis-prevent), cistella funcional amb drawer a la demo de moda, panell de preu/CTA destacat en navy amb CTA turquesa, tab "Més escollit" amb cinta superposada i anell turquesa, quiz integrat just sota els serveis (mateixa zona azure).
- Poliment 3a ronda (2026-09-21): hero amb blocs arrossegables (mode "munta-la tu" amb drag&drop i snap, més mode automàtic amb replay); serveis reestructurats en 3 targetes comparatives amb preu gran visible a l'hora; la targeta seleccionada sincronitza amb la preview de demo i el panell navy de sota; carrusel mòbil eliminat (les targetes fan de selector a totes les mides); "Més escollit" canviat a Botiga Online (Web Professional passa a "La més completa"); demo i panell d'informació ara costat a costat (2 columnes) per reduir l'scroll de la secció.

## Placeholders marcats [s'ha d'afegir]
- WhatsApp: 34600000000 (src/data/content.js WHATSAPP_NUMBER).
- Email: hola@webilo.cat (EMAIL).
- Preus orientatius: 650 € / 1.250 € / 1.950 € (SERVICES.price).
- Dades legals del footer.

## Backlog prioritzat
- P0: Substituir placeholders per dades reals (WhatsApp, email, preus).
- P1: Multi-idioma CA/ES/EN (estructura ja centralitzada a src/data/content.js).
- P1: Avís per email de cada consulta (Resend gestionat per Emergent).
- P2: Blog/recursos SEO, pàgina legal, casos reals amb fotos de clients.

## Verificació
- curl: GET /api/ ✓, POST /api/contacte guardat a MongoDB ✓, 422 validació ✓.
- Screenshots externs 1440px i 390px: hero, switcher, demo modal (atelier-nua.webilo.cat), envio de formulari amb toast ✓, sense overflow-x mòbil, FAB present ✓.
