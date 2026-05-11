# Épique UI

Design system for all Épique subdomains. Served as static files from Railway at `ui.epique.com.au`.

Push to `main` → Railway redeploys → every portal gets the update on next page load.

---

## Using in a portal

No npm, no tokens. Just import by URL.

### CSS

In your portal's main stylesheet:

```css
@import 'https://ui.epique.com.au/epique-ui.css';
```

Or import individual parts:

```css
@import 'https://ui.epique.com.au/tokens/tokens.css';
@import 'https://ui.epique.com.au/tokens/base.css';
```

### Navbar + App Launcher

Add a mount point in your HTML:

```html
<div id="epique-navbar"></div>
```

Then in your JS entry file:

```js
import { initNavbar } from 'https://ui.epique.com.au/index.js';

initNavbar({
  portalName: 'Contractor Portal',
  activeAppId: 'contractor',
  links: [
    { label: 'Dashboard',  href: '/',           active: true },
    { label: 'Staff',      href: '/staff'                    },
    { label: 'Timesheets', href: '/timesheets'              },
  ],
  ctaLabel: 'New Contract',
  ctaHref:  '/contracts/new',
});
```

---

## App IDs

| ID           | Portal                   |
|--------------|--------------------------|
| `home`       | epiquehotchocolate.com   |
| `contractor` | contractor.epique.com.au |
| `finance`    | finance.epique.com.au    |
| `pos`        | pos.epique.com.au        |
| `events`     | events.epique.com.au     |
| `wholesale`  | wholesale.epique.com.au  |

---

## Adding a new app

Edit `src/components/AppLauncher/AppLauncher.js`, add an entry to `EPIQUE_APPS`. Push to main. Done.

---

## File structure

```
src/
  epique-ui.css       ← full bundle, import this
  index.js            ← exports initNavbar + initAppLauncher
  tokens/
    tokens.css        ← all CSS variables
    base.css          ← reset + global styles
  components/
    Navbar/
      Navbar.css
      Navbar.js
    AppLauncher/
      AppLauncher.css
      AppLauncher.js
server.js             ← Express static server for Railway
```

---

## Token reference

| Token             | Value            | Use                      |
|-------------------|------------------|--------------------------|
| `--background`    | `#FAFAF8`        | Page background          |
| `--pink-200`      | `#F4D8D8`        | Navbar, hero sections    |
| `--gold-500`      | `#9A8A48`        | CTAs, eyebrows, icons    |
| `--ink-800`       | `#151110`        | Body text, dark surfaces |
| `--font-display`  | Playfair Display | Headings                 |
| `--font-body`     | Inter            | All UI text              |
| `--navbar-height` | `64px`           | Page shell top padding   |
