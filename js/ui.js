document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const navr = document.querySelectorAll('.navr');
    M.Sidenav.init(navr, {edge: 'right'});
    // // add recipe form
    // const forms = document.querySelectorAll('.side-form');
    // M.Sidenav.init(forms, {edge: 'left'});
  });