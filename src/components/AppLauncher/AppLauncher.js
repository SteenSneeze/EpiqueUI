/**
 * ÉPIQUE APP LAUNCHER
 *
 * Usage:
 *   import { initAppLauncher } from '@steensneeze/epique-ui/AppLauncher';
 *
 *   initAppLauncher({
 *     activeAppId: 'contractor',   // highlights the current portal in the grid
 *     apps: EPIQUE_APPS,           // optional — overrides the default app list
 *   });
 *
 * The function injects the launcher button into any element with
 * data-epique-launcher="true" on the page, or appends it to the navbar
 * if that attribute is found.
 */

export const EPIQUE_APPS = [
  {
    id: 'contractor',
    name: 'Portal',
    url: 'https://epiquefoodandevents.com',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`,
  },
  {
    id: 'finance',
    name: 'Finance Portal',
    url: 'https://finance.epiquefoodandevents.com',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <path d="M2 10h20"/>
      <path d="M6 15h4"/>
    </svg>`,
  },
  {
    id: 'pos',
    name: 'Point of Sale',
    url: 'https://pos.epiquefoodandevents.com',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8"/>
      <path d="M12 17v4"/>
      <path d="M7 8h4M7 12h2M13 8h4M13 12h4"/>
    </svg>`,
  },
  {
    id: 'contracts',
    name: 'Contracts',
    url: 'https://sign.epiquefoodandevents.com',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>`,
  },
  {
    id: 'home',
    name: 'Public Site',
    url: 'https://epiquehotchocolate.com',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
      <line x1="6" y1="2" x2="6" y2="4"/>
      <line x1="10" y1="2" x2="10" y2="4"/>
      <line x1="14" y1="2" x2="14" y2="4"/>
    </svg>`,
  },
];

const GRID_ICON_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" width="20" height="20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
  </svg>
`;

const CLOSE_ICON_SVG = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
`;

export function initAppLauncher({ activeAppId = null, apps = EPIQUE_APPS } = {}) {
  // Inject CSS if not already present
  if (!document.getElementById('epique-launcher-styles')) {
    const link = document.createElement('link');
    link.id = 'epique-launcher-styles';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@steensneeze/epique-ui/dist/AppLauncher.css';
    document.head.appendChild(link);
  }

  // Build DOM
  const btn = document.createElement('button');
  btn.className = 'epique-launcher-btn';
  btn.setAttribute('aria-label', 'Open app launcher');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = GRID_ICON_SVG;

  const backdrop = document.createElement('div');
  backdrop.className = 'epique-launcher-backdrop';

  const panel = document.createElement('div');
  panel.className = 'epique-launcher-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Épique apps');
  panel.innerHTML = `
    <div class="epique-launcher-header">
      <span class="epique-launcher-title">Épique Apps</span>
      <button class="epique-launcher-btn" aria-label="Close app launcher" style="width:28px;height:28px;">
        ${CLOSE_ICON_SVG}
      </button>
    </div>
    <div class="epique-launcher-grid">
      ${apps.map(app => `
        <a
          href="${app.url}"
          class="epique-app-tile${activeAppId === app.id ? ' active' : ''}"
          data-app-id="${app.id}"
          ${activeAppId === app.id ? 'aria-current="page"' : ''}
        >
          <div class="epique-app-icon">${app.icon}</div>
          <span class="epique-app-name">${app.name}</span>
        </a>
      `).join('')}
    </div>
  `;

  // Mount
  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  const closeBtn = panel.querySelector('.epique-launcher-btn');

  // State
  let isOpen = false;

  function open() {
    isOpen = true;
    panel.classList.add('open');
    backdrop.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = CLOSE_ICON_SVG;
  }

  function close() {
    isOpen = false;
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = GRID_ICON_SVG;
  }

  function toggle() {
    isOpen ? close() : open();
  }

  btn.addEventListener('click', toggle);
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) close();
  });

  return { btn, open, close, toggle };
}
