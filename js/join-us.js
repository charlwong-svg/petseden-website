function esc(s) {
  var d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
function listHtml(items) {
  return '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
}
document.addEventListener('DOMContentLoaded', function () {
  fetch('/content/join-us.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var introEl = document.getElementById('join-us-intro');
      if (introEl) introEl.textContent = data.intro;

      var container = document.getElementById('jobs-container');
      if (container) {
        container.innerHTML = data.jobs.map(function (job) {
          var html = '<div class="job-card">';
          html += '<h3>' + esc(job.title) + '</h3>';
          html += '<p>' + esc(job.intro) + '</p>';
          // The key terms, listed the way a job posting states them.
          if (job.facts && job.facts.length) {
            html += '<dl class="job-facts">';
            job.facts.forEach(function (f) {
              html += '<dt>' + esc(f.label) + '</dt><dd>' + esc(f.value) + '</dd>';
            });
            html += '</dl>';
          }
          html += '<h5>' + esc(job.duties_label) + '</h5>' + listHtml(job.duties);
          html += '<h5>' + esc(job.requirements_label) + '</h5>' + listHtml(job.requirements);
          if (job.extra && job.extra.length) {
            html += '<h5>' + esc(job.extra_label) + '</h5>' + listHtml(job.extra);
          }
          html += '</div>';
          return html;
        }).join('');
      }

      var footnoteEl = document.getElementById('join-us-footnote');
      if (footnoteEl) footnoteEl.textContent = data.footnote;
    })
    .catch(function () { /* fail silently */ });
});
