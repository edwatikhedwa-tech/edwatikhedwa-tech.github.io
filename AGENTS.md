# Frontend & Design Gate — BeBrand Санкт-Петербург

Перед любыми правками верстки, стилей или компонентов обязательно изучи:
- Контракт продукта: `@PRODUCT.md`
- Дизайн-систему: `@DESIGN.md`
- Стандарт анти-слопа: `web-design-anti-slop` (`C:\Users\edwat\.gemini\config\skills\web-design-anti-slop\SKILL.md`)

## Обязательные правила проекта
1. **Не ломать контент и SEO:** сохранять все 10 маршрутов Astro, URL, `robots.txt`, `sitemap.xml`, JSON-LD (`LegalService`, `Service`, `FAQPage`, `BreadcrumbList`), юридическую фактуру 2026 года и математику калькулятора (`src/data/calculator.ts`).
2. **Визуальный стандарт:** тёплая бумажная база (`#F6F4EF`), глубокий графит (`#121519`), фирменный карминовый акцент BeBrand (`#9E1B1E`), шрифтовая пара `Cormorant Garamond` + `Golos Text`. Запрещены дефолтные синие палитры Tailwind (`blue-700`/`slate-*`), системный `Inter`, вложенные скруглённые карточки и шаблонные заглушки.
3. **Hard Gate приёмка:** каждый этап проверяется через `npm run build`, `npx impeccable detect` (0 критических ошибок) и реальные скриншоты в браузере на 1440px, 768px и 390px.
