/**
 * ÉPIQUE NAVBAR
 *
 * Usage:
 *   import { initNavbar } from '@steensneeze/epique-ui/Navbar';
 *
 *   initNavbar({
 *     portalName: 'Contractor Portal',   // shown as a badge next to the logo
 *     activeAppId: 'contractor',          // passed to the app launcher
 *     links: [                            // optional nav links
 *       { label: 'Dashboard', href: '/', active: true },
 *       { label: 'Staff',     href: '/staff' },
 *     ],
 *     ctaLabel: 'New Booking',            // optional right-side CTA button
 *     ctaHref: '/bookings/new',
 *   });
 *
 * Mounts into <div id="epique-navbar"></div> if present,
 * otherwise prepends to document.body.
 */

import { initAppLauncher, EPIQUE_APPS } from '../AppLauncher/AppLauncher.js';

export function initNavbar({
  portalName = '',
  activeAppId = null,
  links = [],
  ctaLabel = null,
  ctaHref = null,
  logoHref = 'https://epiquehotchocolate.com',
  apps = EPIQUE_APPS,
} = {}) {

  const linksHTML = links.length ? `
    <ul class="epique-navbar-links">
      ${links.map(l => `
        <li>
          <a href="${l.href}" ${l.active ? 'class="active" aria-current="page"' : ''}>
            ${l.label}
          </a>
        </li>
      `).join('')}
    </ul>
  ` : '';

  const ctaHTML = ctaLabel ? `
    <a href="${ctaHref || '#'}" class="btn btn-default" style="font-size:11px;padding:8px 16px;">
      ${ctaLabel}
    </a>
  ` : '';

  const portalBadgeHTML = portalName ? `
    <span class="epique-navbar-portal">${portalName}</span>
  ` : '';

  const navbarHTML = `
    <nav class="epique-navbar" role="navigation" aria-label="Main navigation">
      <div class="epique-navbar-inner">

        <div style="display:flex;align-items:center;gap:var(--sp-4);">
          <a href="${logoHref}" class="epique-navbar-logo" aria-label="Épique home">
            <div class="epique-navbar-logo-text">
              <span class="epique-navbar-logo-wordmark">Épique</span>
              <span class="epique-navbar-logo-sub">Hot Chocolate</span>
            </div>
          </a>
          ${portalBadgeHTML}
        </div>

        ${linksHTML}

        <div class="epique-navbar-right">
          ${ctaHTML}
          <div id="epique-launcher-slot"></div>
        </div>

      </div>
    </nav>
  `;

  // Mount navbar
  const existingSlot = document.getElementById('epique-navbar');
  if (existingSlot) {
    existingSlot.innerHTML = navbarHTML;
  } else {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHTML;
    document.body.prepend(wrapper.firstElementChild);
  }

  // Mount launcher button into the slot
  const slot = document.getElementById('epique-launcher-slot');
  const { btn } = initAppLauncher({ activeAppId, apps });
  slot.appendChild(btn);
}
