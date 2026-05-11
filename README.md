# @steensneeze/epique-ui

Épique design system. Shared tokens, base styles, and components for all Épique subdomains.

Push to `main` → GitHub Actions auto-publishes to GitHub Packages → portals pull on next deploy.

---

## Installation

In each Épique portal, add a `.npmrc` file at the project root:

```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@steensneeze:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @steensneeze/epique-ui
```

---

## Usage

### 1. Import the full stylesheet

In your portal's main CSS or entry file:

```css
@import '@steensneeze/epique-ui/css';
```

Or import individual parts:

```css
@import '@steensneeze/epique-ui/tokens';   /* CSS variables only */
@import '@steensneeze/epique-ui/base';     /* base styles */
```

### 2. Add the navbar

In your portal's HTML, add a mount point:

```html
<div id="epique-navbar"></div>
```

Then initialise in your JS entry file:

```js
import { initNavbar } from '@steensneeze/epique-ui';

initNavbar({
  portalName: 'Contractor Portal',
  activeAppId: 'contractor',
  links: [
    { label: 'Dashboard', href: '/',        active: true },
    { label: 'Staff',     href: '/staff'               },
    { label: 'Timesheets',href: '/timesheets'          },
  ],
  ctaLabel: 'New Contract',
  ctaHref:  '/contracts/new',
});
```

### 3. App launcher only (without full navbar)

```js
import { initAppLauncher } from '@steensneeze/epique-ui';

const { btn } = initAppLauncher({ activeAppId: 'contractor' });
document.getElementById('my-slot').appendChild(btn);
```

---

## App IDs

| ID           | Portal                        |
|--------------|-------------------------------|
| `home`       | epiquehotchocolate.com        |
| `contractor` | contractor.epique.com.au      |
| `finance`    | finance.epique.com.au         |
| `pos`        | pos.epique.com.au             |
| `events`     | events.epique.com.au          |
| `wholesale`  | wholesale.epique.com.au       |

Add new apps by editing `EPIQUE_APPS` in `AppLauncher.js` and bumping the version.

---

## Versioning

Bump `version` in `package.json` before pushing to `main`. Portals pinned to `latest` will pick up the new version on their next Railway deploy.

```json
"version": "1.0.1"
```

---

## Token reference

All CSS variables are defined in `src/tokens/tokens.css`. Key ones:

| Token            | Value     | Use                        |
|------------------|-----------|----------------------------|
| `--background`   | `#FAFAF8` | Page background            |
| `--pink-200`     | `#F4D8D8` | Navbar, hero sections      |
| `--gold-500`     | `#9A8A48` | CTAs, eyebrows, icons      |
| `--ink-800`      | `#151110` | Body text, dark surfaces   |
| `--font-display` | Playfair Display | Headings          |
| `--font-body`    | Inter     | All UI text                |
| `--navbar-height`| `64px`    | Use for page-shell padding |
