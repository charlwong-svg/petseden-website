(function () {
  var form = document.getElementById('sponsor-form');
  if (!form) return;
  var existing = document.getElementById('existing-shop');
  var fresh = document.getElementById('new-shop');
  var salon = document.getElementById('p-salon');
  var addr = document.getElementById('p-addr');
  var ready = document.getElementById('p-ready');

  function update() {
    var choice = form.querySelector('input[name="shop_status"]:checked');
    var isExisting = choice && choice.value === 'Existing shop';
    var isNew = choice && choice.value === 'Setting up a new shop';
    existing.hidden = !isExisting;
    fresh.hidden = !isNew;
    salon.required = addr.required = !!isExisting;
    ready.required = !!isNew;
  }

  form.addEventListener('change', update);
  update();
})();
