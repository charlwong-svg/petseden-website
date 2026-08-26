// Computes "last day of the current month" in Singapore time, so promo
// end-dates roll forward automatically at midnight on the 1st of each month.
// e.g. all through August it shows "31 Aug 2026"; on 1 Sep it becomes "30 Sep 2026".
function petsEdenLastDayOfMonthLabel() {
  var fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Singapore', year: 'numeric', month: '2-digit', day: '2-digit'
  });
  var parts = {};
  fmt.formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
  var year = parseInt(parts.year, 10);
  var month = parseInt(parts.month, 10); // 1-12

  // Date.UTC's month is 0-indexed, so passing our 1-indexed month with day=0
  // rolls back to the last day of the *current* month.
  var lastDay = new Date(Date.UTC(year, month, 0));
  var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return lastDay.getUTCDate() + ' ' + monthNames[lastDay.getUTCMonth()] + ' ' + lastDay.getUTCFullYear();
}

document.addEventListener('DOMContentLoaded', function () {
  var dateLabel = petsEdenLastDayOfMonthLabel();

  fetch('/content/promos.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      document.querySelectorAll('[data-promo]').forEach(function (banner) {
        var key = banner.getAttribute('data-promo'); // "grooming" or "courses"
        var p = data[key];
        if (!p) return;
        var titleEl = banner.querySelector('.promo-title');
        var subEl = banner.querySelector('.promo-sub');
        if (titleEl) titleEl.textContent = p.amount + ' ' + p.note;
        if (subEl) {
          subEl.innerHTML = p.ctaHtml + ' &nbsp; ' + p.validPrefix + ' ' + dateLabel + '. ' + p.termsNote;
        }
      });
    })
    .catch(function () { /* fail silently, static fallback text in HTML stays */ });
});
