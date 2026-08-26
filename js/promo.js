// Computes "last day of the current month" in Singapore time, so promo
// end-dates roll forward automatically at midnight on the 1st of each month.
function petsEdenLastDayOfMonthLabel() {
  var fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit'
  });
  var parts = {};
  fmt.formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
  var year = parseInt(parts.year, 10);
  var month = parseInt(parts.month, 10); // 1-12
  var lastDay = new Date(Date.UTC(year, month, 0));
  var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return lastDay.getUTCDate() + ' ' + monthNames[lastDay.getUTCMonth()] + ' ' + lastDay.getUTCFullYear();
}

var PETS_EDEN_WA_LINK = 'https://wa.me/6592277915';

function buildPromoModal(key, promo, dateLabel) {
  var overlay = document.createElement('div');
  overlay.className = 'promo-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  var whatsappIcon =
    '<svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">' +
      '<path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.34.657 4.526 1.797 6.387L4 29l7.83-1.76A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.7c-1.9 0-3.67-.53-5.18-1.45l-.37-.22-4.65 1.04 1.06-4.53-.24-.38A9.66 9.66 0 0 1 5.3 15c0-5.9 4.8-10.7 10.7-10.7S26.7 9.1 26.7 15 21.9 24.7 16.004 24.7zm5.87-8.02c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.21-.38.24-.7.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68 0 1.58 1.15 3.11 1.31 3.33.16.21 2.26 3.45 5.48 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z"/>' +
    '</svg>';

  overlay.innerHTML =
    '<div class="promo-modal">' +
      '<button class="promo-modal-close" aria-label="Close">&times;</button>' +
      '<p class="promo-modal-eyebrow">Limited-Time Offer</p>' +
      '<p class="promo-modal-amount"><span class="promo-modal-amount-badge">' + promo.amount + '</span></p>' +
      '<p class="promo-modal-note">' + promo.note + '</p>' +
      '<p class="promo-modal-valid">' + promo.validPrefix + ' ' + dateLabel + '</p>' +
      '<a class="btn btn-honey promo-modal-cta" href="' + PETS_EDEN_WA_LINK + '" target="_blank" rel="noopener">' + whatsappIcon + '<span>Claim via WhatsApp</span></a>' +
      '<p class="promo-modal-terms">' + promo.termsNote + '</p>' +
    '</div>';

  document.body.appendChild(overlay);

  function closeModal() {
    overlay.classList.remove('open');
    setTimeout(function () { overlay.remove(); }, 250);
  }

  overlay.querySelector('.promo-modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', escHandler); }
  });

  requestAnimationFrame(function () {
    setTimeout(function () { overlay.classList.add('open'); }, 400);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var dateLabel = petsEdenLastDayOfMonthLabel();

  fetch('/content/promos.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      // Fill in the inline banners (hidden via CSS, kept in case you want
      // to bring the banner back later without touching the JS again)
      document.querySelectorAll('[data-promo]').forEach(function (banner) {
        var key = banner.getAttribute('data-promo');
        var p = data[key];
        if (!p) return;
        var titleEl = banner.querySelector('.promo-title');
        var subEl = banner.querySelector('.promo-sub');
        if (titleEl) titleEl.textContent = p.amount + ' ' + p.note;
        if (subEl) {
          subEl.innerHTML = p.ctaHtml + ' &nbsp; ' + p.validPrefix + ' ' + dateLabel + '. ' + p.termsNote;
        }
      });

      // Show the popup every time this page loads, on any page that has
      // a promo banner present in its HTML (grooming pages or course pages).
      var pageHasGrooming = document.querySelector('[data-promo="grooming"]');
      var pageHasCourses = document.querySelector('[data-promo="courses"]');
      var key = pageHasGrooming ? 'grooming' : (pageHasCourses ? 'courses' : null);
      if (!key || !data[key]) return;

      buildPromoModal(key, data[key], dateLabel);
    })
    .catch(function () { /* fail silently, static fallback text in HTML stays */ });
});
