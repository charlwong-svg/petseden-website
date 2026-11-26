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
      // visualViewport is what the phone is actually showing: window.innerHeight
      // still counts the strip hidden behind Chrome's address bar, which pushed
      // the last menu items off the screen.
      var visible = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
      var below = visible - (header ? header.getBoundingClientRect().bottom : 0);
      nav.style.maxHeight = Math.max(160, below) + 'px';
    }
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      fitMenu();
    });
    window.addEventListener('resize', fitMenu);
    window.addEventListener('orientationchange', fitMenu);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', fitMenu);
      window.visualViewport.addEventListener('scroll', fitMenu);
    }
  }
});
