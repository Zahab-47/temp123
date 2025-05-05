document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('h2, h3, h4, h5, h6').forEach(header => {
    const level = parseInt(header.tagName.charAt(1), 10);
    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      let next = header.nextElementSibling;
      // hide/show everything until the next header of same-or-higher level
      while (
        next
        && !(next.tagName.match(/^H[1-6]$/) && parseInt(next.tagName.charAt(1), 10) <= level)
      ) {
        next.style.display = header.classList.contains('collapsed') ? 'none' : '';
        next = next.nextElementSibling;
      }
    });
  });
});
