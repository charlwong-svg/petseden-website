document.addEventListener('DOMContentLoaded', function () {
  // Add the Sponsored Groomer Program link to the Courses submenu on every page.
  var courseLink = document.querySelector("nav.main-nav a.top-link[href='/courses/']");
  var sub = courseLink && courseLink.parentNode.querySelector('.submenu');
  if (sub && !sub.querySelector("a[href='/sponsorship-program/']")) {
    var a = document.createElement('a');
    a.href = '/sponsorship-program/';
    a.textContent = 'Sponsored Groomer Program';
    sub.appendChild(a);
  }

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }
});
