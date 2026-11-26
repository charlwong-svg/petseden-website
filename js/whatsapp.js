/* Pets Eden - pre-filled WhatsApp messages.
 *
 * Every WhatsApp link on the site opens with a message already typed in,
 * worded to match the page the visitor was reading. So someone on the
 * plaque & tartar page gets a tartar message, not a dog grooming one.
 *
 * TO CHANGE THE WORDING: edit the list below. The key is the page's web
 * address; the value is the message. Nothing else needs touching.
 *
 * A button can override its page's message with a data-wa-msg attribute
 * in the HTML, which is how the Partner With Us buttons and the two
 * toolbox "Sign Up" buttons each say something different.
 */
(function () {
  var MESSAGES = {
    '/':                                    "Hi Pets Eden, I'd like to enquire about your grooming services.",
    '/services-available/':                 "Hi Pets Eden, I'd like to enquire about your grooming services.",
    '/cat-grooming/':                       "Hi Pets Eden, I'd like to enquire about cat grooming.",
    '/dog-grooming/':                       "Hi Pets Eden, I'd like to enquire about dog grooming.",
    '/rabbit-grooming/':                    "Hi Pets Eden, I'd like to enquire about rabbit grooming.",
    '/guinea-pig-grooming/':                "Hi Pets Eden, I'd like to enquire about guinea pig grooming.",
    '/tartar-removal/':                     "Hi Pets Eden, I'd like to enquire about plaque & tartar removal.",
    '/book-online1/':                       "Hi Pets Eden, I'd like to make a booking.",
    '/membership/':                         "Hi Pets Eden, I'd like to enquire about membership.",
    '/courses/':                            "Hi Pets Eden, I'd like to enquire about your grooming courses.",
    '/pet-owner-courses/':                  "Hi Pets Eden, I'd like to enquire about the Pet Owner grooming courses.",
    '/courses-available/':                  "Hi Pets Eden, I'd like to enquire about your professional grooming courses.",
    '/professional-cat-groomer-course/':    "Hi Pets Eden, I'd like to enquire about the cat grooming course.",
    '/professional-dog-groomer-course/':    "Hi Pets Eden, I'd like to enquire about the dog grooming course.",
    '/professional-rabbit-groomer-course/': "Hi Pets Eden, I'd like to enquire about the rabbit grooming course.",
    '/trainer-profiles/':                   "Hi Pets Eden, I'd like to enquire about your grooming courses.",
    '/professional-toolbox-sets/':          "Hi Pets Eden, I'd like to enquire about the professional toolbox sets.",
    '/thanks/':                             "Hi Pets Eden, I'd like to ask about the application I just submitted.",
    '/franchise/':                          "Hi Pets Eden, I'd like to enquire about working with Pets Eden.",
    '/contact-us/':                         "Hi Pets Eden, I'd like to enquire about an appointment.",
    '/join-us/':                            "Hi Pets Eden, I'd like to enquire about the Assistant Groomer position."
  };

  // Used if a new page is added and nobody updates the list above.
  var FALLBACK = "Hi Pets Eden, I'd like to make an enquiry.";

  function currentPath() {
    var p = window.location.pathname.replace(/index\.html$/, '');
    if (p.charAt(p.length - 1) !== '/') { p += '/'; }
    return p;
  }

  function apply() {
    var pageMessage = MESSAGES[currentPath()] || FALLBACK;
    var links = document.querySelectorAll('a[href*="wa.me/"]');

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute('href') || '';

      // Leave alone anything that already carries a message.
      if (href.indexOf('text=') !== -1) { continue; }

      var message = link.getAttribute('data-wa-msg') || pageMessage;
      link.setAttribute('href', href.split('?')[0] + '?text=' + encodeURIComponent(message));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  // The promo popup builds its "Claim via WhatsApp" button after this
  // script has already run, so watch for WhatsApp links added later and
  // give them a message too. This also covers anything added in future.
  if (window.MutationObserver && document.body) {
    var pending = null;
    new MutationObserver(function () {
      if (pending) { return; }
      pending = setTimeout(function () { pending = null; apply(); }, 50);
    }).observe(document.body, { childList: true, subtree: true });
  }
})();
