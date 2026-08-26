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

  overlay.innerHTML =
    '<div class="promo-modal">' +
      '<button class="promo-modal-close" aria-label="Close">&times;</button>' +
      '<p class="promo-modal-eyebrow">Limited-Time Offer</p>' +
      '<p class="promo-modal-amount">' + promo.amount + '</p>' +
      '<p class="promo-modal-note">' + promo.note + '</p>' +
      '<p class="promo-modal-valid">' + promo.validPrefix + ' ' + dateLabel + '</p>' +
      '<a class="btn btn-honey promo-modal-cta" href="' + PETS_EDEN_WA_LINK + '" target="_blank" rel="noopener">Claim via WhatsApp</a>' +
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
