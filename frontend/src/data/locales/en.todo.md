# English locale checklist

English is intentionally not enabled yet. Fill the following keys in `src/context/LanguageContext.jsx` under an `en` locale before enabling it in the selector.

## Shared interface

- `nav.services`, `nav.demos`, `nav.process`, `nav.faq`, `nav.contact`, `nav.projects`
- `language`, `languageLabel`, `openDemo`, `viewProjects`, `visitWebsite`
- `demoNote`, `demoDetail`

## Main landing

- `hero.*`
- `services.*`
- `contact.*`
- `how.*`
- `quiz.*`
- `footer.*`
- `faq.items`
- `demo.*`

## Project showcase

- `projects.kuvings.*`
- `projects.cafeoca.*`

## Service catalog

When enabling English, also add an English catalog alongside `SPANISH_SERVICES` in `ServiceSwitcher.jsx` for:

- `aparador`
- `professional`
- `botiga`

Each service needs `name`, `tagline`, `target`, `features`, and `priceNote`.

## Interactive demos

Translate the local `copy` objects in:

- `demos/FusteriaDemo.jsx`
- `demos/DentistaDemo.jsx`
- `demos/ModaDemo.jsx`
- `Quiz.jsx` question and rationale arrays
