document.addEventListener('DOMContentLoaded', function() {
  // On mobile, when clicking on a multi-level navbar menu, show the child links
  var navbar = document.getElementById('main-navbar');
  if (navbar) {
    navbar.addEventListener('click', function(e) {
      if (e.target.classList.contains('navlinks-parent')) {
        e.target.parentElement.classList.toggle('show-children');
      }
    });
  }
});
