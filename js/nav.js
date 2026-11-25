document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    // The menu is longer than a phone screen. Cap its height to the space
    // left below the header so the last items can be scrolled to; the CSS
    // does this too, this just measures the header exactly.
    var header = document.querySelector('.site-header');
    function fitMenu() {
      if (!nav.classList.contains('open')) { nav.style.maxHeight = ''; return; }
      var below = window.innerHeight - (header ? header.getBoundingClientRect().bottom : 0);
      nav.style.maxHeight = Math.max(160, below) + 'px';
    }
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      fitMenu();
    });
    window.addEventListener('resize', fitMenu);
    window.addEventListener('orientationchange', fitMenu);
  }
});
